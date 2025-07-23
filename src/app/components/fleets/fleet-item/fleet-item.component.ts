import { Component, Input, Output, EventEmitter } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { Fleet } from '../fleet.model';
import { Ship } from '../../inventory/ship.model';
import { Pilot } from '../../pilots/pilot.model';
import { Upgrade } from '../../upgrades/upgrade.model';


import { InventoryService } from '../../inventory/inventory.service';
import { FleetService } from '../fleet.service';
import { PilotService } from '../../pilots/pilot.service';
import { UpgradeService } from '../../upgrades/upgrade.service';

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
  isEditing = false;
  pilotName: { [id: number]: string} = {};
  pilots: Pilot [] =[];

  constructor(private inventoryService: InventoryService, 
              private fleetService: FleetService,
              private pilotService: PilotService,
              private upgradeService: UpgradeService
            ) {}

  ngOnInit() {
    this.fleet.ships.forEach(item => this.getShipName(item.shipId));
    this.pilotService.getPilots().subscribe(pilots => {
      this.pilots = pilots;
    }
  )
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

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  getPilotNameById(pilotId: number): string {
    const pilot = this.pilots.find(p => p.id === pilotId);
    console.log('Pilot: ', pilot)
    return pilot ? pilot.name : 'Unknown';
  }
}
