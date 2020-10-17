import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormDisplay } from './FormDisplay';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  logged: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}
  // TODO: errorChecking!!!!

  signup: FormDisplay = {
    greeting: 'Create an Account',
    linkPrompt: 'Already have an account?',
    link: 'Login',
    submit: 'Sign Up',
  };

  login: FormDisplay = {
    greeting: 'Welcome Back',
    linkPrompt: "Don't have an account?",
    link: 'Sign Up',
    submit: 'Log In',
  };

  form: FormDisplay = this.signup;

  email: string = '';
  username: string = '';
  password: string = '';

  onToggle() {
    this.logged = !this.logged;
    this.form = this.logged ? this.login : this.signup;
  }

  onSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      type: 'IL', //change this
    };
    if (!this.logged) {
      this.userService.postNewUser(user).subscribe(
        (res) => {
          this.location.go(this.location.path()),
            this.router.navigate(['/user/' + res.id], {
              skipLocationChange: true,
            });
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.userService.loginUser(this.email, this.password).subscribe(res => {
          if (res === false) {
            // couldn't match the email with password
            console.log("incorrect password")
          } else {
            // user logged in, navigate to page, changed below
            this.location.go(this.location.path()),
            this.router.navigate(['/createcourse/'], {

            // this.router.navigate(['/user/' + this.email], {
              skipLocationChange: true,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngOnInit(): void {}
}
