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

  selectedId: string = "";

  constructor(private router: Router, private courseService: CourseService, private userService: UserService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((res) => {
      res.forEach(course => {
        const {_id, title, description, level} = course;
        this.courses.push({ _id, title, description, level });
      });
    });
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

  courseHandler() {
     // this.courseService.enrollUser(this.userService.getCurrentUser()._id, selectedId);
  }
}
