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
    const {
      username,
      password,
      email,
      type,
      questionaire,
      socialInitiative,
    } = newUser;

    return this.http.post('http://localhost:5000/user/', {
      username,
      password,
      email,
      type,
      questionaire,
      socialInitiative,
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

  enrollInCourse(userId: string, course: any): Observable<any> {
    this.user.classesEnrolled.push(course);
    this.setUser(this.user);

    return this.http.post(
      `http://localhost:5000/user/enroll/${course._id}/${course.name}/${userId}`,
      {}
    );
  }

  // updates the classesteaching array
  updateClassesTeaching(userId: string, course: any): Observable<any> {
    this.user.classesTeaching.push({ _id: course._id, name: course.title });
    this.setUser(this.user);
    return this.http.put('http://localhost:5000/user/updateClassesTeaching', {
      userId,
      course,
    });
  }

  // Drops a course from user's enrollment array
  dropACourse(userId: string, CourseId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:5000/user/dropCourse/${CourseId}/${userId}`
    );
  }
}
