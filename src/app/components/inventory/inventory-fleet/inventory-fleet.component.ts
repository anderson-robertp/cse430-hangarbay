import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { InventoryItem } from '../inventory.model';
import { Fleet, FleetShip } from '../../fleets/fleet.model';
import { User } from '../../users/user.model';

import { FleetService } from '../../fleets/fleet.service';
import { UserService } from '../../users/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-inventory-fleet',
  standalone: false,
  templateUrl: './inventory-fleet.component.html',
  styleUrl: './inventory-fleet.component.scss'
})
export class InventoryFleetComponent implements OnInit{
  @Input() shipId!: number;
  @Input() userId!: number;
  user!: User;
  @Input() item!: InventoryItem;
  @Output() fleetUpdated = new EventEmitter<void>();


  selectedFleetId: number | 'new' = 'new';
  newFleetName: string = '';
  fleets: Fleet[] = [];
  filteredFleets: Fleet[] = [];
  quantity: number = 1;


  constructor(
    private fleetService: FleetService,
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

  onAddToFleet(): void {
    if (!this.item.shipId || this.quantity <= 0 || this.item.selectedPilotId === undefined) {
      console.error('No ship selected, invalid quantity, or no pilot assigned.');
      return;
    }

    const fleetShip: FleetShip = {
      shipId: this.item.shipId,
      pilotId: this.item.selectedPilotId,
      upgradeIds: this.item.selectedUpgradeIds || [],
      quantity: this.quantity,
      totalPoints: this.item.points
    };

    if (this.selectedFleetId === 'new') {
      this.createFleetAndAdd(fleetShip);
    } else {
      this.addToExistingFleet(this.selectedFleetId as number, fleetShip);
    }
  }

private createFleetAndAdd(fleetShip: FleetShip): void {
  const newFleet: Fleet = {
    id: 0, // will be set by backend
    name: this.newFleetName,
    ships: [fleetShip]
  };

  this.fleetService.createFleet(newFleet).subscribe(createdFleet => {
    this.user.fleets.push(createdFleet.id);
    this.userService.updateUser(this.user.id, this.user).subscribe(() => {
      this.fleetUpdated.emit();
    });
  });
}

private addToExistingFleet(fleetId: number, fleetShip: FleetShip): void {
  this.fleetService.getFleetById(fleetId).subscribe(existingFleet => {
    existingFleet.ships.push(fleetShip);

    this.fleetService.updateFleet(existingFleet).subscribe(updatedFleet => {
      this.fleetUpdated.emit(); // Notify parent to refresh
    });
  });
}


}
