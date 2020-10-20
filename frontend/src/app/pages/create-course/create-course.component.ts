import { CourseService } from './../../services/course.service';
import { CourseForm } from './CourseForm';
import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private userService: UserService
  ) {}

  title: string = '';
  description: string = '';
  level: string = '';
  tags: string = '';
  files: NgxFileDropEntry[] = [];
  basic: boolean = true;

  ngOnInit(): void {}

  registerHandler() {
    // add teachers to the new course
    // add this course id to teachers course list
    const course = {
      //teachers: [user.id],
      title: this.title,
      description: this.description,
      level: this.level,
      tags: this.tags,
      files: this.files,
    };

    this.courseService.postNewCourse(course).subscribe(
      (res) => {
        for (const droppedFile of course.files) {
          if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {
              const formData = new FormData();
              formData.append('documents', file, droppedFile.relativePath);
              console.log(res);
              this.courseService.postNewFile(formData, res).subscribe(
                (res) => {
                  this.userService
                    .updateClassesTeaching(
                      this.userService.getCurrentUser()._id,
                      <string>res
                    )
                    .subscribe(
                      (res) => console.log('Clara said yes again.'),
                      (err) => console.log('Navinn said no again.')
                    );
                },
                (err) => {
                  console.log('Navinn said no.', err);
                }
              );
            });
          } else {
            // It was a directory (empty directories are added, otherwise only files)
            const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            console.log(droppedFile.relativePath, fileEntry);
          }
        }
        console.log('success!');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // usage code from - https://www.npmjs.com/package/ngx-file-drop
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(file);
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
