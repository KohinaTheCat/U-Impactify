import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giving-garden',
  templateUrl: './giving-garden.component.html',
  styleUrls: ['./giving-garden.component.css'],
})
export class GivingGardenComponent implements OnInit {
  opened: Boolean = false;
  si: [any] = [''];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllSI().subscribe((res) => {
      this.si = res;
      console.log(this.si);
    });
  }

  donate() {
    this.opened = !this.opened;
  }

  learnMore(id): void {
    this.router.navigate([`user/${id}`]);
  }
}
