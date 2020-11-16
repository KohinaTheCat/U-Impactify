import { Course } from './../models/course.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assessment } from './../models/assessment.model';

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
    const { name, description, level, tags, img, assessment } = course;
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
    return this.http.post(`/api/course/${courseId}/upload`, file);
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
    return this.http.get<Course[]>(`/api/course/search/${query}`);
  }

  /**
   * GET course image
   * @param {string} courseId id of course
   */
  getCourseImageId(courseId: string): Observable<any> {
    return this.http.get(`/api/course/${courseId}/getCourseImage`);
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
    return this.http.delete(`/api/course/dropCourse/${courseId}/${userId}`);
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

  /**
   * POST new assessment
   * @param {any}     assessment  the newly created assessment
   * @param {string}  _id         id of the course
   *
   */
  postNewAssessment(assessment: any, _id: string): Observable<Assessment> {
    const { courseId, name, files, visibility, studentSubmission } = assessment;
    return this.http.post<Assessment>(`/api/assessment/`, {
      courseId: _id,
      name,
      files,
      visibility,
      studentSubmission: [],
    });
  }

  /**
   * PUT update assessment
   */
  updateAssessment(courseId: string, assessment: any): Observable<Assessment> {
    return this.http.put<Assessment>(
      `http://localhost:5000/assessment/${courseId}`,
      {
        assessment,
      }
    );
  }

  /**
   * DELETE assessment
   * @param {string} courseId id of user
   * @param {string} courseId id of course
   */
  deleteAssessment(courseId: string, assessmentId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:5000/deleteAssessment/${courseId}/${assessmentId}`
    );
  }

  /**
   * PUT student submission to assessment
   * @param {string}    courseId          id of course
   * @param {string}    assessmentId      id of assessment
   * @param {string}    studentId         id of student
   * @param {string[]}  files             files that student is submitting
   */
  postStudentSubmission(
    courseId: string,
    assessmentId: string,
    studentId: string,
    files: string[]
  ): Observable<any> {
    return this.http.put<Assessment>(
      `http://localhost:5000/addStudentSubmission`,
      {
        courseId,
        assessmentId,
        studentId,
      }
    );
  }

  /**
   * GET assessment
   * @param {string} assessmentId id of assessment
   */
  getAssessment(assessmentId: string): Observable<Assessment> {
    return this.http.get<Assessment>(
      `http://localhost:5000/assessment/${assessmentId}`
    );
  }

  /**
   * GET all assessment for a course
   * @param {string} courseId id of course
   */
  getAllAssessments(courseId): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(
      `http://localhost:5000/assessment/${courseId}`
    );
  }

  /**
   * GET all submissions for an assessment
   * @param courseId
   * @param assessmentId
   */
  getAllStudentSubmissions(
    courseId: string,
    assessmentId: string
  ): Observable<Object[]> {
    return this.http.get<Object[]>(
      `http://localhost:5000/assessment/${courseId}/${assessmentId}`
    );
  }

  /**
   * GET student submission by studentId
   * @param courseId
   * @param assessmentId
   * @param studentId
   */
  getStudentSubmission(
    courseId: string,
    assessmentId: string,
    studentId: string
  ): Observable<String[]> {
    return this.http.get<String[]>(
      `http://localhost:5000/assessment/${courseId}/${assessmentId}/${studentId}`
    );
  }
}
