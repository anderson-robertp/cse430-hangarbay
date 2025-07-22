import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Fleet, FleetShip } from '../fleet.model';
import { Ship } from '../../inventory/ship.model';

import { FleetService } from '../fleet.service';
import { InventoryService } from '../../inventory/inventory.service';
import { PilotService } from '../../pilots/pilot.service';
import { UpgradeService } from '../../upgrades/upgrade.service';

@Component({
  selector: 'app-fleet-edit',
  standalone: false,
  templateUrl: './fleet-edit.component.html',
  styleUrl: './fleet-edit.component.scss'
})
export class FleetEditComponent {
  @Input() fleet!: Fleet;
  @Output() fleetSaved = new EventEmitter<Fleet>();

  availableShips: Ship[] = [];

  constructor(
    private fleetService: FleetService,
    private inventoryService: InventoryService,
  ){}

  ngOnInit() {

  }

  toggleShip(ship: Ship) {
    const index = this.fleet.ships.findIndex(s => s.shipId === ship.id);
    if (index === -1) {
      //this.fleet.ships.push(ship);
    } else {
      this.fleet.ships.splice(index, 1);
    }
  }

  isShipInFleet(ship: Ship): boolean {
    return this.fleet.ships.some(s => s.shipId === ship.id);
  }

  saveFleet() {
    this.fleetSaved.emit(this.fleet);
  }

  getShipName(shipId: number): string {
    const ship = this.availableShips.find(s => s.id === shipId);
    return ship ? ship.name : 'Unknown Ship';
  }

  getFleetPoints(fleet: Fleet): number {
    return fleet.ships.reduce((sum, s) => sum + s.totalPoints * s.quantity, 0);
  }

  removeShip(index: number) {
    this.fleet.ships.splice(index, 1);
  }

  addShipToFleet(event: FleetShip) {
    const existingShip = this.fleet.ships.find(s => s.shipId === event.shipId);
    if (existingShip) {
      existingShip.quantity += event.quantity;
    } else {
      this.fleet.ships.push(event);
    }
  }
}
