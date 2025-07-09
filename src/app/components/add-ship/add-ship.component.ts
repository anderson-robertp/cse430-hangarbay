import { Component } from '@angular/core';
import { ShipService } from '/Code/cse430-hangarbay/src/app/services/ship.service';
import { Ship } from '/Code/cse430-hangarbay/src/app/models/ship.model';

@Component({
  selector: 'app-add-ship',
  standalone: false,
  templateUrl: './add-ship.component.html',
  styleUrl: './add-ship.component.scss'
})
export class AddShipComponent {
  newShip: Ship = {
    name: '',
    faction: 'Rebel',
    quantity: 1,
    pilots: []
  };

  pilotInput = '';

  constructor(private shipService: ShipService) {}

  addPilot(): void {
    if (this.pilotInput.trim()) {
      this.newShip.pilots.push(this.pilotInput.trim());
      this.pilotInput = '';
    }
  }

  onSubmit(): void {
    this.shipService.addShip(this.newShip).subscribe(() => {
      this.newShip = { name: '', faction: 'Rebel', quantity: 1, pilots: [] };
    });
  }
}
