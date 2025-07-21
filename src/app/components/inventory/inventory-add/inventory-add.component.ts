import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Ship } from '../ship.model';

@Component({
  selector: 'app-inventory-add',
  standalone: false,
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.scss'
})
export class InventoryAddComponent {
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

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getCatalog().subscribe((ships: Ship[]) => {
      this.catalog = ships;
    });
  }

  addShipFromCatalog() {
  const shipToAdd = this.catalog.find(s => s.id === this.selectedShipId);
  if (shipToAdd) {
    this.inventoryService.addShip(shipToAdd).subscribe(() => {
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
    this.inventoryService.addShip(this.newShip).subscribe(() => {
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
