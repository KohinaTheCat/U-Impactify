import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-enroll-course',
  templateUrl: './enroll-course.component.html',
  styleUrls: ['./enroll-course.component.css'],
})
export class EnrollCourseComponent implements OnInit {
  basic: boolean = true;
  error: string = '';
  courses: any[] = [];

  selectedCourse: any;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((res) => {
      res.forEach(({ _id, title, description, level, teachers }) => {
        if(description.length > 400) {
          description = description.slice(0, 350) + "...";
        }
        if(teachers.length == 1) teachers = teachers[0];
        else teachers = teachers.join(", ");
        this.courses.push({ _id, title, description, level, teachers });
      });
    });
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

  onClick($event) {
    console.log($event);
    this.selectedCourse = $event;
  }

  courseHandler() {
    if (!this.selectedCourse) return;

    this.courseService
      .enrollInCourse(this.userService.getCurrentUser()._id, this.selectedCourse._id)
      .subscribe(
        (res) => {
          console.log(res);
          this.userService
            .enrollInCourse(this.userService.getCurrentUser()._id, {
              _id: this.selectedCourse._id,
              name: this.selectedCourse.title,
            })
            .subscribe(
              (res) => console.log(res),
              (err) => console.log(err)
            );
        },
        (err) => console.log(err)
      );

    this.router.navigate(['dashboard']);
  }
}
