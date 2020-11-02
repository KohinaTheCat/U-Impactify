import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-questionaire2',
  templateUrl: './signup-questionaire2.component.html',
  styleUrls: ['./signup-questionaire2.component.css'],
})
export class SignupQuestionaire2Component implements OnInit {
  checkbox = new Array() as boolean[];
  other: string = '';
  other2: string = '';
  other3: string = '';
  error: string = '';
  skipped: boolean = false;
  checked: boolean = false;
  array: string[][] = [[], [], []];
  submit: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    for (let i = 0; i < 17; i++) {
      this.checkbox[i] = false;
    }
  }

  onSubmit() {
    this.submit = true;
    for (let i = 0; i < 17; i++) {
      if (this.checkbox[i]) {
        this.checked = true;
      }
    }
    if (this.checked) {
      if (this.checkbox[0]) {
        this.array[0].push('Social entrepreneurs or intrapreneurs');
      }
      if (this.checkbox[1]) {
        this.array[0].push('Worker at a charity or a non-profit organization');
      }
      if (this.checkbox[2]) {
        this.array[0].push('Individual who wants to learn something new');
      }
      if (this.checkbox[3]) {
        this.array[0].push(this.other);
      }
      if (this.checkbox[4]) {
        this.array[1].push('Arts & Culture');
      }
      if (this.checkbox[5]) {
        this.array[1].push('Civic and Environmental');
      }
      if (this.checkbox[6]) {
        this.array[1].push('Education');
      }
      if (this.checkbox[7]) {
        this.array[1].push('Health Services');
      }
      if (this.checkbox[8]) {
        this.array[1].push('International Relations and Development');
      }
      if (this.checkbox[9]) {
        this.array[1].push('Social and Legal Services');
      }
      if (this.checkbox[10]) {
        this.array[1].push(this.other2);
      }

      if (this.checkbox[11]) {
        this.array[2].push('Accounting');
      }
      if (this.checkbox[12]) {
        this.array[2].push('Business');
      }
      if (this.checkbox[13]) {
        this.array[2].push('Communication');
      }
      if (this.checkbox[14]) {
        this.array[2].push('Design');
      }
      if (this.checkbox[15]) {
        this.array[2].push('Finance');
      }
      if (this.checkbox[16]) {
        this.array[2].push('Project Management');
      }
      if (this.checkbox[17]) {
        this.array[2].push(this.other3);
      }
      this.addToDatabase();
    }
  }

  addToDatabase(): void {
    const user = this.userService.getCurrentUser();
    if (this.skipped){
      this.router.navigate(['dashboard']);
      return;
    } 
    if (!this.skipped) user.questionaire = this.array;
    this.userService.putQuestionaire(user).subscribe(
      (res) => {
        this.userService.setUser(res);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        this.error = err.message;
        console.log(err);
      }
    );
  }

  canDeactivate() {
    if(this.skipped || this.submit){
      return true;
    } else {
      this.userService.setUser(null);
      return false;
    }
  }

  onSkip() {
    this.skipped = true;
    this.addToDatabase();
  }

  ngOnInit(): void {}
}
