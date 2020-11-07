import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { filter } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css'],
})
export class GlobalSearchComponent implements OnInit {
  constructor(private userService: UserService, private router: Router, private chatService: ChatService) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
       this.title =
         event.url === '/'
           ? 'Dashboard'
           : event.url.substring(1).split('/')[0];
      });
  }

  title: String = '';

  ngOnInit(): void {
    this.chatService.sendMessage('yo it worked');
    this.title =
      location.pathname === '/'
        ? 'Dashboard'
        : location.pathname.substring(1).split('/')[0];
  }


  logOut(): void {
    this.userService.setUser(null);
    this.router.navigate(['signup']);
  }

  goToProfile(): void{
    this.router.navigate([`user/${this.userService.getCurrentUser()._id}`]);
  }
}
