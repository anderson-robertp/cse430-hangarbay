import { Ship } from './ship.model';
import { Upgrade } from '../upgrades/upgrade.model';

export interface InventoryItem {
  shipId: number;
  quantity: number;
  selectedPilotId?: number;
  selectedUpgradeIds?: number[];
  points: number;
}
