import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-si-profile',
  templateUrl: './si-profile.component.html',
  styleUrls: ['./si-profile.component.css'],
})
export class SiProfileComponent implements OnInit {
  user: User;
  disabled = true;
  basic = false;
  registeredNumber: string;
  businessNumber: string;
  location: string;
  hours: string;
  phone: string;
  email: string;

  current: string = 'edit';

  items: string[] = ['Item1', 'Item2', 'Item3'];
  vertical = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.doNotChange();
  }

  newFunction(): void {
    if (this.disabled === false) {
      this.disabled = true;
      this.current = 'edit';
    } else {
      this.disabled = false;
      this.current = 'save';
    }
  }

  doNotChange(): void {
    this.registeredNumber = 'OriginalNumber';
    this.businessNumber = 'OriginalBusiness';
    this.location = 'OriginalLocation';
    this.hours = 'OriginalHours';
    this.phone = 'OriginalPhone';
    this.email = 'OriginalEmail';
  }
}
