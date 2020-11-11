import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
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
  array: string[] = ['1', '2', '3', '4', '5', '6'];
  name: String;
  files: NgxFileDropEntry[] = [];
  img: NgxFileDropEntry[] = [];
  imageError: string = '';
  visibility: String;
  error: string = '';
  basic: boolean = true;

  //assessments: Array<assessments> = [];

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
    this.visibility = '';

    const id = this.activatedRouter.snapshot.params['id'];
    this.courseService.getCourse(id).subscribe((incomingCourse: Course) => {
      this.course = incomingCourse;
    });
  }

  registerHandler() {
    console.log('Here: ' + this.name);
    // const { name, visibility, files } = this;
    // const assessments = {
    //   name,
    //   visibility,
    //   files,
    // };
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
