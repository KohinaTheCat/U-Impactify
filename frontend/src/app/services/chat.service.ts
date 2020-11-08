import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: Socket, private http: HttpClient) {
    socket.on('message', this.getAllMessages);
  }

  getAllMessages(): Observable<any> {
    return this.http.get('http://localhost:5000/temp/chat/messages');
  }

  sendMessage(msg: string) {
    return this.http.post('http://localhost:5000/temp/chat/new', {
      from: 'clara',
      to: 'navinn',
      message: msg,
    });
  }
}
