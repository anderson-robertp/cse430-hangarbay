import { Component, Input } from '@angular/core';

import { Ship } from '../ship.model';
import { InventoryItem } from '../inventory.model';
import { Pilot } from '../../pilots/pilot.model';
import { Upgrade } from '../../upgrades/upgrade.model';

import { InventoryService } from '../inventory.service';
import { PilotService } from '../../pilots/pilot.service';
import { UpgradeService } from '../../upgrades/upgrade.service';

@Component({
  selector: 'app-inventory-item',
  standalone: false,
  templateUrl: './inventory-item.component.html',
  styleUrl: './inventory-item.component.scss'
})
export class InventoryItemComponent {
  @Input() item!: InventoryItem;

  inventory: InventoryItem[] = [];
  ship: Ship | undefined;
  ships: Ship[] = [];
  pilots: Pilot[] = [];
  upgrades: Upgrade[] = [];

  constructor(private inventoryService: InventoryService,
              private pilotService: PilotService,
              private upgradeService: UpgradeService
  ) {}

  ngOnInit(): void {
    this.inventoryService.getShips().subscribe(ships => this.ships = ships);
    this.pilotService.getPilots().subscribe(pilots => this.pilots = pilots);
    this.upgradeService.getUpgrades().subscribe(upgrades => this.upgrades = upgrades);
  }

  getShip(id: number): Ship | undefined {
    //console.log('Getting ship with ID:', id);
    return this.ships.find(ship => ship.id === id);
  }

  onPilotChange(item: InventoryItem, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    item.selectedPilotId = parseInt(selectElement.value, 10);
    this.recalculateItemPoints(item);
    //console.log('Pilot changed:', item.selectedPilotId, this.getPilotById(item.selectedPilotId));
  }

  recalculateItemPoints(item: InventoryItem): number {
    //console.log('Recalculating points for item:', item);
    const pilot = this.getPilotById(item.selectedPilotId || 0);
    const pilotPoints = pilot ? pilot.points : 0;
    const upgradePoints = (item.selectedUpgradeIds || []).reduce((sum, upgId) => {
      const upg = this.getUpgradeById(upgId);
      return sum + (upg ? upg.points : 0);
    }, 0);
    return item.points = pilotPoints + upgradePoints;
  }

  getPilotById(id?: number): Pilot | undefined {
    if (!id) return undefined;
    return this.pilots.find(p => p.id === id);
  }

  getUpgradeById(id: number): Upgrade | undefined {
    return this.upgrades.find(upg => upg.id === id);
  }

  onUpgradeChange(item: InventoryItem, index: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = parseInt(target.value, 10);

    if (!item.selectedUpgradeIds) {
      item.selectedUpgradeIds = [];
    }
    item.selectedUpgradeIds[index] = selectedValue;
    this.recalculateItemPoints(item);
    //console.log('Upgrade changed:', item.selectedUpgradeIds, this.getUpgradeById(selectedValue));
  }

  getTotalInventoryPoints(): number {
    return this.inventory.reduce((sum, item) => sum + (item.points || 0), 0);
  }

  getTotalPointsForItem(item: InventoryItem): number {
    const pilot = this.getPilotById(item.selectedPilotId);
    const pilotPoints = pilot?.points || 0;

    const upgradePoints = (item.selectedUpgradeIds || [])
      .map(id => this.getUpgradeById(id)?.points || 0)
      .reduce((sum, val) => sum + val, 0);

    return pilotPoints + upgradePoints;
  }

  deleteShip(id: number): void {
    this.inventoryService.deleteShip(id).subscribe(() => {
      this.ships = this.ships.filter(ship => ship.id !== id);
    });
  }

  updateItem(item: InventoryItem): void {
    // Recalculate points based on selected pilot and upgrades
    const pilot = this.getPilotById(item.selectedPilotId || 0);
    const pilotPoints = pilot ? pilot.points : 0;
    const upgradePoints = (item.selectedUpgradeIds || []).reduce((sum, upgId) => {
      const upg = this.getUpgradeById(upgId);
      return sum + (upg ? upg.points : 0);
    }, 0);
    item.points = pilotPoints + upgradePoints;

    this.inventoryService.updateInventoryItem(6, item.shipId.toString(), item).subscribe(() => {
      //console.log('Inventory item updated:', item);
    });
  }

  addToFleet(item: InventoryItem): void {
    console.log('Adding to fleet:', item);
    // Implement fleet addition logic here
  }

  getPilotsForShip(shipName: string): Pilot[] {
    return this.pilots.filter(pilot => pilot.ship === shipName);
  }

  getSlotsForItem(item: InventoryItem): string[] {
    const pilot = this.getPilotById(item.selectedPilotId);
    return Array.isArray(pilot?.slots) ? pilot!.slots : [];
  }

  filterUpgradesBySlot(slot: string): Upgrade[] {
    return this.upgrades.filter(upg => upg.slot === slot);
  }

}
