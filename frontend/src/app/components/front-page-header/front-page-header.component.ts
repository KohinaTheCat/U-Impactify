import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-front-page-header',
  templateUrl: './front-page-header.component.html',
  styleUrls: ['./front-page-header.component.css'],
})
export class FrontPageHeaderComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  user: User;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  shouldShow(): Boolean {
    return this.router.url !== '/signup';
  }

  navigate(): void {
    this.router.navigate(['signup']);
  }
}
