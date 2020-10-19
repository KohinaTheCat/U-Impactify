import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enroll-course',
  templateUrl: './enroll-course.component.html',
  styleUrls: ['./enroll-course.component.css']
})
export class EnrollCourseComponent implements OnInit {

  basic: boolean = true;
  error : string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['dashboard']);
  }

}
