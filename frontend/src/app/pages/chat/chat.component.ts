import { ChatService } from 'src/app/services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(private chatService: ChatService) {}

  dummyUsers = Array(100).fill('username').map((value, index) => `${value}${index}`)

  ngOnInit(): void {
    // this.chatService.getAllMessages().subscribe((res) => {
    //   this.allMessages = res;
    //   console.log(this.allMessages);
    // });
  }

  // onEnter() {
  //   this.chatService.sendMessage(this.chat);
  //   this.chat = '';
  // }

  // addMessages(message) {
  //   this.allMessages.push(message);
  // }
}
