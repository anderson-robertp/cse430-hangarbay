// models/fleet.model.ts
import { Ship } from '../inventory/ship.model';

export interface Fleet {
  id: number;
  name: string;
  ships: FleetShip[];
  notes?: string;
}

export interface FleetShip {
  shipId: number;
  pilotId?: number;
  upgradeIds?: number[];
  quantity: number;
  totalPoints: number;
}

