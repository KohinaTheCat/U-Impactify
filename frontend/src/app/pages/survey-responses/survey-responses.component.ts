import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Course } from 'src/app/models/course.model';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-responses',
  templateUrl: './survey-responses.component.html',
  styleUrls: ['./survey-responses.component.css'],
})
export class SurveyResponsesComponent implements OnInit {
  user: User;
  course: Course;
  courseId: string;
  valid: boolean;
  showSurveys: true;
  loading: boolean = true;
  averageAnswers: number[] = [0, 0, 0, 0, 0];

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private activateRouter: ActivatedRoute
  ) {
    const courseId = this.activateRouter.snapshot.params['courseId'];
    this.courseId = courseId;
  }

  ngOnInit(): void {
    this.courseService.getCourse(this.courseId).subscribe((course: Course) => {
      this.user = this.userService.getCurrentUser();
      if (course.teachers.includes(this.user._id)) {
        this.valid = true;
      }
      this.course = course;
      for(let i = 0; i < course.instructorReview.length; i++){
        for(let j = 0 ; j < 5; j++){
          if(Number(course.instructorReview[i].surveyAnswers[j]) !== NaN){
            this.averageAnswers[j] = this.averageAnswers[j] + Number(course.instructorReview[i].surveyAnswers[j]);
          }
        }
      }
      for(let k = 0; k < this.averageAnswers.length; k++){
        this.averageAnswers[k] = (Math.round((this.averageAnswers[k] / course.instructorReview.length) * 100)) / 100;
      }
      this.course.img =
        !this.course.img || this.course.img === ''
          ? (this.course.img = '../../../../assets/courseimage.png')
          : // TODO: REMOVE LOCALHOST FROM PROD BUILD AFTER
            `https://uimpactify.herokuapp.com/api/course/documents/${this.course.img}`;
      this.loading = false;
    });
  }
}
