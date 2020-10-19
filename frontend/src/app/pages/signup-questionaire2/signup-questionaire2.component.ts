import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-questionaire2',
  templateUrl: './signup-questionaire2.component.html',
  styleUrls: ['./signup-questionaire2.component.css']
})
export class SignupQuestionaire2Component implements OnInit {

  checkbox = new Array() as boolean[];
  other:string = "";
  other2:string = "";
  other3:string = "";
  toAdd:string = "";
  toAdd2 = "";
  toAdd3:string = "";
  checked:boolean = false;
  constructor(private userService : UserService, private router:Router) {
    for(let i = 0; i < 17; i++){
      this.checkbox[i] = false;
    }
  }

  onSubmit(){
    for(let i = 0; i < 17; i++){
      if(this.checkbox[i]){
        this.checked = true;
      }
    }
    if(this.checked){
      if(this.checkbox[0]){
        this.toAdd+="Social entrepreneurs or intrapreneurs,";
      }
      if(this.checkbox[1]){
        this.toAdd+="Worker at a charity or a non-profit organization,";
      }
      if(this.checkbox[2]){
        this.toAdd+="Individual who wants to learn something new,";
      }
      if(this.checkbox[3]){
        this.toAdd+=this.other + ",";
      }
      if(this.checkbox[4]){
        this.toAdd2+="Arts & Culture,"
      }
      if(this.checkbox[5]){
        this.toAdd2+="Civic and Environmental,"
      }
      if(this.checkbox[6]){
        this.toAdd2+="Education,"
      }
      if(this.checkbox[7]){
        this.toAdd2+="Health Services,"
      }
      if(this.checkbox[8]){
        this.toAdd2+="International Relations and Development,"
      }
      if(this.checkbox[9]){
        this.toAdd2+="Social and Legal Services,"
      }
      if(this.checkbox[10]){
        this.toAdd2+=this.other2 + ",";
      }

      if(this.checkbox[11]){
        this.toAdd3+="Accounting,"
      }
      if(this.checkbox[12]){
        this.toAdd3+="Business,";
      }
      if(this.checkbox[13]){
        this.toAdd3+="Communication,";
      }
      if(this.checkbox[14]){
        this.toAdd3+="Design,";
      }
      if(this.checkbox[15]){
        this.toAdd3+="Finance,";
      }
      if(this.checkbox[16]){
        this.toAdd3+="Project Management,";
      }
      if(this.checkbox[17]){
        this.toAdd3+=this.other3+",";
      }
      //for testing
      //const user = {username: "test108", password: "******", email: "test108.patel@hotmail.com", type: "IL", questionaire: [this.toAdd, this.toAdd2, this.toAdd3]};
      //this.userService.postNewUser(user).subscribe();
      this.router.navigate(['dashboard']);
    }
  }

  onSkip(){
    this.router.navigate(['dashboard']);
  }

  ngOnInit(): void {
  }

}
