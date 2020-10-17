import { CreateCourseService } from './../../services/create-course.service';
import { CourseForm } from './CourseForm';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(private createCourseService: CreateCourseService) { }

  // testform : CourseForm = {
  //   title: "",
  //   description: "",
  //   level: "",
  //   tags: "",
  // };

  title: string = '';
  description: string = '';
  level: string = "";
  tags: string = "";

  ngOnInit(): void {
  }

  
  registerHandler() {
    const course = {
      title: this.title,
      description: this.description,
    };
     this.createCourseService.postNewCourse(course).subscribe(res => {
     }, err => {
      console.log(err); 
      });
  }

}
