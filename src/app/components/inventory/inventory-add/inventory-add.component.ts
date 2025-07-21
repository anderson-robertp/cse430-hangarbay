import { Component, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Ship } from '../ship.model';
import { InventoryItem } from '../inventory.model';

@Component({
  selector: 'app-inventory-add',
  standalone: false,
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.scss'
})
export class InventoryAddComponent {
  inventory: InventoryItem[] = [];
  //quantity: number = 1;

  private _selectedShipId: number | undefined;

  @ViewChild('shipSelect') shipSelect: any;
  @ViewChild('quantity') quantity: number = 1;

  @Input() userId!: number; // Default user ID, can be set from parent component

  

  @Output() inventoryUpdated = new EventEmitter<void>();
    

  /*newShip: Ship = {
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
  maneuverInput: number[] = [];*/

  catalog: Ship[] = [];

  //selectedShipId: number = -1;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getCatalog().subscribe((ships: Ship[]) => {
      this.catalog = ships;
    });
  }

  addShipFromCatalog() {

    if (!this.selectedShipId) {
      console.error('No ship selected');
      return;
    }

    // Find the ship in the catalog
    const shipToAdd = this.catalog.find(s => s.id === this.selectedShipId);
    if (!shipToAdd) return;

    const quantityToAdd = this.quantity > 0 ? this.quantity : 1;
    
    if (shipToAdd) {
      const inventoryItem: InventoryItem = {
        shipId: shipToAdd.id,
        quantity: quantityToAdd,
        selectedPilotId: undefined, // or set a default pilot ID if needed
        selectedUpgradeIds: [],
        points: 0
      };

      this.inventoryService.addToInventory(6, inventoryItem).subscribe(() => {
        this.inventoryUpdated.emit()
      });
    }
  }

  /*addFaction(): void {
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

  sortAndSend(): void {
    this.newShip.faction.sort();
    this.newShip.actions.sort();
    this.newShip.firing_arcs.sort();
    this.newShip.dial.sort();
    this.inventoryService.addShip(this.newShip).subscribe(() => {
      // Optionally reset the form or show a success message
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
  }*/
  set selectedShipId(value: number) {
    this._selectedShipId = value;
    console.log('Selected ship ID:', this._selectedShipId);
    if (value) {
      this.quantity = 1; // Reset quantity when a ship is selected
    }
  }

  get selectedShipId(): number | undefined {
    return this._selectedShipId;
  }

}
