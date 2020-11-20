import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-lectures',
  templateUrl: './course-lectures.component.html',
  styleUrls: ['./course-lectures.component.css'],
})
export class CourseLecturesComponent implements OnInit {
  videoId: string;
  title: string;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.videoId = "http://localhost:5000/api/course/documents/" + this.route.snapshot.paramMap.get('id')
    this.title = this.route.snapshot.paramMap.get("title")
  }
}
