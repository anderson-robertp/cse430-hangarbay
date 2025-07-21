import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {
  private apiUrl = 'http://localhost:3000/api/upgrades';

  constructor(private http: HttpClient) { }

  getUpgrades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUpgrade(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addUpgrade(upgrade: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, upgrade);
  }

  updateUpgrade(id: string, upgrade: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, upgrade);
  }

  deleteUpgrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}