import { CourseForm } from './CourseForm';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor() { }

  
  

  testform : CourseForm = {
    title: "",
    description: "",
  };

  title: string = '';
  description: string = '';

  ngOnInit(): void {
  }

}
