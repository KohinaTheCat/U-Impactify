import { Component, OnInit } from '@angular/core';
import { FormDisplay } from './FormDisplay';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  email: string = "";
  username: string = "";
  password: string ="";

  constructor() {}

  ngOnInit(): void {}
}
