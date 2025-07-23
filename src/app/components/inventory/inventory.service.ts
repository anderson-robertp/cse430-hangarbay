import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ship } from './ship.model';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
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

  inventoryChangedEvent = new Subject<InventoryItem[]>();

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
            //console.log('Inventory item:', inv);
            //console.log('Found ship:', ship);
            return {
              ship,
              shipId: inv.shipId,
              quantity: inv.quantity,
              selectedPilotId: inv.pilotId,
              upgrades: inv.upgradeIds,
              points: inv.totalPoints
            };
          });
        })
      ))
    );
  }

  addToInventory(userId: number, item: InventoryItem): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`http://localhost:3000/api/users/${userId}/inventory`, item, {headers: headers})
    .pipe(
      tap(() => {
        this.inventoryChangedEvent.next([item]); // Emit the new item
        //console.log('Inventory item added.' + item.shipId);
      }),
      catchError(error => {
        console.error('Error adding to inventory:', error);
        return of(null); // Return an empty observable on error
      })
    );
  }

  updateInventoryItem(userId: number, shipId: number, item: InventoryItem): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`http://localhost:3000/api/users/${userId}/inventory/${shipId}`, item, {headers: headers})
    .pipe(
      tap(() => {
        this.inventoryChangedEvent.next([item]); // Emit the updated item
        console.log('Inventory item updated.' + item.shipId);
      }),
      catchError(error => {
        console.error('Error updating inventory item:', error);
        return of(null); // Return an empty observable on error
      })
    );
  }



  getShips(): Observable<Ship[]> {
    return this.http.get<Ship[]>(this.apiUrl);
  }

  getShip(id: number): Observable<Ship> {
    console.log("Getting Ship Id: " + id)
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
