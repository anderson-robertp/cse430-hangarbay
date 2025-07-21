import { Component, OnInit, Input } from '@angular/core';

import { InventoryService } from '../inventory.service';
import { PilotService } from '../../pilots/pilot.service';
import { UpgradeService } from '../../upgrades/upgrade.service';

import { Ship } from '../ship.model';
import { InventoryItem } from '../inventory.model';
import { Pilot } from '../../pilots/pilot.model';
import { Upgrade } from '../../upgrades/upgrade.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss',
  standalone: false
})
export class InventoryListComponent implements OnInit{
  @Input() inventory: InventoryItem[] = [];
  //ships: Ship[] = [];
  pilots: Pilot[] = [];
  upgrades: Upgrade[] = [];

  @Input() ships: Ship[] = [];

  @Input() selectedPilotId: number | undefined;

  constructor(
    private inventoryService: InventoryService,
    private pilotService: PilotService,
    private upgradeService: UpgradeService
  ) { }

  ngOnInit(): void {
    /*this.inventoryService.getInventory(6).subscribe(items => {
      this.inventory = items;
      console.log('Inventory loaded:', this.inventory);
    });*/
    
    

    console.log('Inventory loaded:', this.inventory);
    this.inventoryService.getShips().subscribe(ships => this.ships = ships);
    console.log('Ships loaded:', this.ships);
    
    this.pilotService.getPilots().subscribe(pilots => this.pilots = pilots);
    console.log('Pilots loaded:', this.pilots);
    this.upgradeService.getUpgrades().subscribe(upgrades => this.upgrades = upgrades);
    console.log('Upgrades loaded:', this.upgrades);

    
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
    console.log('Pilot changed:', item.selectedPilotId, this.getPilotById(item.selectedPilotId));
  }

  onUpgradeChange(item: InventoryItem, index: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = parseInt(target.value, 10);

    if (!item.selectedUpgradeIds) {
      item.selectedUpgradeIds = [];
    }
    item.selectedUpgradeIds[index] = selectedValue;
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
}
