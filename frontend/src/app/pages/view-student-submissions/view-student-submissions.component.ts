import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-student-submissions',
  templateUrl: './view-student-submissions.component.html',
  styleUrls: ['./view-student-submissions.component.css'],
})


export class ViewStudentSubmissionsComponent implements OnInit {
  
  courseId: string;
  assessmentId: string;
  submissionId: string;
  title: string;
  viewSubmission: string;

  constructor(
    private router: Router, private route: ActivatedRoute) {

      const id = this.route.snapshot.params['id'];
      const assessmentId = this.route.snapshot.params['assessment'];
      const submissionId = this.route.snapshot.params['submission'];
      this.assessmentId = assessmentId;
      this.courseId = id;
      this.submissionId = submissionId;
  }

  ngOnInit(): void {

    console.log("Course: " + this.courseId);
    console.log("Assessment: " + this.assessmentId);
    console.log("Submission: " + this.submissionId);

    console.log('http://localhost:5000/api/course/documents/' + this.route.snapshot.paramMap.get('submission'));
    
    this.viewSubmission =
    'http://localhost:5000/api/course/documents/' + this.route.snapshot.paramMap.get('submission');

  }

  back() {

    this.router.navigate([`course/${this.courseId}/assessments/studentSubmissions/${this.assessmentId}`]);
  }

  mark() {
    
  }
}
