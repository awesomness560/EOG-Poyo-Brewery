from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services import DataService
from models import DiscrepancyAlert
from typing import List
import asyncio
import uvicorn

app = FastAPI(title="PotionOps Dashboard API")

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize service (singleton-ish pattern for simplicity)
data_service = DataService()

@app.get("/")
def root():
    return {"status": "Potion Monitoring Online (Not Sword Art Online)", "version": "6.7"}

#Returns list of suspicious days where tickets don't match calculated drain events.
@app.get("/api/dashboard/discrepancies", response_model=List[DiscrepancyAlert])
async def get_discrepancies(): 
    try:
        print("Analyzing potion flows for discrepancies...")
        alerts = await data_service.get_discrepancy_report()
        return alerts
    except Exception as e:
        print(f"Error detecting discrepancies: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/dashboard/network")
## Returns combined data for drawing the map: cauldrons, market, and edges.
async def get_full_network():
    client = data_service.client
    results = await asyncio.gather(
         client.get(f"https://hackutd2025.eog.systems/api/Information/cauldrons"),
         client.get(f"https://hackutd2025.eog.systems/api/Information/network"),
         client.get(f"https://hackutd2025.eog.systems/api/Information/market")
    )
    return {
        "nodes": results[0].json(),
        "edges": results[1].json(),
        "market": results[2].json()
    }

@app.get("/api/dashboard/data")
async def get_data():
    """Returns raw data from the Data endpoint"""
    try:
        client = data_service.client
        response = await client.get("https://hackutd2025.eog.systems/api/Data")
        return response.json()
    except Exception as e:
        print(f"Error fetching data: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)