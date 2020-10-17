import { Component, OnInit } from '@angular/core';
import { FormDisplay } from './FormDisplay';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  logged: boolean = false;

  signup: FormDisplay = {
    greeting: 'Create an Account',
    linkPrompt: 'Already have an account?',
    link: 'Login',
    submit: 'Sign Up',
    img: '../../assets/login-signup/signup.svg',
    slogan: 'join the movement, change the world'
  };

  login: FormDisplay = {
    greeting: 'Welcome Back',
    linkPrompt: "Don't have an account?",
    link: 'Sign Up',
    submit: 'Log In',
    img: '../../assets/login-signup/login.svg',
    slogan: 'a system you can rely on'
  };

  form: FormDisplay = this.signup;

  email: string = '';
  username: string = '';
  password: string = '';
  type: string = '';

  onToggle() {
    this.logged = !this.logged;
    this.form = this.logged ? this.login : this.signup;
  }

  constructor() {}

  ngOnInit(): void {}
}
