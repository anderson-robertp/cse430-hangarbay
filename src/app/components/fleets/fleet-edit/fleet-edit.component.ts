import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Fleet } from '../fleet.model';
import { Ship } from '../../inventory/ship.model';

@Component({
  selector: 'app-fleet-edit',
  standalone: false,
  templateUrl: './fleet-edit.component.html',
  styleUrl: './fleet-edit.component.scss'
})
export class FleetEditComponent {
  @Input() fleet: Fleet = { id: 0, name: '', ships: [] };
  @Output() saveFleet = new EventEmitter<Fleet>();

  inventory: Ship[] = [];

  toggleShip(ship: Ship) {
    const index = this.fleet.ships.findIndex(s => s === ship.xws);
    if (index === -1) {
      this.fleet.ships.push(ship.xws);
    } else {
      this.fleet.ships.splice(index, 1);
    }
  }

  isShipInFleet(ship: Ship): boolean {
    return this.fleet.ships.some(s => s === ship.xws);
  }

  save() {
    this.saveFleet.emit(this.fleet);
  }
}
