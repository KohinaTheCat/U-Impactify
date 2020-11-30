import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class TypeGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routes = {
      IL: [
        '/assessments',
        '/lectures/',
        '/enroll',
        '/socialinitiatives',
        '/course',
      ],
      IC: [
        '/assessments',
        '/lectures/',
        '/create',
        '/opportunities',
        '/course',
        '/socialinitiatives',
        '/surveyresponses/',
        '/edit',
      ],
      SI: ['/opportunities'],
    };
    const user: User = this.userService.getCurrentUser();
    // check if usertype allowed route
    let isAllowed = routes[user.type].some((route: string) =>
      state.url.includes(route)
    );

    if (isAllowed && state.url.includes('/assessments')) {
      // check case assessments
      isAllowed = (user.type === 'IL'
        ? user.classesEnrolled
        : user.classesTeaching
      ).some((course: any) => state.url.includes(course._id));
    }

    if (isAllowed && state.url.includes('studentSubmissions')) {
      isAllowed = (user.type === 'IL' && state.url.includes(user._id)
        ? user.classesEnrolled
        : user.classesTeaching
        ).some((course: any) => state.url.includes(course._id));
    }

    if(isAllowed && state.url.includes('/edit')) {
      isAllowed = user.type === 'IC' && user.classesTeaching.some((course: any) => state.url.includes(course._id));
    }

    // check if route is just '/course'
    if (state.url === '/course') {
      isAllowed = user.type !== 'SI';
    }

    if (!isAllowed) this.router.navigateByUrl('/about');
    return isAllowed;
  }
}
