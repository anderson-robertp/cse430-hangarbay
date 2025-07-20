import { Component, Input, OnInit } from '@angular/core';

import { ChatMessage } from '../chat.model';
import { User } from '../../users/user.model';
import { ChatService } from '../chat.service';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-chat-item',
  standalone: false,
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.scss'
})
export class ChatItemComponent  implements OnInit {
  
  @Input() chat!: ChatMessage;
  user: User | null = null;

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit(): void {
    if (this.chat && this.chat.sender) {
      this.userService.getUserById(this.chat.sender).subscribe(user => {
        this.user = user;
        console.log('User fetched for chat:', this.user.username);
      });
    }
  }

}
