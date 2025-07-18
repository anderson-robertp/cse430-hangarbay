// models/fleet.model.ts
import { Ship } from '../inventory/ship.model';

export interface Fleet {
  id: number;
  name: string;
  ships: Ship[];
  notes?: string;
}
