import { Component, Input, OnInit } from '@angular/core';

import { InventoryItem } from './inventory.model';

import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent implements OnInit {

  @Input() userId: number = 6;

  inventory: InventoryItem[] = [];

  reloadCounter = 0;

  constructor( private inventoryService: InventoryService) {}

  ngOnInit(): void {}

  reloadInventory(): void {
    this.inventoryService.getInventory(6).subscribe((items: InventoryItem[]) => {
      this.inventory = items;
      console.log('Inventory reloaded:', this.inventory);
    });
    this.reloadCounter++;
  }

  

}
