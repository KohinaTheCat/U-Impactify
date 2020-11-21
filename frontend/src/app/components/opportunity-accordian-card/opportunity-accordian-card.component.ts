import { Component, Input, OnInit } from '@angular/core';
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

  open: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
