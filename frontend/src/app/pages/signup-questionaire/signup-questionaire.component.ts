import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-questionaire',
  templateUrl: './signup-questionaire.component.html',
  styleUrls: ['./signup-questionaire.component.css']
})
export class SignupQuestionaireComponent implements OnInit {

  checkbox = [false, false, false, false, false, false, false]
  other:string = "";
  toAdd:string = "";
  toAdd2 = "";
  constructor(private userService : UserService, private router:Router) { }

  log(){
    console.log(this.checkbox[0]);
    console.log(this.checkbox[1]);
    console.log(this.checkbox[2]);
    console.log(this.checkbox[3]);
    console.log(this.checkbox[4]);
    console.log(this.checkbox[5]);
    console.log(this.checkbox[6]);
  }

  onSubmit(){
    if(this.checkbox[0]){
      this.toAdd+="Coach ";
    }
    if(this.checkbox[1]){
      this.toAdd+="Teacher ";
    }
    if(this.checkbox[2]){
      this.toAdd+="Facilitator ";
    }
    if(this.checkbox[3]){
      this.toAdd+=this.other + " ";
    }
    if(this.checkbox[4]){
      this.toAdd2+="Conduct Lessons Live "
    }
    if(this.checkbox[5]){
      this.toAdd2+="Handle Administrative Tasks "
    }
    if(this.checkbox[6]){
      this.toAdd2+="Plan my lessons and sessions "
    }
    //for testing
    const user = {username: "test102", password: "******", email: "test102.patel@hotmail.com", type: "IL", questionaire: [this.toAdd, this.toAdd2]};
    this.userService.postNewUser(user).subscribe();
    // this.userService.getCurrentUser().questionaire[0] = this.toAdd;
  }

  ngOnInit(): void {
  }

}
