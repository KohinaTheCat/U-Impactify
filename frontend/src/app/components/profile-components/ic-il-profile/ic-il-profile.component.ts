import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ic-il-profile',
  templateUrl: './ic-il-profile.component.html',
  styleUrls: ['./ic-il-profile.component.css']
})
export class IcIlProfileComponent implements OnInit {
  user: User;
  email: String;
  username: String;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.email = this.user.email;
    this.username = this.user.username;
  }
}
