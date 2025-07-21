import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Fleet } from '../fleet.model';
import { Ship } from '../../inventory/ship.model';

@Component({
  selector: 'app-fleet-list',
  standalone: false,
  templateUrl: './fleet-list.component.html',
  styleUrl: './fleet-list.component.scss'
})



export class FleetListComponent {
  @Input() fleets: Fleet[] = [];
  @Output() select = new EventEmitter<Fleet>();
  @Output() delete = new EventEmitter<Fleet>();
  @Input() userId!: number;

  ships: Ship[] = [];

  constructor() {}

  ngOnInit(): void {}

  getShip(id: number): Ship | undefined {
    return this.ships.find(ship => ship.id === id);
  }



  onSelect(fleet: Fleet) {
    this.select.emit(fleet);
  }

  onDelete(fleet: Fleet) {
    this.delete.emit(fleet);
  }

  /*getTotalPoints(fleet: Fleet): number {
    return fleet.ships.reduce((total, ship) => total + ship.points, 0);
  }*/
}
