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
      this.course.img =
        !this.course.img || this.course.img === ''
          ? (this.course.img = '../../../../assets/courseimage.png')
          : // TODO: REMOVE LOCALHOST FROM PROD BUILD AFTER
            `http://localhost:5000/api/course/documents/${this.course.img}`;
      this.loading = false;
    });
  }
}
