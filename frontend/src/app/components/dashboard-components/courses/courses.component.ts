import { CourseService } from 'src/app/services/course.service';
import { Course } from './../../../models/course.model';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  user: User;
  courses: any[];

  selectedCourse: any;

  constructor(private userService: UserService, private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.courses =
      this.user.type === 'IL'
        ? this.user.classesEnrolled
        : this.user.classesTeaching;
  }

  ngOnChanges(): void {
    this.user = this.userService.getCurrentUser();
    this.courses =
      this.user.type === 'IL'
        ? this.user.classesEnrolled
        : this.user.classesTeaching;
  }

  addNewCourse(): void {
    if(this.user.type === 'IL') {
      this.router.navigate(['enrollcourse']);
    } else if(this.user.type === 'IC') {
      this.router.navigate(['createcourse']);
    }
  }

  onClick($event){
    this.selectedCourse = $event;
    // TODO: Implement redirect route here
  }

  onClickDropCourse($event) {
    this.selectedCourse = $event;
    this.dropCourse();
  };


  dropCourse(): void {
    if (!this.selectedCourse) return;
    this.courseService.dropACourse(this.userService.getCurrentUser()._id, this.selectedCourse._id)
      .subscribe(
        (res) => {
          this.userService
            .dropACourse(this.userService.getCurrentUser()._id, this.selectedCourse._id)
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
}
