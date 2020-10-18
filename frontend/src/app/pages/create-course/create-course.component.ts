import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


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
  documents: NgxFileDropEntry[] = [];
  basic: boolean = true;

  ngOnInit(): void {}

  registerHandler() {
    const course = {
      title: this.title,
      description: this.description,
      files: this.documents,
    };    
    this.courseService.postNewCourse(course).subscribe(
      (res) => {
        console.log("success!")
      },
      (err) => {
        console.log(err);
      }
    );
    // call the postnewdocument function in services
    // for (const droppedFile of this.documents) {
    //   if (droppedFile.fileEntry.isFile) {
    //     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //     fileEntry.file((documents: File) => {
    //       console.log(droppedFile.relativePath, documents);
    //       const formData = new FormData()
    //       formData.append(droppedFile.relativePath, documents)
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

  // usage code from - https://www.npmjs.com/package/ngx-file-drop
  public dropped(documents: NgxFileDropEntry[]) {
    this.documents = documents;
    for (const droppedFile of documents) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((documents: File) => {
          // Here you can access the real file
           console.log(droppedFile.relativePath, documents);

          // // send that file to the backend
          // const formData = new FormData()
          // formData.append('logo', documents, droppedFile.relativePath)

          // const headers = new HttpHeaders({
          //   'security-token': 'mytoken'
          // })
          // this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          // .subscribe(data => {
          //   // Sanitized logo returned from backend
          // })

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
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
