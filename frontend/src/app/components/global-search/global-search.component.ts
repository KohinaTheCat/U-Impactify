import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css'],
})
export class GlobalSearchComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  title: String = '';

  ngOnInit(): void {
    this.title =
      location.pathname === '/' ?  'Dashboard': location.pathname.substring(1);
  }

  ngOnChanges(): void {
    this.title =
      location.pathname === '/' ?  'Dashboard': location.pathname.substring(1);
  }

  logOut(): void {
    this.userService.setUser(null);
    this.router.navigate(['signup']);
  }

  goToProfile(): void{
    this.router.navigate(['profile']);
  }
}
