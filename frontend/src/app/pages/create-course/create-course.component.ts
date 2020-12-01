import { UserService } from './../../services/user.service';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrLoadingState } from '@clr/angular';
import { Location } from '@angular/common';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.courseId = this.activatedRouter.snapshot.params['id'];
  }

  name: string = '';
  description: string = '';
  level: string = '';
  tags: string = '';
  files: NgxFileDropEntry[] = [];
  img: NgxFileDropEntry[] = [];
  error: string = '';
  imageError: string = '';

  courseId: string = '';
  course: Course;

  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  shouldShowSubmit: boolean = true;

  ngOnInit(): void {
    if (!!this.courseId) {
      this.courseService.getCourse(this.courseId).subscribe((course) => {
        this.course = course;
        this.name = course.name;
        this.description = course.description;
        this.level = course.level;
        this.tags = course.tags;
      });
    }
  }

  ngDoCheck(): void {
    this.shouldShowSubmit =
      !!this.name.trim() && !!this.description.trim() && !!this.level;
  }

  cancel() {
    this.location.back();
  }

  updateHandler() {
    this.submitBtnState = ClrLoadingState.LOADING;
    const { name, description, level, tags, files } = this;
    this.course = {
      ...this.course,
      name: name.trim(),
      description: description.trim(),
      level,
      tags: tags.trim(),
    };
    this.courseService.updateCourse(this.course).subscribe((course) => {
      for (const droppedFile of this.img) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            const formData = new FormData();
            formData.append('document', file, droppedFile.relativePath);
            this.courseService.postCourseImage(formData, course._id).subscribe(
              (res: Course) => {
                this.courseService.bulkUpdateCourseImage(res._id, res.img).subscribe(res => {
                  this.submitBtnState = ClrLoadingState.SUCCESS;
                  this.router.navigate([`course/${course._id}`]);
                });
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
        this.submitBtnState = ClrLoadingState.SUCCESS;
        this.router.navigate([`course/${course._id}`]);
      }
    }, err => console.log(err));
  }

  registerHandler() {
    if (this.course && this.courseId.length) return this.updateHandler();
    return this.newCourseHandler();
  }

  newCourseHandler() {
    this.submitBtnState = ClrLoadingState.LOADING;
    const { name, description, level, tags, files } = this;
    const course = {
      teachers: [this.userService.getCurrentUser()._id],
      name: name.trim(),
      description: description.trim(),
      level,
      tags: tags.trim(),
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
                          this.submitBtnState = ClrLoadingState.SUCCESS;
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
                  this.submitBtnState = ClrLoadingState.SUCCESS;
                  this.router.navigate(['dashboard']);
                },
                (err) => console.log(err)
              );
          }
          const formData = new FormData();
          for (const droppedFile of course.files) {
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
          this.courseService.postNewFile(formData, res._id).subscribe(
            (res) => {
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (err) => {
          this.error = err.message;
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
