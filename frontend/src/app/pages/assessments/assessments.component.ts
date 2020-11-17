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
  selectedAss: Assessment;

  identification: Object[];

  viewSelfSubmissions: Object[][] = [];

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
  ) {
    const id = this.activatedRouter.snapshot.params['id'];
    this.courseId = id;
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.createNewAssessmentModal = false;
    this.submissionsModal = false;
    this.name = '';
    this.visibility = false;
    this.viewSelfSubmissions = [];
    this.assessArr = [];
    this.courseService
      .getCourse(this.courseId)
      .subscribe((incomingCourse: Course) => {
        this.course = incomingCourse;
        this.course.img =
          !this.course.img || this.course.img === ''
            ? (this.course.img = '../../../../assets/courseimage.png')
            : // TODO: REMOVE LOCALHOST FROM PROD BUILD AFTER
              `http://localhost:5000/api/course/documents/${this.course.img}`;

        this.courseService.getAllAssessments(incomingCourse._id).subscribe(
          (incomingArray: Assessment[]) => {
            this.assessArr = incomingArray.sort((a, b) => {
              if (a.name < b.name) {
                return -1; //nameA comes first
              }
              if (a.name > b.name) {
                return 1; // nameB comes first
              }
              return 0; // names must be equal
            });

            if (
              this.user.type === 'IL' ||
              (this.user.type === 'IC' &&
                !this.course.teachers.includes(this.user._id))
            ) {
              this.assessArr = this.assessArr.filter(
                (assess) => assess.visibility
              );
            }
            this.assessArr.forEach((assess) => {
              const studentSub = assess.studentSubmissions.find(
                (sub: any) => sub.studentId === this.user._id
              );
              if (studentSub) {
                console.log('HERE: ' + studentSub['studentId']);

                this.viewSelfSubmissions = this.viewSelfSubmissions.concat([
                  studentSub['files'],
                ]);
              } else {
                this.viewSelfSubmissions = this.viewSelfSubmissions.concat([
                  [{}],
                ]);
              }
            });

            console.log(this.viewSelfSubmissions);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  }

  showStudentSubmission($event) {
    this.selectedAss = $event;
    this.submissionsModal = true;
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

  submitHandler() {
    const formData = new FormData();
    for (const droppedFile of this.files) {
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
      .postStudentSubmission(this.selectedAss._id, this.user._id, formData)
      .subscribe((res) => {
        console.log('Did I make it');
        this.submissionsModal = false;
        this.selectedAss = null;
        this.ngOnInit();
      });
  }

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

  registerSubmission(assess: Assessment) {
    this.identification = assess.studentSubmissions.filter(
      (temp: any) => temp.studentId === this.user._id
    );

    if (this.identification.length) {
      console.log(this.identification[0]['studentId']);

      this.viewSelfSubmissions = this.identification[0]['files'];
      this.ngOnInit();
      return true;
    }

    // if (temp2.length) {
    //   this.viewSelfSubmissions = temp2[0].files;
    //   return true;
    // }

    // if (assess.studentSubmissions.includes(this.user._id)) {
    // } else {
    //   return false;
    // }
  }
}
