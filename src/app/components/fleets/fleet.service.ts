import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fleet } from './fleet.model';
import { Observable } from 'rxjs';
import MOCKFLEETS from './MOCKFLEETS.json';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private http: HttpClient) { }

  private fleets: Fleet[] = [];
  private apiUrl = 'http://localhost:3000/api/fleets';
  private mockFleetUrl = 'src/app/components/fleets/MOCKFLEETS.json';

  getMockFleets(): Fleet[] {
    return MOCKFLEETS;
  }

  getFleets(): Observable<Fleet[]> {
    return this.http.get<Fleet[]>(this.mockFleetUrl);
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
}
