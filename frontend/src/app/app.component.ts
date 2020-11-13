import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User;

  constructor(private router: Router, private userService: UserService) {}

  /**
   * LifeCycle hook of Angular that runs literally after anything happens.
   * Best used for custom change-detection that `ngOnChanges` can't pick up.
   *
   * From my understanding, using this is a bad idea if doing anything intensive. But for our purposes, it's fine.
   * `this.user` in this component is the same reference as the one in the service, so there's no copying or reinstantiation.
   */
  ngDoCheck() {
    this.user = this.userService.getCurrentUser();
  }

  shouldNavShow = (): Boolean => {
    if (this.isHomePages()) return false;
    return (
      !!this.user &&
      this.router.url !== '/signup' &&
      this.router.url !== '/questionaire' &&
      this.router.url !== '/questionaire2'
    );
  };

  shouldHeaderShow(): Boolean {
    return (
      this.router.url !== '/questionaire' &&
      this.router.url !== '/questionaire2' &&
      !this.shouldNavShow()
    );
  }

  shouldFooterShow(): Boolean {
    return this.isHomePages() || (!this.user && this.router.url.includes('user'));
  }

  isHomePages(): Boolean {
    return this.router.url === '/about' ||
    this.router.url === '/solutions' ||
    this.router.url === '/pricing';
  }
}
