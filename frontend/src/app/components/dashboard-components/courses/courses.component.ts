import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  user: User;
  courses: object[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.courses =
      this.user.type === 'IL'
        ? this.user.classesEnrolled
        : this.user.classesTeaching;
  }

  /**
   * TODO: Setup
   */
  addNewCourse(): void {
    if (this.user.type === 'IL') {
      console.log('ADD NEW COURSE STUDENT');
    } else if (this.user.type === 'IC') {
      console.log('CREATE NEW COURSE TEACHER');
    }
  }
}
