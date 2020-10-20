import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-enroll-course',
  templateUrl: './enroll-course.component.html',
  styleUrls: ['./enroll-course.component.css']
})
export class EnrollCourseComponent implements OnInit {

  basic: boolean = true;
  error : string = '';
  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['dashboard']);
  }

  courseHandler(){
    console.log("I made it !");
    this.courseService.getAllCourses().subscribe(
      (res) => {
        for(let i=0; i<res.length; i++){
          console.log(res[i].title);
        }
      }
    )

  }



}
