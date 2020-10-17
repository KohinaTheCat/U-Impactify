import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  title: string = '';
  description: string = '';
  level: string = "";
  tags: string = "";
  documents : string [] = [];
  basic: boolean = true;

  ngOnInit(): void {
  }

  
  registerHandler() {
    const course = {
      title: this.title,
      description: this.description,
    };
     this.courseService.postNewCourse(course).subscribe(res => {
     }, err => {
      console.log(err); 
      });
  }

}
