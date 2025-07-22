import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Fleet } from '../fleet.model';
import { InventoryService } from '../../inventory/inventory.service';
import { FleetService } from '../fleet.service';
import { Ship } from '../../inventory/ship.model';

@Component({
  selector: 'app-fleet-item',
  standalone: false,
  templateUrl: './fleet-item.component.html',
  styleUrl: './fleet-item.component.scss'
})

export class FleetItemComponent {
  
  @Input() fleet!: Fleet;
  @Output() select = new EventEmitter<Fleet>();
  @Output() delete = new EventEmitter<Fleet>();

  constructor(private inventoryService: InventoryService, private fleetService: FleetService) {}

  ngOnInit() {}

  onSelect() {
    this.select.emit(this.fleet);
  }

  onDelete() {
    this.delete.emit(this.fleet);
  }
  getFleetPoints(fleet: Fleet): number {
    return fleet.ships.reduce((sum, ship) => sum + ship.totalPoints * ship.quantity, 0);
  }

  getShipName(shipId: number): string {
    console.log('Fetching ship name for ID:', shipId);
    /*this.inventoryService.getShip(shipId).subscribe(ship => {
      return ship.name;
    });*/
    return 'Unknown Ship';
  }
}
