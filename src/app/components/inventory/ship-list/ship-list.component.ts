import { Component, OnInit } from '@angular/core';
import { ShipService } from '../ship.service';
import { Ship } from '../ship.model';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrl: './ship-list.component.scss',
  standalone: false
})
export class ShipListComponent implements OnInit{
  ships: Ship[] = [];

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    /*this.shipService.getShips().subscribe((data) => {
      this.ships = data;
    });*/
    this.ships = this.shipService.getInventory()
    

  }

  deleteShip(id: number): void {
    this.shipService.deleteShip(id).subscribe(() => {
      this.ships = this.ships.filter(ship => ship.id !== id);
    });
  }
}
