import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.global = this.route.snapshot.paramMap.get('username');
  }

  ngOnInit(): void {
    console.log(this.global);
    this.userService.getAnotherUser(this.global).subscribe(
      (res) => {
        this.email = res.email;
        this.username = res.username;
      },
      (err) => {
        this.valid = false;
        console.log(err);
      }
    );
  }
}
