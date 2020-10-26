import { Course } from './../models/course.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(private http: HttpClient) {}

  /**
   * POST new course
   * @param {any}    course the newly created course
   * @param {string} _id    id of the teacher
   */
  postNewCourse(course: any, _id: string): Observable<Course> {
    const { title, description, level, tags } = course;
    return this.http.post<Course>('http://localhost:5000/course/', {
      title,
      students: [],
      teachers: [_id],
      description,
      files: [],
      level,
      tags,
    });
  }

  /**
   * POST uploading document to a course
   * @param {any} file new file
   * @param {string} courseId id of course
   */
  postNewFile(file: any, courseId: string) {
    return this.http.post(
      `http://localhost:5000/course/${courseId}/upload`,
      file
    );
  }

  /**
   * GET all documents for a course
   * @param {string} courseId id of course
   */
  getCourseFiles(courseId: string): Observable<any> {
    return this.http.get(`http://localhost:5000/document/${courseId}`);
  }

  /**
   * GET all courses
   */
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`http://localhost:5000/course`);
  }

  /**
   * GET single course given id
   * @param {string} _id id of course
   */
  getCourse(_id: string): Observable<Course> {
    return this.http.get<Course>(`http://localhost:5000/course/${_id}`);
  }

  /**
   * POST enroll student
   * @param {string} userId    id of user
   * @param {string} courseId  id of course
   */
  enrollInCourse(userId: string, courseId: string): Observable<any> {
    return this.http.post(`http://localhost:5000/course/enroll`, {
      userId,
      courseId,
    });
  }

  /**
   * DELETE drop student from course
   * @param {string} userId id of user
   * @param {string} courseId id of course
   */
  dropACourse(userId: string, courseId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:5000/course/dropCourse/${courseId}/${userId}`
    );
  }
}
