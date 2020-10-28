import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-enroll-course',
  templateUrl: './enroll-course.component.html',
  styleUrls: ['./enroll-course.component.css'],
})
export class EnrollCourseComponent implements OnInit {
  basic: boolean = true;
  error: string = '';
  courses: any[] = [];
  user: User;

  selectedCourse: any;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.courseService.getAllCourses().subscribe((res) => {
      this.user.classesEnrolled.forEach((course: any) => {
        res = res.filter((resCourse: Course) => course._id !== resCourse._id);
      });
      res.forEach(({ _id, name, description, level, teachers }) => {
        if (description.length > 400) {
          description = description.slice(0, 350) + '...';
        }

        let allTeachers: string;
        if (teachers.length == 1) allTeachers = teachers[0];
        else allTeachers = teachers.join(', ');

        console.log(!this.user.classesEnrolled.includes({ _id, name }));
        if (!this.user.classesEnrolled.includes({ _id, name }))
          this.courses.push({ _id, name, description, level, allTeachers });
      });
    });
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

  onClick($event) {
    this.selectedCourse = $event;
  }

  courseHandler() {
    if (!this.selectedCourse) return;
    const { _id, name } = this.selectedCourse;
    this.courseService.enrollInCourse(this.user._id, _id).subscribe(
      (res) => {
        this.userService
          .enrollInCourse(this.user._id, {
            _id,
            name,
          })
          .subscribe(
            (res) => this.userService.setUser(res),
            (err) => console.log(err)
          );
      },
      (err) => console.log(err)
    );

    this.router.navigate(['dashboard']);
  }
}
