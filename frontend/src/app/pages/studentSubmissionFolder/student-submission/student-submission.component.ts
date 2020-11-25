import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Assessment } from 'src/app/models/assessment.model';
import { Course } from 'src/app/models/course.model';
// import { Pipe, PipeTransform } from '@angular/core';

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
              `http://localhost:5000/api/course/documents/${this.course.img}`;

        this.courseService
          .getAllAssessments(this.courseId)
          .subscribe((incomingArraySet) => {
            for (const eachAssessment of incomingArraySet) {
              if (eachAssessment._id === this.assessmentId) {
                this.assessment = eachAssessment;
              }
            }
          });
      });
  }

  back() {
    this.router.navigate([`../../../course/${this.courseId}/assessments/`]);
  }
}

// @Pipe({
//   name: 'appProperties',
// })
// export class PropertiesPipe implements PipeTransform {
//   transform(value: {}): string[] {
//     if (!value) {
//       return [];
//     }

//     return Object.keys(value);
//   }
// }
