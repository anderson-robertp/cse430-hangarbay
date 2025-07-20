import { Injectable, EventEmitter } from '@angular/core';

import { ChatMessage } from './chat.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatChangedEvent = new BehaviorSubject<ChatMessage[]>([]);
  private chatMessages: ChatMessage[] = [];

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getMaxId(): number {
    let maxId = 0;
    for (let m of this.chatMessages) {
      if (!m || !m.id) continue; // skip undefined or invalid messages
      let currentId = m.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getChatMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>('http://localhost:3000/api/chats');
  }

  getChatMessage(id: number): Observable<ChatMessage> {
    return this.http.get<ChatMessage>(`http://localhost:3000/api/chats/${id}`);
  }

  addChatMessage(message: ChatMessage): Observable<ChatMessage> {
    console.log('Adding chat message:', message);
    if (!message) {
      return new Observable<ChatMessage>(observer => {
        observer.error('Invalid chat message');
        observer.complete();
      });
    }
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<ChatMessage>('http://localhost:3000/api/chats', message, { headers: header }).pipe(
      tap((newMessage: ChatMessage) => {
        this.chatMessages.push(newMessage);
        console.log('Chat message added:', newMessage);
        this.sortAndSend();
      }),
          catchError((error) => {
            console.error('Error adding chat message:', error);
            return throwError(() => error);
      })
    );
  }

  updateChatMessage(message: ChatMessage): Observable<ChatMessage> {
    return this.http.put<ChatMessage>(`http://localhost:3000/api/chats/${message.id}`, message);
  }

  deleteChatMessage(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/chats/${id}`);
  }

  sortAndSend() {
    this.chatMessages.sort((a, b) => a.id - b.id);
    this.chatChangedEvent.next(this.chatMessages.slice());
  }
}
