import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  socket: any;
  constructor(private http: HttpClient) {
    this.socket = io("http://localhost:5000");
  }

  // getAllMessages(): Observable<any> {
  //   return this.http.get('http://localhost:5000/temp/chat/messages');
  // }

  sendMessage(/* from: string, to: string,  */message: string) {
    // return this.http.post('http://localhost:5000/temp/chat/new', {
    //   from, to, message/* , time: Date.now() */
    // });
    console.log(this.socket, message);
    
    this.socket.emit('message', message);
  }
}
