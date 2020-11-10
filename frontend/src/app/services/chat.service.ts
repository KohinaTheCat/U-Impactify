import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import {Chat} from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  socket: any;

  constructor(private http: HttpClient, private userService: UserService) {
    this.socket = io("http://localhost:5000", {
      autoConnect: false
    });
  }

  init(): void {
    const user: User = this.userService.getCurrentUser();
    this.socket.open();
    this.socket.emit('serverconn', user._id);
    this.socket.on('message', (from: string, message: string) => {
      this.onMessageReceived(from, message);
    });
  }

  destroy(): void {
    this.socket.close();
  }

  getSocket(): any {
    return this.socket;
  }

  onMessageReceived(from: string, message: string): void {
    console.log(from, message);
  }

  sendMessage(from: string, to: string, message: string): void {    
    const chat: Chat = {from, to, message, time: new Date()};
    this.socket.emit('message', chat);
  }
}
