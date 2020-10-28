import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-global-profile',
  templateUrl: './global-profile.component.html',
  styleUrls: ['./global-profile.component.css'],
})
export class GlobalProfileComponent implements OnInit {
  email: String;
  username: String;

  global: String;
  valid: Boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.global = this.route.snapshot.paramMap.get('username');
  }

  ngOnInit(): void {
    this.userService.getAnotherUser(this.global).subscribe(
      (res) => {
        this.email = res.email;
        this.username = res._id;
      },
      (err) => {
        this.valid = false;
        console.log(err);
      }
    );
  }
}
