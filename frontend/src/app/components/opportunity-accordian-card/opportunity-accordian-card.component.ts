import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output()
  onApply: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onApproveHire: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDelete: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onEdit: EventEmitter<Opportunity> = new EventEmitter<Opportunity>();

  user: User;

  open: boolean = false;
  shouldOpenApproveHire: boolean = false;
  shouldShowDelete: boolean = false;

  toBeHired: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  onClickApply(): void {
    this.onApply.emit(this.opportunity._id);
  }

  onSelectHire(applicant: string): void {
    if(this.toBeHired.includes(applicant)) this.toBeHired = this.toBeHired.filter(app => app !== applicant);
    else this.toBeHired.push(applicant);
  }

  onClickApproveHire(): void {
    this.onApproveHire.emit({
      opportunityId: this.opportunity._id,
      opportunityName: this.opportunity.name,
      toBeHired: this.toBeHired,
    });
  }

  onClickEdit(): void {
    this.onEdit.emit(this.opportunity);
  }

  onClickDelete(): void {
    this.onDelete.emit(this.opportunity._id);
    this.shouldShowDelete = false;
  }

}
