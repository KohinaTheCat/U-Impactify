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
    const { name, description, level, tags, img } = course;
    return this.http.post<Course>('http://localhost:5000/course/', {
      name,
      students: [],
      teachers: [_id],
      description,
      files: [],
      level,
      tags,
      img,
    });
  }

  /**
   * PUT update existing course
   * @param {any}     course    the new course information
   * @param {string}  courseId  id of the course
   */
  updateCourse(course: any): Observable<Course> {
    return this.http.put<Course>(`http://localhost:5000/course/update`, {
      course,
    });
  }

  /**
   * POST uploading document to a course
   * @param {FormData} file     new file
   * @param {string}   courseId id of course
   */
  postNewFile(file: FormData, courseId: string) {
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

  getCourseImageId(courseId: string): Observable<any> {
    return this.http.get(
      `http://localhost:5000/course/${courseId}/getCourseImage`
    );
  }

  postCourseImage(file: FormData, courseId: string): Observable<Course> {
    return this.http.post<Course>(
      `http://localhost:5000/course/${courseId}/uploadCourseImage`,
      file
    );
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
    return this.http.put(`http://localhost:5000/course/enroll`, {
      userId,
      courseId,
    });
  }

  /**
   * DELETE drop student from course
   * @param {string} userId   id of user
   * @param {string} courseId id of course
   */
  dropACourse(userId: string, courseId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:5000/course/dropCourse/${courseId}/${userId}`
    );
  }

  /**
   * PUT student review in course
   * @param userId
   * @param courseId
   * @param courseReivew
   * @param score
   */
  addAReview(
    _id: string,
    courseId: string,
    courseReivew: string,
    score: Number
  ): Observable<Course> {
    return this.http.put<Course>(`http://localhost:5000/course/addReview`, {
      _id,
      courseId,
      courseReivew,
      score,
    });
  }
}
