import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from './../../services/user.service';
import { FormDisplay } from './FormDisplay';

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
    img: '../../assets/login-signup/signup.svg',
    slogan: 'join the movement, change the world',
  };

  login: FormDisplay = {
    greeting: 'Welcome Back',
    linkPrompt: "Don't have an account?",
    link: 'Sign Up',
    submit: 'Log In',
    img: '../../assets/login-signup/login.svg',
    slogan: 'a system you can rely on',
  };

  form: FormDisplay = this.signup;

  email: string = '';
  username: string = '';
  password: string = '';
  type: string = '';
  error: string = '';

  onToggle() {
    this.logged = !this.logged;
    this.form = this.logged ? this.login : this.signup;
  }

  loginHandler(user: any) {
    this.userService.loginUser(this.email, this.password).subscribe(
      (res) => {
        if (res === false) {
          console.log('incorrect password');
        } else {
          this.userService.setUser(<User>res);
          this.router.navigate(['dashboard']);
        }
      },
      (err) => {
        this.error = err.message;
        console.log(err);
      }
    );
  }

  registerHandler(user: any) {
    this.userService.postNewUser(user).subscribe(
      (res) => {
        this.userService.setUser(<User>res);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        this.error = err.message;
        console.log(err);
      }
    );
  }

  onSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      type: this.type, //change this
    };
    if (!this.logged) {
      this.registerHandler(user);
    } else {
      this.loginHandler(user);
    }
  }

  ngOnInit(): void {
    if(!!this.userService.getCurrentUser()) {
      this.router.navigate(['dashboard']);
    }
  }
}
