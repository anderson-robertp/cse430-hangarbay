import { Component, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Ship } from '../ship.model';
import { InventoryItem } from '../inventory.model';
import { FleetShip } from '../../fleets/fleet.model';

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
  selectedPilotId: number | undefined;

  @ViewChild('shipSelect') shipSelect: any;
  @ViewChild('quantityInput') quantityInput: any;
  quantity: number = 1;

  @Input() userId!: number; // Default user ID, can be set from parent component

  @Input() fromFleet = false;
  shipSelected: EventEmitter<FleetShip> = new EventEmitter<FleetShip>();

  @Output() inventoryUpdated = new EventEmitter<void>();

  @Output() shipAdded = new EventEmitter<void>();
    

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
    console.log('Adding ship to inventory:', this.selectedShipId, 'Quantity:', this.quantity);
    if (!this.selectedShipId || !this.quantity) {
      console.error('No ship selected or quantity is zero.');
      return;
    }
    //console.log('Catalog:', this.catalog);
    const shipToAdd = this.catalog.find(ship => ship.id === Number(this.selectedShipId));
    console.log('Ship to add:', shipToAdd);
    if (!shipToAdd) {
      console.error('Selected ship not found in catalog.');
      return;}

    // First: fetch current user inventory
    console.log('Fetching inventory for user ID:', this.userId);
    this.inventoryService.getInventory(this.userId).subscribe({
      next: (inventory: InventoryItem[]) => {
        const existingItem = inventory.find(item => item.shipId === shipToAdd.id);

        if (existingItem) {
          // If ship already exists, update the quantity
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + this.quantity
          };

          this.inventoryService.updateInventoryItem(this.userId, existingItem.shipId.toString(), updatedItem)
            .subscribe({
              next: () => {
                console.log('Inventory item updated.');
                this.resetForm();
                this.shipAdded.emit();
              },
              error: err => console.error('Failed to update inventory:', err)
            });

        } else {
          // Otherwise, create a new entry
          const newInventoryItem = {
            shipId: shipToAdd.id,
            quantity: this.quantity,
            selectedPilotId: 0,
            selectedUpgrades: [],
            points: 1,
          };

          this.inventoryService.addToInventory(this.userId, newInventoryItem)
            .subscribe({
              next: () => {
                console.log('Inventory item added.');
                this.resetForm();
                this.shipAdded.emit();
              },
              error: err => console.error('Failed to add new item:', err)
            });
        } 
      },
      error: err => console.error('Failed to fetch inventory:', err)
    });
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

  addShipToFleet(event: Event): void {
    event.preventDefault();
    if (!this.selectedShipId || this.quantity <= 0) {
      console.error('No ship selected or invalid quantity.');
      return;
    }

    const fleetShip: FleetShip = {
      shipId: this.selectedShipId,
      quantity: this.quantity,
      totalPoints: 0, // This will be calculated later
      pilotId: this.selectedPilotId || undefined,
      upgradeIds: []
    };

    this.shipSelected.emit(fleetShip);
    this.resetForm();
    
  }

  resetForm(): void {
    this.selectedShipId = 0;
    this.quantity = 1;
    if (this.shipSelect) {
      this.shipSelect.nativeElement.value = '';
    }
  }

}
