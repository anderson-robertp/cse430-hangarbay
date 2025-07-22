import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Ship } from '../inventory/ship.model';
import { Fleet, FleetShip } from './fleet.model';
import { Pilot } from '../pilots/pilot.model';
import { Upgrade } from '../upgrades/upgrade.model';

import { InventoryService } from '../inventory/inventory.service';
import { FleetService } from './fleet.service';
import { PilotService } from '../pilots/pilot.service';
import { UpgradeService } from '../upgrades/upgrade.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-fleets',
  standalone: false,
  templateUrl: './fleets.component.html',
  styleUrl: './fleets.component.scss'
})
export class FleetsComponent {
  
  selectedFleet: Fleet = { id: 0, name: '', ships: [] };

  @Input() fleet: Fleet = { id: 0, name: '', ships: [] };

  @Output() deleteFleet = new EventEmitter<Fleet>();

  @Output() selectFleet = new EventEmitter<Fleet>();

  @Input() userId: number = 6; // Example user ID, replace with actual user ID as needed

  @Output() fleets: Fleet[] = [];

  ships: Ship[] = [];
  pilots: Pilot[] = [];

  constructor(private fleetService: FleetService,
              private inventoryService: InventoryService,
              private pilotService: PilotService,
              private upgradeService: UpgradeService
  ) {}

  ngOnInit() {
    
  }

  getShip(id: number): Observable<Ship> {
    return this.inventoryService.getShip(id);
  }

  getPilotsForShip(shipName: string): Observable<Pilot[]> {
    return this.pilotService.getPilotsByShip(shipName);
  }

  onFleetSelected(fleet: Fleet) {
    this.selectedFleet = { ...fleet };
  }

  onFleetDeleted(fleet: Fleet) {
    this.fleets = this.fleets.filter(f => f.id !== fleet.id);
  }

  onFleetSaved(event: Event): void {
    event.preventDefault();
    
    this.fleetService.updateFleet(this.selectedFleet)?.subscribe({
      next: () => {
        this.fleetService.getFleets().subscribe(fleets => {
          this.fleets = fleets;
        });
      },
      error: (err: unknown) => console.error('Error updating fleet', err)
    });
  }
}
