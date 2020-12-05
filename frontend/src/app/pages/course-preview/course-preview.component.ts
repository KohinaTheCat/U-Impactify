import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute } from '@angular/router';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { ClrWizard } from '@clr/angular';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css'],
})
export class CoursePreviewComponent implements OnInit {
  course: Course;
  user: User;
  courseId: string;

  valid: boolean;
  alreadyEnrolled: boolean = false;

  error: string;
  errorMessage: string = '';
  imageError: string = '';
  openedUpdateCourse: boolean;

  description: string = '';
  level: string = '';
  img: NgxFileDropEntry[] = [];
  loading: boolean = true;
  tags: string[] = [];

  openedRateCourse: boolean;
  openedAllReviews: false;
  surveyRequest: boolean;
  openedSurveyRequest: boolean = false;
  openedSurvey: boolean = false;
  instructorReview: Course['instructorReview'];
  completedSurvey: boolean = false;

  reviews: Course['reviews'];
  courseReview: string = '';
  score: number = 0;
  anon: boolean = false;
  courseStars: number[] = [1, 2, 3, 4, 5];
  averageScore: number = 0;

  uploadFileName: string;

  @ViewChild('reviewStars') stars;
  @ViewChild('wizardxl') wizardExtraLarge: ClrWizard;
  xlOpen: boolean = false;
  surveyAnswer: string[] = new Array('');
  surveyQuestions: string[] = [
    'I found the course very fun and exciting',
    'This course gave me a good understanding of this subject',
    'The impact consultant designed the course so it was easy to access resources',
    'Course assessments allowed me to better improve my understanding with the course material',
    'The overall course quality was great',
  ];

  uploadVideo: boolean = false;
  video: NgxFileDropEntry[] = [];
  videoUploadError: string = '';
  videoTitle: string = '';

  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    const id = this.activatedRouter.snapshot.params['id'];
    this.courseId = id;

    this.courseService.getCourse(id).subscribe(
      (incomingCourse: Course) => {
        this.valid = true;
        this.course = incomingCourse;
        this.reviews = this.course.reviews;
        this.description = this.course.description;
        this.level = this.course.level;
        this.tags = this.course.tags.split(' ');
        this.surveyRequest = this.course.surveyRequest;
        this.instructorReview = this.course.instructorReview;
        this.course.img =
          !this.course.img || this.course.img === ''
            ? (this.course.img = '../../../../assets/courseimage.png')
            : // TODO: REMOVE LOCALHOST FROM PROD BUILD AFTER
              `https://uimpactify.herokuapp.com/api/course/documents/${this.course.img}`;
        for (let i = 0; i < this.course.students.length; i++) {
          if (this.course.students[i] == this.user._id) {
            this.alreadyEnrolled = true;
            break;
          }
        }
        if (this.surveyRequest) {
          for (let j = 0; j < this.instructorReview.length; j++) {
            if (this.instructorReview[j]._id === this.user._id) {
              this.completedSurvey = true;
              break;
            }
          }
        }
        this.averageScore = 0;

        this.course.reviews.forEach((review: any) => {
          this.averageScore += review.score;
        });

        this.averageScore = this.averageScore / this.course.reviews.length;

        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.valid = false;
        this.error = err.message;
      }
    );
  }

  // user type was IL and wasn't enrolled in course, and now decided to enroll in course
  enrollHandler() {
    this.courseService
      .enrollInCourse(this.userService.getCurrentUser()._id, this.course._id)
      .subscribe(
        (res) => {
          this.userService
            .enrollInCourse(this.userService.getCurrentUser()._id, {
              _id: this.course._id,
              name: this.course.name,
            })
            .subscribe(
              (res) => {
                this.userService.setUser(res);
                this.router.navigate(['dashboard']);
              },
              (err) => console.log(err)
            );
        },
        (err) => console.log(err)
      );
  }

  goToInstructorProfile($event): void {
    this.router.navigate([`/user/${$event}`]);
  }

  updateCourseContentHandler() {
    this.router.navigate([`course/${this.course._id}/edit`]);
  }

  editDocumentsHandler() {}

  assessmentsHandler() {
    this.router.navigate([`course/${this.course._id}/assessments`]);
  }

  studentAnalysisHandler() {
    this.router.navigate([`course/${this.course._id}/studentAnalytics`]);
  }

  registerSurveyRequest() {
    this.openedSurveyRequest = false;
    this.courseService.requestSurvey(this.course._id).subscribe(
      (res: Course) => {
        this.ngOnInit();
      },
      (err) => console.log(err)
    );
  }

  cancel() {
    this.openedUpdateCourse = false;
  }

  registerHandler() {
    const { description, level } = this;

    // call add image
    for (const droppedFile of this.img) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const formData = new FormData();
          formData.append('document', file, droppedFile.relativePath);
          this.courseService
            .postCourseImage(formData, this.course._id)
            .subscribe(
              (res: Course) => {
                this.ngOnInit();
              },
              (err) => {
                console.log(err);
              }
            );
        });
      }
    }

    this.course = { ...this.course, description, level };

    this.openedUpdateCourse = false;

    this.courseService.updateCourse(this.course).subscribe(
      (res: Course) => {
        this.ngOnInit();
      },
      (err) => console.log(err)
    );
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
      }
    }
  }

  setScore(score: number): void {
    this.score = score;
    this.stars.nativeElement.childNodes.forEach(
      (star, i) => (star.className = i < this.score ? 'is-solid' : '')
    );
  }

  onSubmitReview() {
    if (!this.score) return (this.errorMessage = 'You cannot give a 0 score!');
    this.courseService
      .addAReview(
        this.user._id,
        this.course._id,
        this.courseReview.trim(),
        this.score,
        this.anon
      )
      .subscribe((course) => {
        this.openedRateCourse = false;
        this.ngOnInit();
      });
  }

  submitSurvey() {
    this.courseService
      .addSurvey(
        this.userService.getCurrentUser()._id,
        this.course._id,
        this.surveyAnswer
      )
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  goToSurveyResponses() {
    this.router.navigate([`surveyresponses/${this.course._id}`]);
  }

  goToLecture(id, title, date) {
    this.router.navigate([
      `course/lectures/${this.courseId}/${title}/${id}/${date}`,
    ]);
  }

  uploadLecture() {
    if (this.videoTitle === '') {
      this.videoUploadError = 'No Title Entered!';
      return;
    } else if (this.video.length == 0) {
      this.videoUploadError = 'No Lecture Imported!';
      return;
    }

    this.uploadVideo = false;
    var video = this.video;
    if (video[0].fileEntry.isFile) {
      const fileEntry = video[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        const formData = new FormData();
        formData.append('document', file, video[0].relativePath);
        formData.append('title', this.videoTitle);
        this.courseService
          .postUploadLecture(formData, this.course._id)
          .subscribe(
            (res: Course) => {
              this.ngOnInit();
            },
            (err) => {
              console.log(err);
            }
          );
      });
    }
    this.reset();
  }

  public droppedLecture(video: NgxFileDropEntry[]) {
    this.video = video;
    if (video[0].fileEntry.isFile) {
      const fileEntry = video[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        if (!file.name.endsWith('.mp4')) {
          this.video = [];
          this.videoUploadError = 'Bad Lecture Type!';
        } else {
          this.uploadFileName = 'Uploaded: "' + file.name + '"';
        }
      });
    }
  }

  public dateToString(date) {
    var d = new Date(date);
    return d.toDateString();
  }

  public reset() {
    this.uploadVideo = false;
    this.video = [];
    this.videoUploadError = '';
    this.videoTitle = '';
    this.uploadFileName = '';
  }
}
