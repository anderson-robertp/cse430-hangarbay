import { Component, OnInit } from '@angular/core';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';

import { InventoryService} from './inventory.service';

import { Ship } from './ship.model';
import { InventoryItem } from './inventory.model';


@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {
  userShips: InventoryItem[] = [];
  selectedShip: Ship | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getInventory(6).subscribe((items: InventoryItem[]) => {
      this.userShips = items;
      console.log('Inventory loaded:', this.userShips);
    });
  }

  /*onShipSelected(ship: Ship): void {
    this.selectedShip = { ...ship };
  }*/

  /*onShipDeleted(shipId: number): void {
    this.ships = this.ships.filter(ship => ship.id !== shipId);
  }*/

}
