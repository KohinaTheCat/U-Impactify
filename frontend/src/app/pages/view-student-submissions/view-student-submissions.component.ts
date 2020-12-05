import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

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
  submissionName: string;
  pdfView: boolean = false;
  docxView: boolean = false;
  pngView: boolean = false;
  studentId: string;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private UserService: UserService,
    private route: ActivatedRoute) {

      const id = this.route.snapshot.params['id'];
      const assessmentId = this.route.snapshot.params['assessment'];
      const submissionId = this.route.snapshot.params['submissionId'];
      const submissionName = this.route.snapshot.params['submissionName'];
      const studentId = this.route.snapshot.params['studentId'];
      this.assessmentId = assessmentId;
      this.courseId = id;
      this.submissionId = submissionId;
      this.submissionName = submissionName;
      this.studentId = studentId;
  }

  ngOnInit(): void {

    if (this.submissionName.match(new RegExp('.*\.pdf$'))) {
      this.pdfView = true;
    } else if (this.submissionName.match(new RegExp('.*\.docx$'))) {
      this.docxView = true;
    } else if (this.submissionName.match(new RegExp('.*\.png$'))) {
      this.pngView = true;
    }
    
    this.viewSubmission =
    'https://uimpactify.herokuapp.com/api/course/documents/' + this.route.snapshot.paramMap.get('submissionId');

  }

  back() {

    this.router.navigate([`course/${this.courseId}/assessments/studentSubmissions/${this.assessmentId}`]);
  }
}
