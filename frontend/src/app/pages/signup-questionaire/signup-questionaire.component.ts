import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-questionaire',
  templateUrl: './signup-questionaire.component.html',
  styleUrls: ['./signup-questionaire.component.css'],
})
export class SignupQuestionaireComponent implements OnInit {
  checkbox = new Array() as boolean[];
  other: string = '';
  error: string = '';
  checked: boolean = false;
  skipped: boolean = false;
  array: string[][] = [[], []];
  submit: boolean = false;
  
  constructor(private userService: UserService, private router: Router) {
    for (let i = 0; i < 7; i++) {
      this.checkbox[i] = false;
    }
  }

  onSubmit() {
    this.submit = true;
    for (let i = 0; i < 7; i++) {
      if (this.checkbox[i]) {
        this.checked = true;
      }
    }
    if (this.checked) {
      if (this.checkbox[0]) {
        this.array[0].push('Coach');
      }
      if (this.checkbox[1]) {
        this.array[0].push('Teacher');
      }
      if (this.checkbox[2]) {
        this.array[0].push('Facilitator');
      }
      if (this.checkbox[3]) {
        this.array[0].push(this.other);
      }
      if (this.checkbox[4]) {
        this.array[1].push('Conduct Lessons Live');
      }
      if (this.checkbox[5]) {
        this.array[1].push('Handle Administrative Tasks');
      }
      if (this.checkbox[6]) {
        this.array[1].push('Plan my lessons and sessions');
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
