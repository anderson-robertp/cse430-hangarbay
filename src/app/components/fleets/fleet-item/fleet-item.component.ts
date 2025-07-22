import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Fleet } from '../fleet.model';
import { InventoryService } from '../../inventory/inventory.service';
import { FleetService } from '../fleet.service';
import { Ship } from '../../inventory/ship.model';
import { catchError, map, Observable, of } from 'rxjs';

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

  shipNames: { [id: number]: string } = {};

  constructor(private inventoryService: InventoryService, private fleetService: FleetService) {}

  ngOnInit() {
    this.fleet.ships.forEach(item => this.getShipName(item.shipId));
  }

  onSelect() {
    this.select.emit(this.fleet);
  }

  onDelete() {
    this.delete.emit(this.fleet);
  }
  getFleetPoints(fleet: Fleet): number {
    return fleet.ships.reduce((sum, ship) => sum + ship.totalPoints * ship.quantity, 0);
  }

  getShipName(shipId: number): void {
    // Avoid re-fetching
    if (this.shipNames[shipId]) return;

    this.inventoryService.getShip(shipId).subscribe({
      next: ship => this.shipNames[shipId] = ship.name,
      error: () => this.shipNames[shipId] = 'Unknown Ship'
    });
  }
}
