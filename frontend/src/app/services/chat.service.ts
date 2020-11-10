import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Chat } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // socket.io socket instance
  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:5000', {
      autoConnect: false,
    });
  }

  /**
   * Manually inits socket connection
   * @param id id of current user
   */
  init(id: string): void {
    this.socket.open();
    this.socket.emit('serverconn', id);
    this.socket.on('message', (from: string, message: string) => {
      this.onMessageReceived(from, message);
    });
  }

  /**
   * Manually closes socket connection
   */
  destroy(): void {
    this.socket.close();
  }

  /**
   * Get Socket instance (may be used for custom listeners)
   */
  getSocket(): any {
    return this.socket;
  }

  /**
   * TODO: Update as frontend is developed
   * Handler for when a message is recieved from server to client
   * @param from  sender id 
   * @param body  message body
   */
  onMessageReceived(from: string, body: string): void {
    console.log(from, body);
  }

  /**
   * Send message function
   * @param from sender id 
   * @param to   reciever id 
   * @param body message body
   */
  sendMessage(from: string, to: string, body: string): void {
    this.socket.emit('message', { from, to, body });
  }

  /**
   * GET chat by id
   * @param chatId id of Chat
   * @return Observable chat instance
   */
  getMessage(chatId: string): Observable<Chat> {
    return this.http.get<Chat>(`/api/chat/${chatId}`);
  }
}
