import { Course } from './../models/course.model';
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
   */

  /**
   * DELETE new assessment
   */

  /**
   * Submit student submission to assessment
   */

  /**
   * GET assessment
   */

  /**
   * GET all assessments from courseId
   */

}