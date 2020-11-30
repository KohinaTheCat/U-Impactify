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
   * POST uploading document to a course
   * @param {FormData} file     new file
   * @param {string}   courseId id of course
   */
  postNewAssessmentFile(file: FormData, assessmentId: string) {
    return this.http.post(
      `/api/course/assessment/uploadAssessment/${assessmentId}`,
      file
    );
  }

  /**
   * PUT
   * @param {any} course the course that's requesting survey
   */
  requestSurvey(id: string): Observable<Course> {
    return this.http.put<Course>(`/api/course/surveyRequest/${id}`, {});
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
   *
   */
  postNewAssessment(assessment: any): Observable<Assessment> {
    const { name, visibility, studentSubmission } = assessment;
    return this.http.post<Assessment>(`/api/course/assessment`, {
      name,
      files: [],
      visibility,
      studentSubmission,
    });
  }

  /**
   *
   * @param courseId
   * @param assessmentId
   */
  postAssessmentCourse(
    courseId: string,
    assessmentId: string
  ): Observable<Course> {
    return this.http.put<Course>('/api/course/assessment/addAssessment', {
      courseId,
      assessmentId,
    });
  }

  /**
   * DELETE assessment
   * @param {string} courseId id of user
   * @param {string} courseId id of course
   */
  deleteAssessment(courseId: string, assessmentId: string): Observable<any> {
    return this.http.delete(
      `/api/course/assessment/deleteAssessment/${courseId}/${assessmentId}`
    );
  }

  // updateAssessment(
  //   files: FormData,
  //   assessment: any,
  //   assessmentId: string
  // ): Observable<Assessment> {
  //   const { name, visibility, studentSubmission } = assessment;
  //   return this.http.put<Assessment>(
  //     `/api/course/assessment/updateAssessment`,
  //     {
  //       files,
  //       name,
  //       visibility,
  //       studentSubmission,
  //       assessmentId,
  //     }
  //   );
  // }

  // deleteFiles(assessmentId: string): Observable<Assessment> {
  //   return this.http.put<Assessment>(`api/course/assessment/deleteFiles`, {
  //     assessmentId,
  //   });
  // }

  /**
   * DELETE assessment
   * @param {string} assessmentId id of assessment
   */
  deleteFiles(assessmentId: string): Observable<any> {
    return this.http.delete(
      `/api/course/assessment/deleteFiles/${assessmentId}`
    );
  }

  /**
   * DELETE assessment
   * @param {string} assessmentId id of assessment
   * @param {string} name Name of assessment
   * @param {string} visibility visibility
   * @param {FormData} files files that come alongside
   */
  updateAssessment(
    assessmentId: string,
    name: string,
    visibility: boolean,
    files: FormData
  ) {
    return this.http.put<Assessment>(
      `/api/course/assessment/updateAssessment/${assessmentId}/${name}/${visibility}`,
      files
    );
  }

  deleteStudentSubmission(assessmentId: string, studentId: string) {
    return this.http.delete(
      `/api/course/assessment/deleteStudentSubmission/${assessmentId}/${studentId}`
    );
  }

  /**
   * PUT student submission to assessment
   * @param {string}    courseId          id of course
   * @param {string}    assessmentId      id of assessment
   * @param {string}    studentId         id of student
   * @param {FormData}  files             files that student is submitting
   */
  postStudentSubmission(
    assessmentId: string,
    studentId: string,
    files: FormData
  ): Observable<any> {
    return this.http.put<Assessment>(
      `/api/course/assessment/addStudentSubmission/${assessmentId}/${studentId}`,
      files
    );
  }

  /**
   * GET assessment
   * @param {string} assessmentId id of assessment
   */
  getAssessment(assessmentId: string): Observable<Assessment> {
    return this.http.get<Assessment>(
      `/api/course/assessment/getAssessment/${assessmentId}`
    );
  }

  /**
   * GET all assessment for a course
   * @param {string} courseId id of course
   */
  getAllAssessments(courseId: string): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(
      `/api/course/assessment/getAllAssessments/${courseId}`
    );
  }

  /**
   * GET all submissions for an assessment
   * @param courseId
   * @param assessmentId
   */
  getAllStudentSubmissions(assessmentId: string): Observable<Object[]> {
    return this.http.get<Object[]>(`/api/course/assessment/${assessmentId}`);
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
      `api/course/assessment/${courseId}/${assessmentId}/${studentId}`
    );
  }

  addSurvey(
    _id: string,
    courseId: string,
    surveyAnswers: string[]
  ): Observable<Course> {
    return this.http.put<Course>(`api/course/addSurvey`, {
      _id,
      courseId,
      surveyAnswers,
    });
  }

  /**
   * POST uploading document to a course
   * @param {FormData} file     new file
   * @param {string}   courseId id of course
   */
  postUploadLecture(video: FormData, courseId: string) {
    return this.http.post(`api/course/${courseId}/uploadLecture`, video);
  }

  /**
   * PUT update mark by student id and assessment
   */
  updateMark(
    assessmentId: string,
    studentId: string,
    mark: number
  ): Observable<any> {
    return this.http.put<any>(`/api/course/assessment/updateMark`, {
      assessmentId,
      studentId,
      mark,
    });
  }

  /**
   * PUT bulk update Course Image
   * @param _id id of course
   * @param img img id of new img
   */
  bulkUpdateCourseImage(_id: string, img: string): Observable<Course> {
    return this.http.put<Course>(`/api/course/bulkUpdateCourseImage`, {
      _id, img
    })
  }
}