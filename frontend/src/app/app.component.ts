import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private userService: UserService) {}

  /**
   * Determines if navbar should appear
   */
  isLoggedIn = (): Boolean => {
    return !!this.userService.getCurrentUser() && this.router.url !== '/signup' && this.router.url !== '/questionaire' && this.router.url !== '/questionaire2';
  };
}
