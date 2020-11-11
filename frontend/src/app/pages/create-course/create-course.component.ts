import { UserService } from './../../services/user.service';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private router: Router
  ) {}

  name: string = '';
  description: string = '';
  level: string = '';
  tags: string = '';
  files: NgxFileDropEntry[] = [];
  img: NgxFileDropEntry[] = [];
  basic: boolean = true;
  error: string = '';
  imageError: string = '';

  done: boolean = false;

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['dashboard']);
  }

  registerHandler() {
    const { name, description, level, tags, files } = this;
    const course = {
      teachers: [this.userService.getCurrentUser()._id],
      name,
      description,
      level,
      tags,
      files,
    };

    this.courseService
      .postNewCourse(course, this.userService.getCurrentUser()._id)
      .subscribe(
        (res) => {
          // call add image
          for (const droppedFile of this.img) {
            if (droppedFile.fileEntry.isFile) {
              const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
              fileEntry.file((file: File) => {
                const formData = new FormData();
                formData.append('document', file, droppedFile.relativePath);
                this.courseService.postCourseImage(formData, res._id).subscribe(
                  (res) => {
                    this.userService
                      .updateClassesTeaching(
                        this.userService.getCurrentUser()._id,
                        {
                          _id: res._id,
                          name: res.name,
                          img: res.img,
                        }
                      )
                      .subscribe(
                        (res) => {
                          this.userService.setUser(res);
                          this.done = true;
                          this.router.navigate(['dashboard']);
                        },
                        (err) => console.log(err)
                      );
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });
            } else {
              // It was a directory (empty directories are added, otherwise only files)
              const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
              console.log(droppedFile.relativePath, fileEntry);
            }
          }

          if (!this.img.length) {
            this.userService
              .updateClassesTeaching(this.userService.getCurrentUser()._id, {
                _id: res._id,
                name: res.name,
                img: res.img,
              })
              .subscribe(
                (res) => {
                  this.userService.setUser(res);
                  this.router.navigate(['dashboard']);
                },
                (err) => console.log(err)
              );
          }

          for (const droppedFile of course.files) {
            if (droppedFile.fileEntry.isFile) {
              const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
              fileEntry.file((file: File) => {
                const formData = new FormData();
                formData.append('documents', file, droppedFile.relativePath);
                this.courseService.postNewFile(formData, res._id).subscribe(
                  (res) => {
                    console.log(res);
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });
            } else {
              // It was a directory (empty directories are added, otherwise only files)
              const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            }
          }
        },
        (err) => {
          this.error = err.message;
          this.basic = true;
        }
      );
  }

  // usage code from - https://www.npmjs.com/package/ngx-file-drop
  public dropped(files: NgxFileDropEntry[]) {
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

  public droppedCourseImage(image: NgxFileDropEntry[]) {
    this.img = image;
    for (const droppedFile of image) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (
            !(
              file.name.endsWith('.png') ||
              file.name.endsWith('.jpg') ||
              file.name.endsWith('.JPG') ||
              file.name.endsWith('.JPEG') ||
              file.name.endsWith('.jpeg')
            )
          ) {
            this.img = [];
            this.imageError = 'Bad Course Image!';
          } else {
            this.imageError = '';
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
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
