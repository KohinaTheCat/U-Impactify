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

  selectedId: string = '';

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((res) => {
      res.forEach((course) => {
        const { _id, title, description, level } = course;
        this.courses.push({ _id, title, description, level });
      });
    });
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

  courseHandler() {
    if (!this.selectedId) return;

    const courseName = this.courses.filter(
      (course) => course._id === this.selectedId
    )[0].title;
      console.log("name", courseName)
    this.courseService
      .enrollInCourse(this.userService.getCurrentUser()._id, this.selectedId)
      .subscribe(
        (res) => {
          console.log(res);
          this.userService
            .enrollInCourse(this.userService.getCurrentUser()._id, {
              _id: this.selectedId,
              name: courseName,
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
