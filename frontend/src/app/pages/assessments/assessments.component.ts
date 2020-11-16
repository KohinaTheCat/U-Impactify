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
  openModal: boolean;
  name: String = '';
  files: NgxFileDropEntry[] = [];
  imageError: string = '';
  visibility: boolean = false;
  error: string = '';
  basic: boolean = true;

  courseId: string = '';
  assessArr: Assessment[] = [];
  studentSubmissions: Object[] = [];
  currUser: Assessment;
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
    this.openModal = false;
    this.name = '';
    this.visibility = false;

    this.courseId = this.activatedRouter.snapshot.params['id'];
    this.courseService
      .getCourse(this.courseId)
      .subscribe((incomingCourse: Course) => {
        this.course = incomingCourse;
        this.course.img =
          !this.course.img || this.course.img === ''
            ? (this.course.img = '../../../../assets/courseimage.png')
            : // TODO: REMOVE LOCALHOST FROM PROD BUILD AFTER
              `http://localhost:5000/api/course/documents/${this.course.img}`;
      });

    this.courseService.getAllAssessments(this.courseId).subscribe((res) => {
      this.assessArr = res;
    });
  }

  onEdit(assess: Assessment) {}

  // Ask about this. Not working :(
  onDelete(assess: Assessment) {
    var temp = this.assessArr.indexOf({
      _id: assess._id,
      name: assess.name,
      visibility: assess.visibility,
      files: assess.files,
      studentSubmissions: assess.studentSubmissions,
    });
    console.log(
      'HEREEEE: ' +
        temp +
        assess._id +
        ' ' +
        assess.name +
        ' ' +
        assess.visibility +
        ' ' +
        assess.files +
        ' ' +
        assess.studentSubmissions
    );
    delete this.assessArr[temp];
    //this.assessArr.find(({ name }) => name === assess.name);
  }

  registerHandler() {
    console.log('Added first one');
    const { name, visibility, studentSubmissions, files } = this;
    const assessment = {
      name,
      visibility,
      studentSubmissions,
      files,
    };

    this.courseService.postNewAssessment(assessment).subscribe(
      (res) => {
        console.log('courseId: ' + this.courseId + ' assessmentId: ' + res._id);
        this.courseService
          .postAssessmentCourse(this.courseId, res._id)
          .subscribe((res) => {
            this.ngOnInit();
          });

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

          this.courseService.postNewFile(formData, res._id).subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        }
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
}
