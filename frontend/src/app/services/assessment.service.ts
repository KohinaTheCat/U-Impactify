import { Assessment } from './../models/assessment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

export class AssessmentService {
    constructor(private http: HttpClient) {}

  /**
   * POST new assessment
   * @param {any}    assessment the newly created assessment
   * @param {string} courseId       courseId of the assessment
   * @param {string} name       name of the assessment
   * @param {string} file       file of
   * 
   */
  postNewAssessment(assessment: any, _id: string): Observable<Assessment> {
    const { courseId, name, file, studentSubmission } = assessment;
    return this.http.post<Assessment>(`http://localhost:5000/assessment/`, {
      courseId,
      name,
      file,
      studentSubmission: [],
    });
  }

  /**
   * DELETE drop student from course
   * @param {string} userId   id of user
   * @param {string} courseId id of course
   */
  deleteAssessment(courseId: string, assessmentId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:5000/course/deleteAssessment/${courseId}/${assessmentId}`
    );
  }

  /**
   * POST student submission to assessment
   * @param {string} courseId     id of course
   * @param {string} assessmentId id of assessment
   */
  postStudentSubmission(courseId: string, assessmentId: string, studentSubmission: any): Observable<any> {
    const { studentId, file } = studentSubmission;
    return this.http.post<Assessment>(`http://localhost:5000/assessment/`, {
      studentId,
      file
    });
  }

  /**
   * GET assessment
   * @param {string} courseId     id of course
   * @param {string} assessmentId id of assessment
   */
  getAssessment(courseId: string, assessmentId: string): Observable<any> {
    return this.http.get(`http://localhost:5000/assessment/${courseId}/${assessmentId}`);
  }

  /**
   * GET all assessment for a course
   * @param {string} courseId id of course
   */
  getAllAssessments(courseId: string): Observable<any> {
    return this.http.get(`http://localhost:5000/assessment/${courseId}`);
  }

}