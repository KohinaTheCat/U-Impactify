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

  constructor(private userService: UserService, private router: Router) {}

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
  credit: number = 1000;

  onToggle() {
    this.logged = !this.logged;
    this.form = this.logged ? this.login : this.signup;
  }

  loginHandler(user: any) {
    this.userService.loginUser(user.email, user.password).subscribe(
      (res) => {
        if (res === false) {
          console.log('incorrect password');
          this.error = "Error: Invalid Password"
        } else {
          this.userService.setUser(<User>res);
          this.router.navigate(['dashboard']);
        }
      },
      (err) => {
        console.log(err.error)
        this.error = err.error;
      }
    );
  }

  registerHandler(user: any) {
    if (!user.type) return;
    // logs student in
    this.userService.postNewUser(user).subscribe(
      (res) => {
        this.userService.setUser(res);
        console.log('Register success!');
        console.log('Navigating to questionaire');
        if (user.type === 'IC') {
          this.router.navigate(['questionaire']);
        } else if (user.type === 'SI') {
          this.router.navigate(['questionaire2']);
        } else {
          this.router.navigate(['dashboard']);
        }
      },
      (err) => {
        console.log(err.error.message);
        this.error = err.error.message;
        if (err.error.message === undefined){
          this.error = "Error : Email address already registered"
        }
        return;
      }
    );
  }

  onSubmit() {
    const user = {
      _id: this.username,
      email: this.email,
      password: this.password,
      type: this.type,
      //made it so user starts with $1000, can change depending on implementation
      //of giving garden
      credit: this.credit,
    };
    if (!this.logged) {
      this.registerHandler(user);
    } else {
      this.loginHandler(user);
    }
  }

  ngOnInit(): void {
    if (!!this.userService.getCurrentUser()) {
      this.router.navigate(['dashboard']);
    }
  }
}
