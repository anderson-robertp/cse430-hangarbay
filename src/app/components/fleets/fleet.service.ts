import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fleet, FleetShip } from './fleet.model';
import { Observable, tap } from 'rxjs';
import MOCKFLEETS from './MOCKFLEETS.json';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private http: HttpClient) { }

  private fleets: Fleet[] = [];
  private apiUrl = 'http://localhost:3000/api/fleets';
  private mockFleetUrl = 'src/app/components/fleets/MOCKFLEETS.json';

  /*getMockFleets(): Fleet[] {
    return MOCKFLEETS;
  }*/

  

  getFleets(): Observable<Fleet[]> {
    return this.http.get<Fleet[]>(this.apiUrl);
  }

  getFleetById(fleetId: number): Observable<Fleet> {
    return this.http.get<Fleet>(`http://localhost:3000/api/fleets/${fleetId}`)
  }
  

  addFleet(fleet: Fleet): void {
    this.fleets.push(fleet);
  }

  deleteFleet(id: number): void {
    this.fleets = this.fleets.filter(f => f.id !== id);
  }

  updateFleet(fleet: Fleet): Observable<Fleet> {
    return this.http.put<Fleet>(`/api/fleets/${fleet.id}`, fleet);
  }

  getUserFleets(userId: number): Observable<Fleet[]> {
    return this.http.get<Fleet[]>(`${this.apiUrl}?userId=${userId}`);
  }

  createFleet(newFleet: Fleet){
    this.addFleet(newFleet)
    return this.http.post<Fleet>(`http://localhost:3000/api/fleets`, newFleet).pipe(
      tap(newFleet => console.log('Fleet Added: ', newFleet))
    )
  }

  addToExistingFleet(fleetId: number, fleetShip: FleetShip){
    return this.http.put<Fleet>(`http://localhost:3000/api/fleets/${fleetId}`, fleetShip).pipe(
      tap(fleetShip => console.log('Ship added to FleetId:',fleetId,' - ',fleetShip.name))
    )
  }
}
