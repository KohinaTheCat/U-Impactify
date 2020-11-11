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
  socket: any;

  @ViewChild('messages') messagesContainer;
  @ViewChild('messageInput') messageInput;

  ngOnInit(): void {
    this.initChats();
    this.socket.on('message', (chatId: string, message: any) => {
      this.onMessageReceived(chatId, message);
    });
  }

  initChats(): void {
    this.chats = [];
    this.user = this.userService.getCurrentUser();
    this.socket = this.chatService.getSocket();
    this.user.chats.forEach((chatId) =>
      this.chatService.getChat(chatId).subscribe((chat) => {
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

  onSendMessage(selectedChat: Chat, body: string) {
    if (!body.trim().length) return;
    const message = {
      from: this.user._id,
      time: new Date(),
      body,
    };
    selectedChat.messages.push(message);
    this.chatService.sendMessage(message, selectedChat._id);
    this.messageInput.nativeElement.value = '';
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  onComposeNewChat(userId: string): void {
    if (this.user._id === userId) {
      this.error = 'Cannot Message Yourself.';
      return;
    }
    const chatsWithUser = this.chats.filter((chat) =>
      chat.members.includes(userId)
    );
    let chat: Chat;
    if (chatsWithUser.length) {
      chat = chatsWithUser[0];
      this.userSearchQuery = '';
      this.error = '';
      this.onSelectChat(chat);
      this.showCompose = false;
    } else {
      this.userService.getAnotherUser(userId).subscribe(
        (user) => {
          this.chatService
            .postNewChat(this.user._id, user._id)
            .subscribe((chat) => {
              this.userService
                .addChat(this.user._id, chat._id)
                .subscribe((userRes) => {
                  this.userService.setUser(userRes);
                  this.user = userRes;
                  this.userSearchQuery = '';
                  this.error = '';
                  chat.members = chat.members.filter(
                    (member) => member !== this.user._id
                  );
                  this.chats.push(chat);
                  this.onSelectChat(chat);
                  this.userService
                    .addChat(user._id, chat._id)
                    .subscribe((user) => {
                      this.showCompose = false;
                    });
                });
            });
        },
        (err) => {
          this.error = 'User Not Found.';
        }
      );
    }
  }

  onMessageReceived(chatId: string, message: any): void {
    if(this.user.chats.includes(chatId)) {
      this.chats.filter(chat => chat._id === chatId)[0].messages.push(message);
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } else {
      this.userService.getAnotherUser(this.user._id).subscribe((user) => {
        this.userService.setUser(user);
        this.initChats();
      });
    }
  }
}
