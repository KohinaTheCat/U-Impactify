import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-questionaire',
  templateUrl: './signup-questionaire.component.html',
  styleUrls: ['./signup-questionaire.component.css']
})
export class SignupQuestionaireComponent implements OnInit {
  checkbox = new Array() as boolean[];
  other:string = "";
  toAdd:string = "";
  toAdd2 = "";
  checked:boolean = false;
  constructor(private userService : UserService, private router:Router) {
    for(let i = 0; i < 7; i++){
      this.checkbox[i] = false;
    }
  }

  onSubmit(){
    for(let i = 0; i < 7; i++){
      if(this.checkbox[i]){
        this.checked = true;
      }
    }
    if(this.checked){
      if(this.checkbox[0]){
        this.toAdd+="Coach,";
      }
      if(this.checkbox[1]){
        this.toAdd+="Teacher,";
      }
      if(this.checkbox[2]){
        this.toAdd+="Facilitator,";
      }
      if(this.checkbox[3]){
        this.toAdd+=this.other += ",";
      }
      if(this.checkbox[4]){
        this.toAdd2+="Conduct Lessons Live,"
      }
      if(this.checkbox[5]){
        this.toAdd2+="Handle Administrative Tasks,"
      }
      if(this.checkbox[6]){
        this.toAdd2+="Plan my lessons and sessions,"
      }
      //for testing
      const user = {username: "test103", password: "******", email: "test103.patel@hotmail.com", type: "IL", questionaire: [this.toAdd, this.toAdd2]};
      this.userService.postNewUser(user).subscribe();
    }
  }

  ngOnInit(): void {
  }

}
