import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Opportunity } from './../models/opportunity.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // save username and password into local storage, so they can stay logged in
  user: User = JSON.parse(localStorage.getItem('user') || null);

  /**
   * Gets the current user stored in the service
   */
  getCurrentUser(): User {
    return this.user;
  }

  /**
   * POST new user
   * @param {User} newUser the about-to-be user
   */
  postNewUser(newUser: User): Observable<User> {
    const { _id, password, email, type, questionaire } = newUser;
    return this.http.post<User>('/api/user/', {
      _id,
      password,
      email,
      type,
      questionaire,
    });
  }

  /**
   * PUT questionaire response
   * @param {User} user
   */
  putQuestionaire(user: User): Observable<any> {
    const { _id, questionaire } = user;
    return this.http.put(`/api/user/addQuestionaire/`, {
      _id,
      questionaire,
    });
  }

  /**
   * Get existing user by id
   * @param {String} id username of the user
   */
  getAnotherUser(id: String): Observable<User> {
    return this.http.get<User>('/api/user/' + id);
  }

  /**
   * GET users by search query
   * @param {String} query the search query
   */
  search(query: String): Observable<User[]> {
    return this.http.get<User[]>(`/api/user/search/${query}`);
  }

  /**
   * POST login user
   * @param {string} email    email of user
   * @param {string} password password of user
   */
  loginUser(email: string, password: string): Observable<User | boolean> {
    return this.http.post<User | boolean>(`/api/user/${email}`, {
      password,
    });
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
   * POST enroll course (Impact Learner only)
   * @param {string} userId id of user
   * @param {Object} course { _id, name }
   */
  enrollInCourse(userId: string, course: any): Observable<any> {
    return this.http.put(`/api/user/enroll/`, {
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
    return this.http.post(`/api/user/updatePassword`, {
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
    return this.http.put('/api/user/updateClassesTeaching', {
      _id,
      course,
    });
  }

  /**
   * PUT update credit (user)
   * @param {string} _id        id of user
   * @param {double} credit     amount to update credit with
   */
  updateCredit(_id: string, credit: number): Observable<any> {
    return this.http.put('api/user/updateCredit', {
      _id,
      credit, 
    });
  }

  /**
   * DELETE drop a course (Impact Learner only)
   * @param {string} userId    id of user
   * @param {string} courseId  id of course
   */
  dropACourse(userId: string, courseId: string): Observable<any> {
    return this.http.delete(`/api/user/dropCourse/${courseId}/${userId}`);
  }

  /**
   * DELETE user
   * @param {string} userId    id of user
   */
  deleteUser(userId: string): Observable<any> {
    console.log(userId);
    return this.http.delete(`/api/user/deleteUser/${userId}`);
  }

  /**
   * PUT adds the social initiative profile to the user
   * @param {string} registeredNumber registered number of SI
   * @param {string} businessNumber   business number of SI
   * @param {string} location         location of SI
   * @param {string} hours            working hours
   * @param {string} phone            phone to contact SI
   * @param {string} email            email to contact SI
   * @param {string} _id              userId of SI Account
   */
  addSocialInitiativeProfile(
    registeredNumber: string,
    businessNumber: string,
    location: string,
    hours: string,
    phone: string,
    email: string,
    _id: string
  ): Observable<User> {
    return this.http.put<User>(`/api/user/addSocialInitiativeProfile`, {
      registeredNumber,
      businessNumber,
      location,
      hours,
      phone,
      email,
      _id,
    });
  }

  /**
   * PUT user profile
   * @param _id id of the user
   * @param profile {fullName, phone, linkedIn, facebook, twitter}
   * @return user
   */
  updateProfile(_id: string, profile: any): Observable<User> {
    return this.http.put<User>(`/api/user/addProfile`, {
      _id,
      profile,
    });
  }

  getAllSI(): Observable<any> {
    return this.http.get(`/api/user/getAllSI`);
  }

  addChat(userId: string, chatId: string): Observable<User> {
    return this.http.put<User>(`/api/user/addChat`, {
      userId,
      chatId,
    });
  }

  /**
   * GET user image
   * @param {string} userId id of course
   */
  getUserImage(userId: string): Observable<any> {
    return this.http.get(`/api/user/${userId}/getUserImage`);
  }

  /**
   * POST add profile image to user
   * @param {FormData} file the course image
   * @param {string} courseId id of course
   */
  postUserImage(file: FormData, userId: string): Observable<User> {
    return this.http.post<User>(`/api/user/${userId}/uploadUserImage`, file);
  }

  /**
   * PUT new opportunity
   * @param {opportunity} opportunity the opportunity
   */
  createNewOpportunity(opportunity: Opportunity): Observable<any> {
    const {
      recruiter,
      name,
      description,
      type,
      location,
      datePosted,
      dateNeeded,
      salary,
      numberOfHires,
      responsibilites,
      requirements,
      applicants,
    } = opportunity;
    return this.http.put(`/api/user/opportunity`, {
      recruiter,
      name,
      description,
      type,
      location,
      datePosted,
      dateNeeded,
      salary,
      numberOfHires,
      responsibilites,
      requirements,
      applicants,
    });
  }

  /**
   * PUT new volunteer opportunity
   * @param {userId} userId the userid
   * @param {opportunityId} opportunityId the opportunity id
   */
  addNewVolunteerOpportunity(userId: string, opportunityId: string) {
    return this.http.put(`/api/user/addVolunteerOpportunity`, {
      userId,
      opportunityId,
    });
  }

  /**
   * PUT new employment opportunity
   * @param {userId} userId the userid
   * @param {opportunityId} opportunityId the opportunity id
   */
  addNewEmploymentOpportunity(userId: string, opportunityId: string): Observable<User> {
    return this.http.put<User>(`/api/user/addEmploymentOpportunity`, {
      userId,
      opportunityId,
    });
  }

  /**
   * GET all volunteer opportunity
   */
  getVolunteerOpportunity(): Observable<any> {
    return this.http.get<Opportunity[]>(
      `/api/user/opportunity/getVolunteerOpportunities`
    );
  }

  /**
   * GET all employment opportunity
   */
  getEmploymentOpportunity(): Observable<any> {
    return this.http.get<Opportunity[]>(
      `/api/user/opportunity/getEmploymentOpportunities/`
    );
  }

  /**
   * PUT apply for opportunity
   * @param opportunityId id of opportunity
   * @param applicantUserId id of the applicant user
   */
  applyOpportunity(
    opportunityId: string,
    applicantUserId: string
  ): Observable<any> {
    return this.http.put(`/api/user/opportunity/applyOpportunity`, {
      opportunityId,
      applicantUserId,
    });
  }

  /**
   * DELETE opportunity
   * @param opportunityId id of the to be deleted opportunity
   */
  deleteOpportunity(opportunityId: any): Observable<any> {
    return this.http.delete(
      `/api/user/opportunity/deleteOpportunity/${opportunityId}`
    );
  }

  /**
   * DELETE remove opportunity from user
   * @param _id userId (type ==== "SI")
   * @param opportunityId id of opportunity
   */
  removeOpportunity(_id: string, opportunityId: any): Observable<User> {
    return this.http.delete<User>(
      `/api/user/opportunity/removeOpportunity/${_id}/${opportunityId}`
    );
  }

  /**
   * PUT update opportunity
   * @param opportunity updated opportunity
   */
  updateOpportunity(opportunity: Opportunity): Observable<Opportunity> {
    return this.http.put<Opportunity>(
      `/api/user/opportunity/updateOpportunity`,
      { opportunity }
    );
  }
}
