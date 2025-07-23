import { Component, Input, Output, EventEmitter } from '@angular/core';

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
export class InventoryFleetComponent {
  @Input() shipId!: number;
  @Input() userId!: number;
  user!: User;
  @Input() item!: InventoryItem;
  @Output() fleetUpdated = new EventEmitter<void>();

  selectedFleetId: number | 'new' = 'new';
  newFleetName: string = '';
  fleets: Fleet[] = [];
  filteredFleets: Fleet[] = [];

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
    const fleetShip: FleetShip = {
      shipId: this.item.shipId,
      pilotId: this.item.selectedPilotId,
      upgradeIds: this.item.selectedUpgradeIds || [],
      quantity: 1,
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
      id: 0, // will be assigned by backend
      name: this.newFleetName,
      ships: [fleetShip]
    };

    this.fleetService.createFleet(newFleet).subscribe(createdFleet => {
      this.user.fleets.push(createdFleet.id);
      this.userService.updateUser(this.user.id,this.user).subscribe(() => {
        this.fleetUpdated.emit();
      });
    });
  }

  private addToExistingFleet(fleetId: number, fleetShip: FleetShip): void {
    const fleet = this.fleets.find(f => f.id === fleetId);
    if (!fleet) return;

    fleet.ships.push(fleetShip);

    this.fleetService.updateFleet(fleet).subscribe(() => {
      this.fleetUpdated.emit();
    });
  }

}
