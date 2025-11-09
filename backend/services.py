import httpx
import asyncio
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from models import DiscrepancyAlert, DrainEvent
from typing import List

HACKATHON_API = "https://hackutd2025.eog.systems"

class DataService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=60.0)
        # Cache essential metadata
        self.cauldrons = {}
        self.fill_rates = {}

    async def fetch_all_raw(self):
        """Helper to grab everything we need for analysis concurrently"""
        results = await asyncio.gather(
            self.client.get(f"{HACKATHON_API}/api/Information/cauldrons"),
            self.client.get(f"{HACKATHON_API}/api/Tickets"),
            self.client.get(f"{HACKATHON_API}/api/Data/?start_date=0&end_date=2000000000")
        )
        return {
            "cauldrons": results[0].json(),
            "tickets": results[1].json(),
            "levels": results[2].json()
        }

    def calculate_fill_rates(self, df_levels: pd.DataFrame):
        """
        Determines baseline fill rate for each cauldron when NOT draining.
        Looks for positive slopes in the data.
        """
        rates = {}
        for col in df_levels.columns:
            # Calculate minute-by-minute difference
            diff = df_levels[col].diff()
            # Filter only positive changes (filling periods)
            filling_periods = diff[diff > 0]
            # Median is safer than mean to avoid outliers from weird data jumps
            rates[col] = filling_periods.median() if not filling_periods.empty else 0
        return rates

    def detect_drain_events(self, df_levels: pd.DataFrame, fill_rates: dict) -> List[DrainEvent]:
        events = []
        for cauldron_id in df_levels.columns:
            cauldron_data = df_levels[cauldron_id]
            fill_rate = fill_rates.get(cauldron_id, 0)
            
            # Identify draining periods
            is_draining = cauldron_data.diff() < 0
            
            # Group consecutive True values
            # Use a more explicit way to create group IDs
            change_points = (is_draining != is_draining.shift()).cumsum()
            drain_groups = is_draining.groupby(change_points)
            
            for group_id, group_data in drain_groups:
                # We only care if the WHOLE group is strictly draining
                if group_data.all(): 
                    # Get integer locations for start and end of this group
                    start_iloc = df_levels.index.get_loc(group_data.index[0])
                    end_iloc = df_levels.index.get_loc(group_data.index[-1])
                    
                    # Look one step back for the true start of the drain
                    if start_iloc > 0:
                        start_iloc -= 1
                        
                    start_time = df_levels.index[start_iloc]
                    end_time = df_levels.index[end_iloc]
                    
                    # Explicitly cast to Timestamp to avoid ambiguity
                    start_ts = pd.Timestamp(start_time)
                    end_ts = pd.Timestamp(end_time)

                    # Calculate duration safely using Timedelta
                    duration = end_ts - start_ts
                    duration_mins = duration.total_seconds() / 60.0
                    
                    start_vol = df_levels.iloc[start_iloc][cauldron_id]
                    end_vol = df_levels.iloc[end_iloc][cauldron_id]
                    
                    raw_drop = start_vol - end_vol
                    adjusted_drop = raw_drop + (fill_rate * duration_mins)
                    
                    if adjusted_drop > 5:
                        events.append(DrainEvent(
                            cauldron_id=cauldron_id,
                            start_time=start_ts,
                            end_time=end_ts,
                            volume_drained_raw=raw_drop,
                            volume_drained_adjusted=adjusted_drop
                        ))
        return events

    async def get_discrepancy_report(self):
        raw_data = await self.fetch_all_raw()
        
        # 1. Process Level Data into DataFrame for easy time-series analysis
        data_points = raw_data['levels']
        df = pd.DataFrame([
            {'timestamp': d['timestamp'], **d['cauldron_levels']} 
            for d in data_points
        ])
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df.set_index('timestamp', inplace=True)
        # ADD THIS LINE to ensure it's a proper DatetimeIndex
        df.index = pd.DatetimeIndex(df.index) 
        df.sort_index(inplace=True)

        # 2. Calculate Rates & Events
        fill_rates = self.calculate_fill_rates(df)
        drain_events = self.detect_drain_events(df, fill_rates)
        
        # 3. Aggregate Drains by Day and Cauldron
        daily_drains = {}
        for event in drain_events:
            day_key = event.start_time.strftime("%Y-%m-%d")
            key = (event.cauldron_id, day_key)
            daily_drains[key] = daily_drains.get(key, 0) + event.volume_drained_adjusted

        # 4. Aggregate Tickets by Day and Cauldron
        daily_tickets = {}
        for t in raw_data['tickets']['transport_tickets']:
            # Assuming ticket date format is ISO 8601 or similar; adjust if needed based on actual data
            try:
                ticket_date = pd.to_datetime(t['date']).strftime("%Y-%m-%d")
            except:
                 # Fallback if date format is weird in raw data
                 ticket_date = t['date'].split("T")[0] 

            key = (t['cauldron_id'], ticket_date)
            daily_tickets[key] = daily_tickets.get(key, 0) + t['amount_collected']

        # 5. Compare and Generate Alerts
        alerts = []
        all_keys = set(daily_drains.keys()) | set(daily_tickets.keys())
        for cauldron_id, date in all_keys:
            drained = daily_drains.get((cauldron_id, date), 0)
            ticketed = daily_tickets.get((cauldron_id, date), 0)
            diff = abs(drained - ticketed)
            
            # Define Severity Thresholds (tune these!)
            if diff > 50:
                severity = "CRITICAL"
            elif diff > 10:
                severity = "HIGH"
            elif diff > 1:
                severity = "LOW"
            else:
                continue # Ignore negligible differences

            alerts.append(DiscrepancyAlert(
                cauldron_id=cauldron_id,
                date=date,
                total_drained_estimated=round(drained, 2),
                total_ticket_amount=round(ticketed, 2),
                difference=round(drained - ticketed, 2), # Positive means unlogged drain!
                severity=severity
            ))
            
        return sorted(alerts, key=lambda x: abs(x.difference), reverse=True)