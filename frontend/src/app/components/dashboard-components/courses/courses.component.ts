import { CreateCourseComponent } from './../../../pages/create-course/create-course.component';
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  /**
   * TODO: Setup
   */
  addNewCourse(): void {
    if(this.user.type === 'IL') {
      console.log("ADD NEW COURSE STUDENT");
      this.router.navigate(['enrollcourse']);
    } else if(this.user.type === 'IC') {
      console.log("CREATE NEW COURSE TEACHER");
      this.router.navigate(['createcourse']);
    }
  }
}