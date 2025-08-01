import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, of, tap } from 'rxjs';


import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  user: User | null = null;

  userChangedEvent = new Subject<User[]>();

  users$ = new BehaviorSubject<User[]>([]);

  constructor( private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>('http://localhost:3000/api/users')
      .subscribe(users => {
        this.users = users;
        this.sortAndSend();
      });
  }
      

  getUserById(id: Number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/users/${id}`).pipe(
      tap(user => console.log('Fetched user:', user))
    );
  }

  updateUser(id: number, user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`http://localhost:3000/api/users/${id}`, user, {headers: headers}).pipe(
      tap(user => console.log('User: ',id, 'updated', user))
    );
  }

  sortAndSend() {
    this.users.sort((a, b) => a.id - b.id);
    this.userChangedEvent.next(this.users.slice());
  }
}
