import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Assessment } from 'src/app/models/assessment.model';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';

import { ROOT_DROPDOWN_PROVIDER } from '@clr/angular/popover/dropdown/providers/dropdown.service';
import { FiltersProvider } from '@clr/angular/data/datagrid/providers/filters';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css'],
})
export class AssessmentsComponent implements OnInit {
  course: Course;
  user: User;
  createNewAssessmentModal: boolean;
  submissionsModal: boolean;
  name: String = '';
  files: NgxFileDropEntry[] = [];
  imageError: string = '';
  visibility: boolean = false;
  error: string = '';
  basic: boolean = true;

  studentSubmission: Object[] = [];

  assessArr: Assessment[] = [];

  courseId: string = '';

  tempVar: string;

  studentSubmissions: Object[] = [];
  img: NgxFileDropEntry[] = [];
  file: String[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router,
    private userService: UserService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.createNewAssessmentModal = false;
    this.submissionsModal = false;
    this.name = '';
    this.visibility = false;

    const id = this.activatedRouter.snapshot.params['id'];
    this.courseId = id;
    this.courseService.getCourse(id).subscribe((incomingCourse: Course) => {
      this.course = incomingCourse;

      // console.log('here1: ' + incomingCourse);
      // console.log('here2: ' + this.course);
      this.name = this.course.name;
      this.course.img =
        !this.course.img || this.course.img === ''
          ? (this.course.img = '../../../../assets/courseimage.png')
          : // TODO: REMOVE LOCALHOST FROM PROD BUILD AFTER
            `http://localhost:5000/api/course/documents/${this.course.img}`;

      this.courseService.getAllAssessments(incomingCourse._id).subscribe(
        (incomingArray: Assessment[]) => {
          this.assessArr = incomingArray;
          console.log(this.assessArr);
        },
        (err) => {
          console.log(err);
        }
      );
    });

    console.log(this.assessArr);
  }

  onEdit(assess: Assessment) {}

  // Ask about this. Not working :(
  onDelete(assess: Assessment) {
    console.log('courseId: ' + this.courseId + 'assess.id ' + assess._id);
    this.courseService
      .deleteAssessment(this.courseId, assess._id)
      .subscribe((res) => {
        this.ngOnInit();
      });
  }

  registerHandler() {
    const { name, visibility, studentSubmissions, files } = this;
    const assessment = {
      name,
      visibility,
      studentSubmissions,
      files,
    };

    this.courseService.postNewAssessment(assessment).subscribe(
      (ass) => {
        const formData = new FormData();

        for (const droppedFile of assessment.files) {
          if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
              formData.append('documents', file, droppedFile.relativePath);
            });
          } else {
            // It was a directory (empty directories are added, otherwise only files)
            const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          }
        }

        this.courseService
          .postAssessmentCourse(this.courseId, ass._id)
          .subscribe((res) => {
            this.courseService
              .postNewAssessmentFile(formData, ass._id)
              .subscribe(
                (res) => {
                  console.log(res);
                  this.ngOnInit();
                },
                (err) => {
                  console.log(err);
                }
              );
          });
      },
      (err) => {
        this.error = err.message;
        this.basic = true;
      }
    );
  }

  cancel() {}

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  fileOver(event) {
    console.log(event);
  }
  fileLeave(event) {
    console.log(event);
  }

  studentSubmissionFunction(assess: Assessment) {
    if (assess == null) {
    } else {
      this.courseService
        .getAllStudentSubmissions(assess._id)
        .subscribe((res) => {
          this.studentSubmission = res;
        });
    }
  }
}
