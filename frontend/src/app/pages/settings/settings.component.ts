import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  opened: boolean = false;
  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  onPressDelete(): void {
    this.opened = false;
    this.userService.deleteUser(this.user._id).subscribe(
      (res) => {
        console.log("Deleted User Successfully")
        this.userService.setUser(res)
        this.router.navigate([''])
      },
      (err) => console.log(err)
    );
  }
}
