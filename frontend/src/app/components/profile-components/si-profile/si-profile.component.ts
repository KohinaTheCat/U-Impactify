import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-si-profile',
  templateUrl: './si-profile.component.html',
  styleUrls: ['./si-profile.component.css'],
})
export class SiProfileComponent implements OnInit {

  @Input()
  searchedUser?: User;

  @Input()
  sameUser?: boolean = false;

  user: User;
  disabled = true;
  basic = false;
  registeredNumber: string;
  businessNumber: string;
  location: string;
  hours: string;
  phone: string;
  email: string;
  opened: boolean = false;
  amount: number;
  socialId: string;
  current: string = 'edit';
  error: string = "";

  items: string[] = ['Item1', 'Item2', 'Item3'];
  vertical = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if(!!this.searchedUser){
      this.user = this.searchedUser;
      this.socialId = this.user._id;
    }
    else {
      this.sameUser = true;
      this.user = this.userService.getCurrentUser();
      this.socialId = this.user._id;
    }
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

  add(): void {
    this.userService
      .addSocialInitiativeProfile(
        this.registeredNumber,
        this.businessNumber,
        this.location,
        this.hours,
        this.phone,
        this.email,
        this.user._id
      )
      .subscribe(
        (res) => {
          this.userService.setUser(res);
          this.user = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  doNotChange(): void {
    const {
      registeredNumber,
      businessNumber,
      location,
      hours,
      phone,
      email,
    } = this.user.socialInitiative;

    this.registeredNumber = registeredNumber;
    this.businessNumber = businessNumber;
    this.location = location;
    this.hours = hours;
    this.phone = phone;
    this.email = email;
  }

  onDonate(){
    this.opened = !this.opened;
  }

  onOkay(){
    if(!this.sameUser){
      const user = this.userService.getCurrentUser();
      this.userService.updateCredit(user._id, (-1)*this.amount).subscribe(
        (res) => {
          this.userService.setUser(res);
        },
        (err) => {
          this.error = err.message;
          console.log(err);
        }
      );
      this.userService.updateCredit(this.searchedUser._id, this.amount).subscribe();
    }
  }
}
