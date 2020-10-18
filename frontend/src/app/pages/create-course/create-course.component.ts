import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

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
    this.addDocument();
    // this.courseService.postNewCourse(course).subscribe(
    //   (res) => {
    //     console.log("success!")
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    // call the postnewdocument function in services
    // for (const droppedFile of this.files) {
    //   if (droppedFile.fileEntry.isFile) {
    //     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //     fileEntry.file((files: File) => {
    //       console.log(droppedFile.relativePath, files);
    //       const formData = new FormData()
    //       formData.append(droppedFile.relativePath, files)
    //       console.log("form data in component.ts")

    //       console.log(formData)
    //       this.courseService.postNewFile(formData).subscribe(
    //         (res) => {
    //           console.log("success!")
    //         },
    //         (err) => {
    //           console.log(err);
    //         }
    //       );
    //     });
    //   }

    // }
  }

  addDocument() {}

  // usage code from - https://www.npmjs.com/package/ngx-file-drop
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          // console.log(droppedFile.relativePath, files);

          const formData = new FormData();
          formData.append('logo', file, droppedFile.relativePath);

          const headers = new HttpHeaders({
            'security-token': 'mytoken',
          });

          this.courseService.postNewFile(formData).subscribe(
            (res) => {
              console.log('file added');
            },
            (err) => {
              console.log('uplaoidng file', err);
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
