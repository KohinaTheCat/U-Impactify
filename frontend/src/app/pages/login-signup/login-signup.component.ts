import { LoginServiceService } from './../../services/login-service.service';
import { SignupService } from './../../services/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormDisplay } from './FormDisplay';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  logged: boolean = false;

  constructor(
    private signupService: SignupService,
    private loginServiceService: LoginServiceService
  ) {}
  // usage: this.signupService.postNewUser

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

  ngOnInit(): void {}
}
