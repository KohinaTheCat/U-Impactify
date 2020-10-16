import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  // save username and password into local storage, so they can stay logged in
  user: User = JSON.parse(localStorage.getItem('user') || null);

  // Using dependency injection, inject HttpClient
  constructor(private http: HttpClient) {}

  // need something with authguard to verify user
  userLogin(email: string, password: string): Observable<User | boolean> {
    return this.http.post<User | boolean>(`/users/${email}`, {
      email,
      password,
    });
  }
}
