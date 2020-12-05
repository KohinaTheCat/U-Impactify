import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Assessment } from 'src/app/models/assessment.model';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-student-submission',
  templateUrl: './student-submission.component.html',
  styleUrls: ['./student-submission.component.css'],
})
export class StudentSubmissionComponent implements OnInit {
  course: Course;
  courseId: string;
  assessmentId: string;
  assessment: Assessment;
  loading: boolean = true;
  mark: number;
  markStudentModel: boolean = false;
  studentId: string;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private userService: UserService,
    private activatedRouter: ActivatedRoute
  ) {
    const id = this.activatedRouter.snapshot.params['id'];
    const assessmentId = this.activatedRouter.snapshot.params['assessment'];
    this.assessmentId = assessmentId;
    this.courseId = id;
  }

  ngOnInit(): void {
    // Gives us the assessment instance
    this.courseService
      .getCourse(this.courseId)
      .subscribe((incomingCourse: Course) => {
        this.course = incomingCourse;
        this.course.img =
          !this.course.img || this.course.img === ''
            ? (this.course.img = '../../../../assets/courseimage.png')
            : // TODO: REMOVE LOCALHOST FROM PROD BUILD AFTER
              `https://uimpactify.herokuapp.com/api/course/documents/${this.course.img}`;

        this.courseService
          .getAllAssessments(this.courseId)
          .subscribe((incomingArraySet) => {
            for (const eachAssessment of incomingArraySet) {
              if (eachAssessment._id === this.assessmentId) {
                this.assessment = eachAssessment;
                this.loading = false;
              }
            }
          });
      });

    this.markStudentModel = false;
  }

  back() {
    this.router.navigate([`../../../course/${this.courseId}/assessments/`]);
  }

  goToSubmission(studentId: any, submission: any) {
    this.router.navigate([`course/${this.courseId}/assessments/studentSubmissions/${this.assessmentId}/${submission.id}/${studentId}/${submission.name}`])
  }

  openMarkModel(studentId, mark) {
    this.markStudentModel = true;
    this.studentId = studentId;
    if (mark > 0) this.mark = mark;
  }

  cancel() {
    this.markStudentModel = false;
  }

  
  registerHandler() {
    const { mark } = this;
    this.courseService.updateMark(this.assessmentId, this.studentId, mark)
    .subscribe((incomingAssessment: Assessment) => {
      this.ngOnInit();
    });
  }
}
