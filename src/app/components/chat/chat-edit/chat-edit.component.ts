import { Component, ElementRef, ViewChild } from '@angular/core';

import { ChatService } from '../chat.service';
import { ChatMessage } from '../chat.model';

@Component({
  selector: 'app-chat-edit',
  standalone: false,
  templateUrl: './chat-edit.component.html',
  styleUrl: './chat-edit.component.scss'
})
export class ChatEditComponent {
  @ViewChild('message') messageInput!: ElementRef;

  messageText: string = '';

  currentSender: number = 6

  constructor(private chatService: ChatService) {}

  onSendMessage(event: Event): void {
    event.preventDefault();
    const trimmed = this.messageText.trim();

    if (trimmed) {
      const chatMessage: ChatMessage = {
        id: this.chatService.getMaxId() + 1,
        message: trimmed,
        sender: this.currentSender,
        timestamp: new Date().toISOString()
      };

      this.chatService.addChatMessage(chatMessage).subscribe({
        next: (response) => {
          console.log('Message successfully sent:', response);
          this.onClear();
        },
        error: (err) => {
          console.error('Failed to send message:', err);
        }
      });
    }
  }


  onClear(): void {
    this.messageText = '';
  }

}
