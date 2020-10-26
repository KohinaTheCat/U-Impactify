import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-si-profile',
  templateUrl: './si-profile.component.html',
  styleUrls: ['./si-profile.component.css'],
})
export class SiProfileComponent implements OnInit {
  user: User;
  socialInit = {
    createdProfile: false,
    registeredNumber: String,
    businessNUmber: String,
    location: String,
    hours: String,
    phone: String,
    email: String,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.user.socialInitiative = this.socialInit;
  }
}
