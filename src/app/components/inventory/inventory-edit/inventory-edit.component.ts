import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryItem } from '../inventory.model';
import { Pilot } from '../../pilots/pilot.model';
import { Upgrade } from '../../upgrades/upgrade.model';
import { Ship } from '../ship.model';

import { InventoryService } from '../inventory.service';
import { PilotService } from '../../pilots/pilot.service';
import { UpgradeService } from '../../upgrades/upgrade.service';
import { FleetService } from '../../fleets/fleet.service';

@Component({
  selector: 'app-inventory-edit',
  standalone: false,
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.scss'
})
export class InventoryEditComponent {
  @Input() shipId!: number;
  @Input() userId!: number;
  @Input() item!: InventoryItem;

  @Output() close = new EventEmitter<void>();
  @Output() inventoryUpdated = new EventEmitter<void>();

  pilots: Pilot[] = [];
  upgrades: Upgrade[] = [];
  ships: Ship[] = [];
  ship: Ship | undefined;
  inventory: InventoryItem[] = [];

  constructor(
    private inventoryService: InventoryService,
    private pilotService: PilotService,
    private upgradeService: UpgradeService
  ) { }

  ngOnInit(): void {
    // Load pilots
    this.pilotService.getPilots().subscribe(pilots => {
      this.pilots = pilots;

      // Load upgrades
      this.upgradeService.getUpgrades().subscribe(upgrades => {
        this.upgrades = upgrades;

        // Load ships
        this.inventoryService.getShips().subscribe(ships => {
          this.ships = ships;

          // Load inventory last, after pilots and ships are ready
          this.inventoryService.getInventory(this.userId).subscribe(items => {
            this.inventory = items;
            this.inventory.forEach(item => {
              if (!item.selectedPilotId) {
                const ship = this.getShip(item.shipId);
                const availablePilots = this.getPilotsForShip(ship?.name || '');
                item.selectedPilotId = availablePilots.length > 0 ? availablePilots[0].id : undefined;
              }
              this.recalculateItemPoints(item);
            });
          });
        });
      });
    });
  }

  closeEditor() {
    this.close.emit();
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

  getPilotsForShip(shipName: string): Pilot[] {
    return this.pilots.filter(pilot => pilot.ship === shipName);
  }

  getShip(id: number): Ship | undefined {
    //console.log('Getting ship with ID:', id);
    return this.ships.find(ship => ship.id === id);
  }

  getSlotsForItem(item: InventoryItem): string[] {
    const pilot = this.getPilotById(item.selectedPilotId);
    return Array.isArray(pilot?.slots) ? pilot!.slots : [];
  }

  filterUpgradesBySlot(slot: string): Upgrade[] {
    return this.upgrades.filter(upg => upg.slot === slot);
  }

  onUpdateSubmit(): void {
    this.inventoryService.updateInventoryItem(this.userId, this.item.shipId, this.item).subscribe({
      next: (updatedUser) => {
        console.log('Inventory updated:', updatedUser);
        this.inventoryUpdated.emit();  // Notify parent to reload
      },
      error: (err) => {
        console.error('Error updating inventory:', err);
      }
    });
  }
}
