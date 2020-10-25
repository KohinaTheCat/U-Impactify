import { Course } from './../models/course.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  course: Course = JSON.parse(localStorage.getItem('course') || null);

  constructor(private http: HttpClient) {}

  postNewCourse(newCourse, username): Observable<any> {
    const { title, description, level, tags } = newCourse;
    return this.http.post('http://localhost:5000/course/add', {
      title,
      students: [],
      teachers: [username],
      description,
      files: [],
      level,
      tags,
    });
  }

  postNewFile(file: any, CourseId) {
    return this.http.post(
      `http://localhost:5000/course/${CourseId}/upload`,
      file
    );
  }

  getCourseFiles(CourseId): Observable<any> {
    return this.http.get(`http://localhost:5000/document/${CourseId}`, {});
  }

  getAllCourses(): Observable<any> {
    return this.http.get(`http://localhost:5000/course`, {});
  }

  enrollInCourse(username: string, courseId: string): Observable<any> {
    return this.http.post(
      `http://localhost:5000/course/addStudent/${courseId}/${username}`,
      {}
    );
  }

  dropACourse(userId: string, CourseId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:5000/course/delete/${CourseId}/${userId}`
    );
  }
}
