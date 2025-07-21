import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilot } from './pilot.model';

@Injectable({
  providedIn: 'root'
})
export class PilotService {
  private apiUrl = 'http://localhost:3000/api/pilots';

  constructor(private http: HttpClient) { }

  getPilots(): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(this.apiUrl);
  }

  getPilotById(id: string): Observable<Pilot> {
    return this.http.get<Pilot>(`${this.apiUrl}/${id}`);
  }

  addPilot(pilot: Pilot): Observable<Pilot> {
    return this.http.post<Pilot>(this.apiUrl, pilot);
  }

  updatePilot(id: string, pilot: Pilot): Observable<Pilot> {
    return this.http.put<Pilot>(`${this.apiUrl}/${id}`, pilot);
  }

  deletePilot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}