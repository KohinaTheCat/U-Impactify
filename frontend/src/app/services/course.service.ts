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
    return this.http.post<Course>('/api/course/', {
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
    return this.http.put<Course>(`/api/course/update`, {
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
      `/api/course/${courseId}/upload`,
      file
    );
  }

  /**
   * GET all documents for a course
   * @param {string} courseId id of course
   */
  getCourseFiles(courseId: string): Observable<any> {
    return this.http.get(`/api/document/${courseId}`);
  }

  /**
   * GET courses by search query
   * @param {String} query the search query
   */
  search(query: string): Observable<Course[]> {
    return this.http.get<Course[]>(
      `/api/course/search/${query}`
    );
  }

  /**
   * GET course image
   * @param {string} courseId id of course
   */
  getCourseImageId(courseId: string): Observable<any> {
    return this.http.get(
      `/api/course/${courseId}/getCourseImage`
    );
  }

  /**
   * POST add course image to course
   * @param {FormData} file the course image
   * @param {string} courseId id of course
   */
  postCourseImage(file: FormData, courseId: string): Observable<Course> {
    return this.http.post<Course>(
      `/api/course/${courseId}/uploadCourseImage`,
      file
    );
  }

  /**
   * GET all courses
   */
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`/api/course`);
  }

  /**
   * GET single course given id
   * @param {string} _id id of course
   */
  getCourse(_id: string): Observable<Course> {
    return this.http.get<Course>(`/api/course/${_id}`);
  }

  /**
   * POST enroll student
   * @param {string} userId    id of user
   * @param {string} courseId  id of course
   */
  enrollInCourse(userId: string, courseId: string): Observable<any> {
    return this.http.put(`/api/course/enroll`, {
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
      `/api/course/dropCourse/${courseId}/${userId}`
    );
  }

  /**
   * PUT student review in course
   * @param userId
   * @param courseId
   * @param courseReview
   * @param score
   * @param anon
   */
  addAReview(
    _id: string,
    courseId: string,
    courseReview: string,
    score: Number,
    anon: Boolean
  ): Observable<Course> {
    return this.http.put<Course>(`/api/course/addReview`, {
      _id,
      courseId,
      courseReview,
      score,
      anon,
    });
  }
}
