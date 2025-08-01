import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { InventoryService } from '../inventory.service';
import { PilotService } from '../../pilots/pilot.service';
import { UpgradeService } from '../../upgrades/upgrade.service';

import { Ship } from '../ship.model';
import { InventoryItem } from '../inventory.model';
import { Pilot } from '../../pilots/pilot.model';
import { Upgrade } from '../../upgrades/upgrade.model';
import { FleetShip } from '../../fleets/fleet.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  standalone: false
})
export class InventoryListComponent implements OnInit, OnChanges{
  @Input() inventory: InventoryItem[] = [];
  
  pilots: Pilot[] = [];
  upgrades: Upgrade[] = [];
  
  @Output() userId: number = 6; // Example user ID, replace with actual user ID as needed

  @Input() ships: Ship[] = [];

  selectedShipId: number | null = null;

  @Input() reloadTrigger!: number;



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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reloadTrigger']) {
      this.reloadInventory();
    }
  }

  getShip(id: number): Ship | undefined {
    //console.log('Getting ship with ID:', id);
    return this.ships.find(ship => ship.id === id);
  }

  getPilotsForShip(shipName: string): Pilot[] {
    return this.pilots.filter(pilot => pilot.ship === shipName);
  }

  getUpgradesforPilot(pilotId: number): Upgrade[] {
    const pilot = this.pilots.find(p => p.id === pilotId);
    if (!pilot) return [];
    return this.upgrades.filter(upgrade => pilot.slots.includes(upgrade.slot) || []);
  }

  onPilotChange(item: InventoryItem, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    item.selectedPilotId = parseInt(selectElement.value, 10);
    this.recalculateItemPoints(item);
    //console.log('Pilot changed:', item.selectedPilotId, this.getPilotById(item.selectedPilotId));
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

  getSlotsForItem(item: InventoryItem): string[] {
    const pilot = this.pilots.find(p => p.id === item.selectedPilotId);
    return pilot?.slots || [];
  }

  filterUpgradesBySlot(slot: string): Upgrade[] {
    return this.upgrades.filter(upg => upg.slot === slot);
  }

  getPilotById(id?: number): Pilot | undefined {
    if (!id) return undefined;
    return this.pilots.find(p => p.id === id);
  } 

  deleteShip(id: number): void {
    this.inventoryService.deleteShip(id).subscribe(() => {
      this.ships = this.ships.filter(ship => ship.id !== id);
    });
  }

  removeFromInventory(item: InventoryItem): void {
    this.inventory = this.inventory.filter(inv => inv.shipId !== item.shipId || inv.selectedPilotId !== item.selectedPilotId);
    this.inventoryService.deleteShip(item.shipId).subscribe(() => {
      this.reloadInventory();
    });
  }

  getUpgradeById(id: number): Upgrade | undefined {
    return this.upgrades.find(upg => upg.id === id);
  }

  getTotalInventoryPoints(): number {
    return this.inventory.reduce((sum, item) => sum + (item.points || 0), 0);
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

    this.inventoryService.updateInventoryItem(6, item.shipId, item).subscribe(() => {
      //console.log('Inventory item updated:', item);
    });
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

  getTotalPointsForItem(item: InventoryItem): number {
    const pilot = this.getPilotById(item.selectedPilotId);
    const pilotPoints = pilot?.points || 0;

    const upgradePoints = (item.selectedUpgradeIds || [])
      .map(id => this.getUpgradeById(id)?.points || 0)
      .reduce((sum, val) => sum + val, 0);

    return pilotPoints + upgradePoints;
  }

  reloadInventory(): void {
    this.inventoryService.getInventory(6).subscribe((items: InventoryItem[]) => {
      this.inventory = items;
      //console.log('Inventory reloaded:', this.userShips);
    });
  }

  selectShip(shipId: number): void {
    this.selectedShipId = shipId;
  }
}
