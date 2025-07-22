import { Component, Input, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Fleet,FleetShip } from '../fleet.model';
import { Ship } from '../../inventory/ship.model';
import { User } from '../../users/user.model';

import { FleetService } from '../fleet.service';
import { UserService } from '../../users/user.service';

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
  @Input() userId: number = 6;
  filteredFleets: Fleet[] = [];
  user: User = {} as User;

  ships: Ship[] = [];

  selectedFleet?: Fleet | null;

  constructor(private fleetService: FleetService,
              private userService: UserService
            ) {}

  ngOnInit(): void {
    forkJoin({
      user: this.userService.getUserById(this.userId),
      fleets: this.fleetService.getFleets()
    }).subscribe({
      next: ({ user, fleets }) => {
        this.user = user;
        this.fleets = fleets;

        console.log('User loaded:', user);
        console.log('Fleets loaded:', fleets);

        this.filteredFleets = fleets.filter(fleet =>
          user.fleets?.includes(fleet.id)
        );

        console.log('FilteredFleets', this.filteredFleets);
      },
      error: (err) => {
        console.error('Failed to load user or fleets', err);
      }
    });
  }

  getUserFleets(){
    
  }

  getShip(id: number): Ship | undefined {
    return this.ships.find(ship => ship.id === id);
  }

  onFleetSelected(fleet: Fleet): void {
    this.selectedFleet = { ...fleet };
    this.select.emit(fleet);
  }

  onFleetSaved(event: Event): void {
    if (this.selectedFleet) {
      this.fleetService.updateFleet(this.selectedFleet).subscribe(updatedFleet => {
        const index = this.fleets.findIndex(f => f.id === updatedFleet.id);
        if (index !== -1) {
          this.fleets[index] = updatedFleet;
        } else {
          this.fleets.push(updatedFleet);
        }
        this.selectedFleet = null;
      });
    }
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
