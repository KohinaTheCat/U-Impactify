import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css']
})
export class CoursePreviewComponent implements OnInit {


  // course = {
  //   title: 'coursename',
  //   description: 'coursedescription',
  //   teachers: ['instructor1', 'instructor2'],
  //   tags: 'coursetags',
  //   level: 'courselevel',
  // };  

  course = {
    title: '',
    description: '',
    teachers: [],
    tags: '',
    level: '',
  }; 

  // course: Course;

  constructor(private activatedRouter: ActivatedRoute, private courseService: CourseService,) {}

  ngOnInit(): void {
    const title = this.activatedRouter.snapshot.params['id'];
    this.courseService.getCourse(title).subscribe(
      (incomingCourse: Course) => {
        this.course.title = incomingCourse[0].title;
        this.course.description = incomingCourse[0].description;
        this.course.teachers = incomingCourse[0].teachers;
        this.course.tags = incomingCourse[0].tags;
        this.course.level = incomingCourse[0].level;
      }
    );
    console.log(this.course)
  }

}
