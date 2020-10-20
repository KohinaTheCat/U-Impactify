import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // save username and password into local storage, so they can stay logged in
  user: User = JSON.parse(localStorage.getItem('user') || null);

  //kinda like async
  postNewUser(newUser): Observable<any> {
    const { username, password, email, type, questionaire} = newUser;
    return this.http.post('http://localhost:5000/user/', {
      username,
      password,
      email,
      type,
      questionaire,
    });
  }

  loginUser(email: string, password: string): Observable<User | boolean> {
    return this.http.post<User | boolean>(
      `http://localhost:5000/user/${email}`,
      {
        email,
        password,
      }
    );
  }

  // Sets the user
  setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // gets the user
  getCurrentUser(): User {
    return this.user;
  }

  // updates the classesteaching array
  updateClassesTeaching(userId: string, courseId: string): Observable<any> {
    return this.http.put('http://localhost:5000/user/updateClassesTeaching', {
      userId,
      courseId,
    });
  }
}
