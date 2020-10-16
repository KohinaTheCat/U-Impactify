import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // save username and password into local storage, so they can stay logged in
  user: User = JSON.parse(localStorage.getItem('user') || null);

  //kinda like async
  postNewUser(newUser): Observable<any> {
    const { username, password, email, type } = newUser;
    return this.http.post('http://localhost:5000/user/', {
      username,
      password,
      email,
      type
    });
  }
}
