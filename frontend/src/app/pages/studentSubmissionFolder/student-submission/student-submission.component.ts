import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-submission',
  templateUrl: './student-submission.component.html',
  styleUrls: ['./student-submission.component.css'],
})
export class StudentSubmissionComponent implements OnInit {
  courseId: string;
  assessment: string;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private userService: UserService,
    private activatedRouter: ActivatedRoute
  ) {
    const id = this.activatedRouter.snapshot.params['id'];
    const assessmentId = this.activatedRouter.snapshot.params['assessment'];
    this.assessment = assessmentId;
    this.courseId = id;
  }

  ngOnInit(): void {}

  back() {
    console.log('why');
    this.router.navigate([`../../../course/${this.courseId}/assessments/`]);
  }
}
