import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-lectures',
  templateUrl: './course-lectures.component.html',
  styleUrls: ['./course-lectures.component.css'],
})
export class CourseLecturesComponent implements OnInit {
  videoId: string;
  title: string;
  date: string;
  courseId: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.videoId =
      'https://uimpactify.herokuapp.com/api/course/documents/' +
      this.route.snapshot.paramMap.get('id');

    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.title = this.route.snapshot.paramMap.get('title');

    var d = new Date(this.route.snapshot.paramMap.get('date'));
    this.date = d.toDateString();
  }
  skrrtback() {
    this.router.navigate([`../../course/${this.courseId}/`]);
  }
}
