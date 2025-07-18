import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ship } from './ship.model';
import { Observable } from 'rxjs';
import  MOCKSHIPLIST  from './MOCKSHIPLIST.json';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private apiUrl = 'http://localhost:3000/api/ships';

  constructor(private http: HttpClient) { }

  getCatalog(): Ship[] {
    return MOCKSHIPLIST;
  }

  getInventory(): Ship[] {
    return MOCKSHIPLIST
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
