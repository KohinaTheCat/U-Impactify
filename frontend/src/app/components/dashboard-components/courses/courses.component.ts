import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  user: User;
  courses: any[];
  selectedCourse: any;

  opened: boolean = false;
  isCoursesPage: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.ngOnChanges();
  }

  ngOnChanges(): void {
    this.user = this.userService.getCurrentUser();
    this.isCoursesPage = this.router.url === '/course';
    this.courses =
      this.user.type === 'IL'
        ? this.user.classesEnrolled
        : this.user.classesTeaching;
        
    this.courses.forEach((course) => {
      this.courseService.getCourseImageId(course._id).subscribe((res) => {
        course.img =
          res === '' || res === null ? '' : `https://uimpactify.herokuapp.com/api/course/documents/${res}`; // TODO REMOVE LOCALHOST FROM PRODUCTION BUILD
      });
    });
  }

  addNewCourse(): void {
    if (this.user.type === 'IL') {
      this.router.navigate(['course/enroll']);
    } else if (this.user.type === 'IC') {
      this.router.navigate(['course/create']);
    }
  }

  onClickDropCourse($event) {
    this.selectedCourse = $event;
    this.opened = true;
  }

  dropCourse(): void {
    if (!this.selectedCourse) return;
    this.opened = false;
    this.user.classesEnrolled = this.user.classesEnrolled.filter(
      (course: any) => course._id !== this.selectedCourse._id
    );
    this.userService.setUser(this.user);
    this.courseService
      .dropACourse(
        this.userService.getCurrentUser()._id,
        this.selectedCourse._id
      )
      .subscribe(
        (res) => {
          this.userService
            .dropACourse(
              this.userService.getCurrentUser()._id,
              this.selectedCourse._id
            )
            .subscribe(
              (res) => {
                this.userService.setUser(res);
                this.ngOnChanges();
              },
              (err) => console.log(err)
            );
        },
        (err) => console.log(err)
      );
  }

  previewCourse($event): void {
    this.selectedCourse = $event;
    this.router.navigate([`course/${this.selectedCourse._id}`]);
  }
}
