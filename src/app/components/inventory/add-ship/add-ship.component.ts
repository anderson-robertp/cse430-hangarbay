import { Component } from '@angular/core';
import { ShipService } from '../ship.service';
import { Ship } from '../ship.model';

@Component({
  selector: 'app-add-ship',
  standalone: false,
  templateUrl: './add-ship.component.html',
  styleUrl: './add-ship.component.scss'
})
export class AddShipComponent {
  newShip: Ship = {
    id: 0,
    name: '',
    faction: [],
    attack: 0,
    agility: 0,
    hull: 0,
    shields: 0,
    actions: [],
    maneuvers: [[], [], [], [], []],
    size: 'small',
    xws: '',
    firing_arcs: [],
    dial: []
  };

  factionInput = '';
  actionInput = '';
  arcInput = '';
  dialInput = '';
  maneuverInput: number[] = [];

  catalog: Ship[] = [];

  selectedShipId: number = -1;

  constructor(private shipService: ShipService) {}

  ngOnInit(): void {
    this. catalog = this.shipService.getCatalog();
  }

  addShipFromCatalog() {
  const shipToAdd = this.catalog.find(s => s.id === this.selectedShipId);
  if (shipToAdd) {
    this.shipService.addShip(shipToAdd).subscribe(() => {
      // Refresh list or show confirmation
    });
  }
}

  addFaction(): void {
    if (this.factionInput.trim()) {
      this.newShip.faction.push(this.factionInput.trim());
      this.factionInput = '';
    }
  }

  addAction(): void {
    if (this.actionInput.trim()) {
      this.newShip.actions.push(this.actionInput.trim());
      this.actionInput = '';
    }
  }

  addArc(): void {
    if (this.arcInput.trim()) {
      this.newShip.firing_arcs.push(this.arcInput.trim());
      this.arcInput = '';
    }
  }

  addDial(): void {
    if (this.dialInput.trim()) {
      this.newShip.dial.push(this.dialInput.trim());
      this.dialInput = '';
    }
  }

  addManeuverRow(): void {
    if (this.maneuverInput.length) {
      this.newShip.maneuvers.push([...this.maneuverInput]);
      this.maneuverInput = [];
    }
  }

  onSubmit(): void {
    this.shipService.addShip(this.newShip).subscribe(() => {
      this.newShip = {
        id: 0,
        name: '',
        faction: [],
        attack: 0,
        agility: 0,
        hull: 0,
        shields: 0,
        actions: [],
        maneuvers: [[], [], [], [], []],
        size: 'small',
        xws: '',
        firing_arcs: [],
        dial: []
      };
    });
  }
}
