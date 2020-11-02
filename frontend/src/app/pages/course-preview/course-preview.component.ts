import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css'],
})
export class CoursePreviewComponent implements OnInit {
  course: Course;
  valid: boolean;
  alreadyEnrolled: boolean = false;
  error: string;
  user: User;
  opened: boolean;
  name: string = '';
  description: string = '';
  level: string = '';
  tags: string = '';
  basic: boolean = true;

  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    const id = this.activatedRouter.snapshot.params['id'];
    this.courseService.getCourse(id).subscribe(
      (incomingCourse: Course) => {
        this.valid = true;
        this.course = incomingCourse;
        this.course.img =
          !this.course.img || this.course.img === ''
            ? (this.course.img = '../../../../assets/courseimage.png')
            : `http://localhost:5000/course/documents/${this.course.img}`;
        for (let i = 0; i < this.course.students.length; i++) {
          if (this.course.students[i] == this.user._id) {
            this.alreadyEnrolled = true;
            break;
          }
        }
      },
      (err) => {
        this.valid = false;
        this.error = err.message;
        console.log('error message' + this.error);
      }
    );
  }

  // user type was IL and wasn't enrolled in course, and now decided to enroll in course
  enrollHandler() {
    this.courseService
      .enrollInCourse(this.userService.getCurrentUser()._id, this.course._id)
      .subscribe(
        (res) => {
          console.log(res);
          this.userService
            .enrollInCourse(this.userService.getCurrentUser()._id, {
              _id: this.course._id,
              name: this.course.name,
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

  goToInstructorProfile($event): void {
    this.router.navigate([`/user/${$event}`]);
  };

  updateCourseContentHandler() {
    this.opened = true;
  }

  editDocumentsHandler() {

  }

  assessmentsHandler() {

  }

  studentAnalysisHandler() {
    
  }

  cancel() {
    this.opened = false;
  }
  registerHandler() {
    
    const { name, description, level, tags } = this;
    this.course = {
      _id: this.course._id,
      name:  this.name,
      description: this.description,
      students: this.course.students,
      teachers: this.course.teachers,
      tags: this.tags,
      level: this.level,
      img: this.course.img,
      files: this.course.files,
    }

    this.opened = false;

    
    this.courseService
      .updateCourse(this.course)
      .subscribe(res => console.log(res), (err) => console.log(err));

  }
}
