import { Component, Input, OnInit } from '@angular/core';
import { Opportunity } from 'src/app/pages/si-opportunities/si-opportunities.component';

@Component({
  selector: 'app-opportunity-accordian-card',
  templateUrl: './opportunity-accordian-card.component.html',
  styleUrls: ['./opportunity-accordian-card.component.css']
})
export class OpportunityAccordianCardComponent implements OnInit {

  @Input()
  opportunity: Opportunity;

  open: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
