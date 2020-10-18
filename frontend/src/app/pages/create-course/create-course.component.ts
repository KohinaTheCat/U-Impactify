import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  constructor(private courseService: CourseService) {}

  title: string = '';
  description: string = '';
  level: string = '';
  tags: string = '';
  files: NgxFileDropEntry[] = [];
  basic: boolean = true;

  ngOnInit(): void {}

  registerHandler() {
    const course = {
      title: this.title,
      description: this.description,
      // files: this.files,
    };
  }

  // usage code from - https://www.npmjs.com/package/ngx-file-drop
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          const formData = new FormData();
          formData.append('documents', file, droppedFile.relativePath);

          this.courseService.postNewFile(formData).subscribe(
            (res) => {
              console.log('Clara said yes.');
            },
            (err) => {
              console.log("Navinn said no.", err);
            }
          );

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  // usage code from - https://www.npmjs.com/package/ngx-file-drop
  public fileOver(event) {
    console.log(event);
  }

  // usage code from - https://www.npmjs.com/package/ngx-file-drop
  public fileLeave(event) {
    console.log(event);
  }
}
