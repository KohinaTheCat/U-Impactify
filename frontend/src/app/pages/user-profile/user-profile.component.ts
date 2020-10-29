import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  err: string; // `backend/routes/user.js`
  sameUser: boolean;
  username: string;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    if ((this.sameUser = this.user._id !== this.username)) {
      this.userService.getAnotherUser(this.username).subscribe(
        (res) => (this.user = res),
        (err) => (this.err = err)
      );
    }
  }
}
