import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ship } from './ship.model';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import  MOCKSHIPLIST  from './MOCKSHIPLIST.json';

import { UserService } from '../users/user.service';
import { InventoryItem } from './inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/api/ships';
  private userId: number = 6;
  private ships: Ship[] = [];

  constructor(private http: HttpClient, private userService: UserService) { }

  getCatalog(): Observable<Ship[]> {
    return this.http.get<Ship[]>(this.apiUrl);
  }

  getInventory(userId: number): Observable<InventoryItem[]> {
    return this.userService.getUserById(userId).pipe(
      switchMap(user => this.getShips().pipe(
        map(ships => {
          return user.inventory.map(inv => {
            const ship = ships.find(s => s.id === inv.shipId);
            console.log('Inventory item:', inv);
            console.log('Found ship:', ship);
            return {
              ship,
              shipId: inv.shipId,
              quantity: inv.quantity,
              upgrades: inv.upgradeIds,
              points: inv.totalPoints
            };
          });
        })
      ))
    );
  }

  


  getShips(): Observable<Ship[]> {
    return this.http.get<Ship[]>(this.apiUrl);
  }

  getShip(id: string): Observable<Ship> {
    return this.http.get<Ship>(`${this.apiUrl}/${id}`);
  }

  addShip(ship: Ship): Observable<Ship> {
    return this.http.post<Ship>(this.apiUrl, ship);
  }

  updateShip(id: string, ship: Ship): Observable<Ship> {
    return this.http.put<Ship>(`${this.apiUrl}/${id}`, ship);
  }

  deleteShip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
