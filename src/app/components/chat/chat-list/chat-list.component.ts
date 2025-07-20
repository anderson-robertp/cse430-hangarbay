import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChatMessage } from '../chat.model';
import { ChatService } from '../chat.service';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {
  chats: ChatMessage[] = [];
  selectedChat: ChatMessage | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private chatService: ChatService, private userService: UserService) {}

  onAddChat(chat: ChatMessage): void {
    this.chatService.addChatMessage(chat).subscribe((newChat: ChatMessage) => {
      this.chats.push(newChat);
      this.selectedChat = newChat; // Automatically select the newly added chat
    });
  }

  ngOnInit(): void {
    this.chatService.getChatMessages().subscribe(chats => {
      this.chats = chats;
      this.chatService['chatMessages'] = chats; // Update the private chatMessages array
      this.chatService.sortAndSend(); // Ensure the chat messages are sorted
    });
    this.chatService.chatChangedEvent.subscribe(updatedChats => {
      this.chats = updatedChats;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
