from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

# --- RAW DATA MODELS (matching external API for type safety) ---
class Cauldron(BaseModel):
    id: str
    name: str
    max_volume: int
    latitude: float
    longitude: float

class Ticket(BaseModel):
    ticket_id: str
    cauldron_id: str
    amount_collected: float
    date: str

# --- PROCESSED DASHBOARD MODELS ---
class DrainEvent(BaseModel):
    cauldron_id: str
    start_time: datetime
    end_time: datetime
    volume_drained_raw: float  # Just the level drop
    volume_drained_adjusted: float  # Level drop + (fill_rate * duration)
    associated_tickets: List[str] = []

class CauldronStatus(Cauldron):
    current_level: float
    fill_rate_per_min: float
    last_updated: datetime

class DiscrepancyAlert(BaseModel):
    cauldron_id: str
    date: str
    total_drained_estimated: float
    total_ticket_amount: float
    difference: float
    severity: str # "LOW", "HIGH", "CRITICAL"