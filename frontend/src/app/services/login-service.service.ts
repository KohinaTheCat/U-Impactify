import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  // save username and password into local storage, so they can stay logged in
  user: User = JSON.parse(localStorage.getItem('user') || null);

  // Using dependency injection, inject HttpClient
  constructor(private http: HttpClient) {}
}
