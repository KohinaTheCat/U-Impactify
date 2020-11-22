import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Opportunity } from './../../models/opportunity.model';

@Component({
  selector: 'app-opportunity-accordian-card',
  templateUrl: './opportunity-accordian-card.component.html',
  styleUrls: ['./opportunity-accordian-card.component.css']
})
export class OpportunityAccordianCardComponent implements OnInit {

  @Input()
  opportunity: Opportunity;

  @Input()
  type: string;

  user: User;

  open: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

}
