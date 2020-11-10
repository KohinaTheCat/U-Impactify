import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css'],
})
export class AssessmentsComponent implements OnInit {
  course: Course;
  user: User;
  openModal: boolean;
  array: string[] = ['1', '2', '3', '4', '5', '6'];

  constructor(
    private courseService: CourseService,
    private router: Router,
    private userService: UserService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.openModal = false;

    const id = this.activatedRouter.snapshot.params['id'];
    console.log('HerE:' + id);
    this.courseService.getCourse(id).subscribe((incomingCourse: Course) => {
      this.course = incomingCourse;
    });
  }
}
