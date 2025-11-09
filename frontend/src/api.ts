// API Base URL
const API_BASE_URL = "https://eog-poyo-brewery.onrender.com/api";

// Type Definitions

export interface CauldronLevels {
  cauldron_001: number;
  cauldron_002: number;
  cauldron_003: number;
  cauldron_004: number;
  cauldron_005: number;
  cauldron_006: number;
  cauldron_007: number;
  cauldron_008: number;
  cauldron_009: number;
  cauldron_010: number;
  cauldron_011: number;
  cauldron_012: number;
}

export interface DashboardDataPoint {
  timestamp: string;
  cauldron_levels: CauldronLevels;
}

export type DashboardData = DashboardDataPoint[];

export interface CauldronNode {
  id: string;
  name: string;
  max_volume: number;
  latitude: number;
  longitude: number;
}

export interface MarketNode {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface NetworkEdge {
  from: string;
  to: string;
  travel_time_minutes: number;
}

export interface NetworkEdges {
  edges: NetworkEdge[];
  description: string;
}

export interface NetworkTopology {
  nodes: CauldronNode[];
  edges: NetworkEdges;
  market: MarketNode;
}

//This doesn't work properly last time I tested it, so ignore this severity for now
export type DiscrepancySeverity = "CRITICAL" | "WARNING" | "INFO";

export interface Discrepancy {
  cauldron_id: string;
  date: string;
  total_drained_estimated: number;
  total_ticket_amount: number;
  difference: number;
  severity: DiscrepancySeverity;
}

export type Discrepancies = Discrepancy[];

// API Client Functions

// Fetch dashboard data with cauldron levels over time
export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch(`${API_BASE_URL}/dashboard/data`);
  const data = await response.json();
  return data;
}

// Fetch network topology including nodes, edges, and market information
// We do a bit of retopology here lol (this is a joke, ignore this comment)
export async function getNetworkTopology(): Promise<NetworkTopology> {
  const response = await fetch(`${API_BASE_URL}/dashboard/network`);
  const data = await response.json();
  return data;
}

// Fetch discrepancies between estimated and actual amounts
export async function getDiscrepancies(): Promise<Discrepancies> {
  const response = await fetch(`${API_BASE_URL}/dashboard/discrepancies`);
  const data = await response.json();
  return data;
}
