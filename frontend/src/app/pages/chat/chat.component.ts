import { ChatService } from 'src/app/services/chat.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  dummyUsers = Array(100)
    .fill('username')
    .map((value, index) => `${value}${index}`);
  showCompose: boolean = false;

  user: User;
  chats: Chat[] = [];
  userSearchQuery: string = '';
  selectedChat: any;
  error: string;

  @ViewChild('messages') messagesContainer;
  @ViewChild('messageInput') messageInput;

  ngOnInit(): void {
    this.initChats();
  }

  initChats(): void {
    this.user = this.userService.getCurrentUser();
    this.user.chats.forEach((chatId) =>
      this.chatService.getMessage(chatId).subscribe((chat) => {
        chat.members = chat.members.filter(
          (member) => member !== this.user._id
        );
        this.chats.push(chat);
      })
    );
    // this.chats = this.createMockChats();
    // this.chats.forEach(
    //   (chat) => (chat.messages = this.createMockMessages(chat.members))
    // );
  }

  onSelectChat($event) {
    if (this.selectedChat === $event) return;
    this.selectedChat = $event;
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  /**
   * for mock
   */
  createMockChats(): Chat[] {
    const chats = [];
    for (let i = 0; i < 100; i++) {
      const chat: Chat = {
        _id: i + '',
        members: [this.user._id, `testUser${i}`],
        messages: [],
      };
      chats.push(chat);
    }
    return chats;
  }

  /**
   * for mock
   */
  createMockMessages(members: string[]) {
    const messages = [];
    for (let i = 0; i < 100; i++) {
      const message: any = {
        from: members[Math.round(Math.random())],
        body:
          Math.random().toString(36).substring(2) +
          ' ' +
          Math.random().toString(36).substring(2) +
          ' ' +
          Math.random().toString(36).substring(2) +
          ' ' +
          Math.random().toString(36).substring(2) +
          ' ' +
          Math.random().toString(36).substring(2) +
          ' ' +
          Math.random().toString(36).substring(2) +
          ' ' +
          Math.random().toString(36).substring(2),
        time: new Date(),
      };
      messages.push(message);
    }
    return messages;
  }

  onSendMessage(selectedChat: Chat, message: string) {
    if(!message.trim().length) return;
    selectedChat.messages.push({
      from: this.user._id,
      time: new Date(),
      body: message,
    });
    this.messageInput.nativeElement.value = '';
  }

  onComposeNewChat(userId: string): void {
    if(this.user._id === userId) {
      this.error = 'Cannot Message Yourself.';
      return;
    }
    const chatsWithUser = this.chats.filter(
      (chat) => chat.members.includes(userId)
    );
    let chat;
    let check = false;
    if(chatsWithUser.length) {
      chat = chatsWithUser[0];
      this.userSearchQuery = '';
      this.onSelectChat(chat);
      this.showCompose = false;
    } else {
      this.userService.getAnotherUser(userId).subscribe(user => {
        chat = {
         _id: "",
         members: [user._id],
         messages: []
        }
        check = true;
        this.userSearchQuery = '';
        this.chats.push(chat);
        this.onSelectChat(chat);
        this.showCompose = false;
      }, err => {
        this.error = "User Not Found.";
      });
    }
  }
}
