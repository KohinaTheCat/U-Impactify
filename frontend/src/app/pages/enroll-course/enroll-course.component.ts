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
      res.forEach(({ _id, name, description, level, teachers, img }) => {
        if (description.length > 400) {
          description = description.slice(0, 350) + '...';
        }

        let allTeachers: string;
        if (teachers.length == 1) allTeachers = teachers[0];
        else allTeachers = teachers.join(', ');

        if (!this.user.classesEnrolled.includes({ _id, name })) {
          this.courses.push({
            _id,
            name,
            description,
            level,
            allTeachers,
            img,
          });
        }
      });
      this.courses.map((course) =>
        course.img !== undefined && course.img !== ''
          ? (course.img =
              'http://localhost:5000/course/documents/' + course.img)
          : (course.img = '../../../assets/uLogo.png')
      );
    });
    console.log(this.courses);
  }

  cancel() {
    this.router.navigate(['dashboard']);
  }

  onClick($event) {
    this.selectedCourse = $event;
  }

  courseHandler() {
    if (!this.selectedCourse) return;
    const { _id, name, img } = this.selectedCourse;

    // get raw img id
    let parser = img;
    if (parser.startsWith('http:')) {
      parser = /[^/]*$/.exec(img)[0];
    } else {
      parser = undefined;
    }
    console.log("p", parser)

    this.courseService.enrollInCourse(this.user._id, _id).subscribe(
      (res) => {
        this.userService
          .enrollInCourse(
            this.user._id,
            {
              _id,
              name,
              "img": parser
            }
          )
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
