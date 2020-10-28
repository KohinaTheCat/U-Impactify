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

  /**
   * POST new user
   * @param {User} newUser the about-to-be user
   */
  postNewUser(newUser: User): Observable<User> {
    const { _id, password, email, type, questionaire } = newUser;
    return this.http.post<User>('http://localhost:5000/user/', {
      _id,
      password,
      email,
      type,
      questionaire,
    });
  }

  /**
   * Get existing user
   * @param {String} uid uid of the user
   */
  getAnotherUser(uid: String): Observable<any> {
    return this.http.get('http://localhost:5000/user/get/' + uid, {});
  }

  /**
   * POST login user
   * @param {string} email    email of user
   * @param {string} password password of user
   */
  loginUser(email: string, password: string): Observable<User | boolean> {
    return this.http.post<User | boolean>(
      `http://localhost:5000/user/${email}`,
      {
        password,
      }
    );
  }

  /**
   * Updates the user object stored in the service & localStorage
   * @param {User} user the loggedIn user instance
   */
  setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Gets the current user stored in the service
   */
  getCurrentUser(): User {
    return this.user;
  }

  /**
   * POST enroll course (Impact Learner only)
   * @param {string} userId id of user
   * @param {Object} course { _id, name }
   */
  enrollInCourse(userId: string, course: any): Observable<any> {
    this.user.classesEnrolled.push(course);
    this.setUser(this.user);

    return this.http.put(`http://localhost:5000/user/enroll/`, {
      userId,
      course,
    });
  }

  /**
   * POST update password
   * @param {string} _id       id of user
   * @param {string} password  new password
   */
  updatePassword(_id: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:5000/user/updatePassword`, {
      _id,
      password,
    });
  }

  /**
   * PUT update classesTeaching (Impact Consultant only)
   * @param {string} _id     id of user
   * @param {string} course  {_id, name} of course
   */
  updateClassesTeaching(_id: string, course: any): Observable<any> {
    this.user.classesTeaching.push(course);
    this.setUser(this.user);
    return this.http.put('http://localhost:5000/user/updateClassesTeaching', {
      _id,
      course,
    });
  }

  /**
   * DELETE drop a course (Impact Learner only)
   * @param {string} userId    id of user
   * @param {string} courseId  id of course
   */
  dropACourse(userId: string, courseId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:5000/user/dropCourse/${courseId}/${userId}`
    );
  }
}
