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
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css'],
})
export class AssessmentsComponent implements OnInit {
  course: Course;
  user: User;
  title: string = 'Create an assignment';
  createNewAssessmentModal: boolean = false;
  submissionsModal: boolean;
  name: string = '';
  files: NgxFileDropEntry[] = [];
  imageError: string = '';
  visibility: boolean = false;
  visualError: boolean = false;
  error: string = '';
  basic: boolean = true;
  selectedAss: Assessment;
  assessmentTracker: Assessment;
  editOption: boolean = false;
  selectedAssessment: Assessment;

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
    this.editOption = false;
    this.visualError = false;
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
                return -1; //nameA comes
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
                if (studentSub['files'].length > 0) {
                }

                this.viewSelfSubmissions = this.viewSelfSubmissions.concat([
                  studentSub['files'],
                ]);
              } else {
                this.viewSelfSubmissions = this.viewSelfSubmissions.concat([
                  [{}],
                ]);
              }
            });
          },
          (err) => {
            console.log(err);
          }
        );
      });
  }
  //
  cancel() {
    this.files = [];
    this.name = '';
    this.visibility = false;
    this.visualError = false;
    this.editOption = false;
    this.createNewAssessmentModal = false;
  }

  showStudentSubmission(assessment: any) {
    this.router.navigate([
      `course/${this.course._id}/assessments/studentSubmissions/${assessment._id}`,
    ]);
    console.log('asdfasd');
  }

  onEdit(assess: Assessment) {
    this.name = assess.name;
    this.visibility = assess.visibility;
    this.createNewAssessmentModal = true;
    this.editOption = true;
    this.selectedAssessment = assess;
    // if (assess.files.length) {
    //   this.courseService.deleteFiles(assess._id).subscribe((returnAssess: Assessment) => {

    //     // this.courseService.updateAssessment(returnAssess._id, );

    //   });
    // }
  }

  // onEdit(assess: Assessment) {

  //   this.createNewAssessmentModal = true;
  //   this.assessmentTracker = assess;

  //   this.title = 'Edit assignment';
  //   const { name, visibility, studentSubmission, files } = this;
  //   this.name = assess.name;
  //   this.visibility = assess.visibility;
  //   const assessment = {
  //     name,
  //     visibility,
  //     studentSubmission,
  //     files,
  //   };

  //   const formData = new FormData();

  //   for (const droppedFile of assessment.files) {
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: File) => {
  //         formData.append('documents', file, droppedFile.relativePath);
  //       });
  //     } else {
  //       // It was a directory (empty directories are added, otherwise only files)
  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //     }
  //   }

  //   if (assess.files) {
  //     this.courseService.deleteFiles(assess._id).subscribe((res) => {
  //       this.courseService
  //         .updateAssessment(formData, assessment, res._id)
  //         .subscribe((res) => {
  //           this.ngOnInit();
  //         });
  //     });
  //   } else {
  //     this.courseService
  //       .updateAssessment(formData, assessment, assess._id)
  //       .subscribe((res) => {
  //         this.ngOnInit();
  //       });
  //   }
  // }

  onDelete(assess: Assessment) {
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

    if (this.name.length != 0 && this.files.length != 0) {
      if (this.editOption) {
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

        if (this.selectedAssessment.files) {
          this.courseService
            .deleteFiles(this.selectedAssessment._id)
            .subscribe((newAssessment) => {});
        }

        this.courseService
          .updateAssessment(
            this.selectedAssessment._id,
            this.name,
            this.visibility,
            formData
          )
          .subscribe((newAssess) => {
            this.ngOnInit();
          });

        this.editOption = false;
      } else {
        this.visualError = false;
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
      this.cancel();
    } else {
      this.visualError = true;
    }
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
      .deleteStudentSubmission(this.selectedAss._id, this.user._id)
      .subscribe((res) => {});

    this.courseService
      .postStudentSubmission(this.selectedAss._id, this.user._id, formData)
      .subscribe((res) => {
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
      this.viewSelfSubmissions = this.identification[0]['files'];
      this.ngOnInit();
      return true;
    }
  }

  back() {
    this.router.navigate([`../../../course/${this.courseId}/`]);
  }
}
