import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Course } from 'src/app/models/course.model';
import { User } from 'src/app/models/user.model';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private courseService: CourseService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.includes('search/')) this.initComponent();
      });
  }

  loading: boolean = true;
  courses: Course[] = [];
  users: User[] = [];
  query: string;
  results: number = 0;
  type: string;

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(): void {
    this.loading = true;

    this.type = this.activatedRouter.snapshot.params['type'];
    this.query = decodeURI(this.activatedRouter.snapshot.params['query']);

    if (this.type === 'user') {
      this.userService.search(this.query).subscribe((users: User[]) => {
        this.users = users;
        this.results = this.users.length;
        this.loading = false;
      });
    } else if (this.type === 'course') {
      this.courseService.search(this.query).subscribe((courses: Course[]) => {
        this.courses = courses;
        this.courses.forEach((course) => {
          if (course.description.length > 400) {
            course.description = course.description.slice(0, 350) + '...';
          }
          this.courseService.getCourseImageId(course._id).subscribe((res) => {
            course.img =
              res === '' || res === null
                ? ''
                : `https://uimpactify.herokuapp.com/api/course/documents/${res}`;
          });
        });
        this.results = this.courses.length;
        this.loading = false;
      });
    }
  }

  onClick(route: string) {
    this.router.navigate([route]);
  }
}
