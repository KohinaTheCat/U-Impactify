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
    if (!this.user) {
      /** 
       * TODO: Delete this after URL has been implemented
       * just a dummy user  
       */
      this.user = {
        _id: 'dummyUserID',
        password: '1234',
        email: 'dummy@mail.utoronto.ca',
        type: 'IL',
        classesEnrolled: [],
        classesTeaching: [],
        questionaire: [[]],
        socialInitiative: {},
      };
    }
    this.username = this.user._id;
    this.email = this.user.email;
  }
}
