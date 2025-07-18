import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ship } from '../inventory/ship.model';
import { FleetService } from './fleet.service';
import { Fleet } from './fleet.model';
import { ShipService } from '../inventory/ship.service';



@Component({
  selector: 'app-fleets',
  standalone: false,
  templateUrl: './fleets.component.html',
  styleUrl: './fleets.component.scss'
})
export class FleetsComponent {
  fleets: Fleet[] = [];
  selectedFleet: Fleet | null = null;

  @Input() fleet: Fleet = { id: 0, name: '', ships: [] };

  @Output() deleteFleet = new EventEmitter<Fleet>();

  constructor(private fleetService: FleetService) {}

  ngOnInit() {
    this.fleetService.getFleets().subscribe((fleets: Fleet[]) => {
      this.fleets = fleets;
    });
  }

  onFleetSelected(fleet: Fleet) {
    this.selectedFleet = { ...fleet };
  }

  onFleetDeleted(fleet: Fleet) {
    this.fleets = this.fleets.filter(f => f.id !== fleet.id);
  }

  onFleetSaved(fleet: Fleet): void {
    this.fleetService.updateFleet(fleet)?.subscribe({
      next: () => {
        this.fleetService.getFleets().subscribe(fleets => {
          this.fleets = fleets;
        });
      },
      error: (err: unknown) => console.error('Error updating fleet', err)
    });
  }
}
