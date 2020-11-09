import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css'],
})
export class GlobalSearchComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        switch (event.url) {
          case '/':
            this.title = 'Dashboard';
            break;
          case '/socialinitiatives':
            this.title = 'Social Initiatives';
            break;
          default:
            this.title = event.url.substring(1).split('/')[0];
            break;
        }
      });
  }

  title: String = '';
  searchQuery: String = '';
  isFocused: boolean = false;

  ngOnInit(): void {
    this.title =
      location.pathname === '/'
        ? 'Dashboard'
        : location.pathname.substring(1).split('/')[0];
  }

  logOut(): void {
    this.userService.setUser(null);
    this.router.navigate(['signup']);
  }

  goToProfile(): void {
    this.router.navigate([`user/${this.userService.getCurrentUser()._id}`]);
  }

  onPressSearch(type: string): void {
    this.router.navigate([
      `search/${type}/${encodeURI(this.searchQuery.trim() as string)}`,
    ]);
    this.searchQuery = '';
  }
}
