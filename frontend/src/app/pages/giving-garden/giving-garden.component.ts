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
  si_imgs: [any] = [''];
  error: string = '';
  amount: number;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllSI().subscribe((res) => {
      this.si = res;
      this.si_imgs = res.map((s) => s.img === '' || s.img === undefined ? '' : `https://uimpactify.herokuapp.com/api/user/documents/${s.img}`);
      console.log(this.si_imgs);
    });
  }

  donate() {
    this.opened = !this.opened;
  }

  learnMore(id): void {
    this.router.navigate([`user/${id}`]);
  }

  onOkay(){
    const user = this.userService.getCurrentUser();
    console.log(this.amount);
    this.amount = (-1)*this.amount;
    this.userService.updateCredit(user._id, this.amount).subscribe(
      (res) => {
        this.userService.setUser(res);
      },
      (err) => {
        this.error = err.message;
        console.log(err);
      }
    );
  }
}
