import { Component, OnInit } from '@angular/core';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

import { InventoryService} from './inventory.service';

import { Ship } from './ship.model';
import { InventoryItem } from './inventory.model';
import { Pilot } from '../pilots/pilot.model';


@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  userShips: InventoryItem[] = [];
  selectedShip: Ship | null = null;
  ships: Ship[] = [];
  pilots: Pilot[] = [];
  someUserId: number = 6; // Example user ID, replace with actual user ID as needed

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getInventory(this.someUserId).subscribe((items: InventoryItem[]) => {
      this.userShips = items;
      //console.log('Inventory loaded:', this.userShips);
    });
    this.userShips.forEach(item => {
      if (!item.selectedPilotId) {
        const pilots = this.getPilotsForShip(this.getShip(item.shipId)?.name || '');
        //console.log('Available pilots for ship:', pilots);
        item.selectedPilotId = pilots.length > 0 ? pilots[0].id : undefined;
        //console.log('Selected pilot ID:', item.selectedPilotId);
      }
    });
    this.reloadInventory();
  }

  /*onShipSelected(ship: Ship): void {
    this.selectedShip = { ...ship };
  }*/

  /*onShipDeleted(shipId: number): void {
    this.ships = this.ships.filter(ship => ship.id !== shipId);
  }*/

  getPilotsForShip(shipName: string): Pilot[] {
    return this.pilots.filter(pilot => pilot.ship === shipName);
  }
  getShip(id: number): Ship | undefined {
    //console.log('Getting ship with ID:', id);
    return this.ships.find(ship => ship.id === id);
  }

  reloadInventory(): void {
    this.inventoryService.getInventory(6).subscribe((items: InventoryItem[]) => {
      this.userShips = items;
      //console.log('Inventory reloaded:', this.userShips);
    });
  }

}
