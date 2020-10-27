import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User;
  name: String = '';
  username: String;
  email: String;
  number: String = '';

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.username = this.user._id;
    this.email = this.user.email;
  }
}
