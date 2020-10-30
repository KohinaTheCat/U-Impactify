import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ic-il-profile',
  templateUrl: './ic-il-profile.component.html',
  styleUrls: ['./ic-il-profile.component.css'],
})
export class IcIlProfileComponent implements OnInit {
  user: User;
  email: String;
  username: String;

  global: String;
  observing: {};


  constructor(private userService: UserService, private route: ActivatedRoute) {
    // this.global = this.route.snapshot.paramMap.get('username');
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.email = this.user.email;
    this.username = this.user._id;
  }
}
