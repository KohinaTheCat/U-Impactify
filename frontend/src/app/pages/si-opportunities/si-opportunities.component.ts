import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/models/user.model';

export interface Opportunity {
  recruiter: string;
  name: string;
  description: string;
  type: string;
  location: string;
  datePosted: Date;
  dateNeeded: Date;
  salary: number;
  numberOfHires: number;
  responsibilites: string[];
  requirements: string[];
  applicants: string[];
}

@Component({
  selector: 'app-si-opportunities',
  templateUrl: './si-opportunities.component.html',
  styleUrls: ['./si-opportunities.component.css'],
})
export class SiOpportunitiesComponent implements OnInit {
  constructor(private userService: UserService) {}

  user: User;
  volunteers: Opportunity[];
  employments: Opportunity[];
  loading: boolean = true;
  showNewOpportunity: boolean = false;
  opportunityType: string;

  newOpportunity: Opportunity;

  name: string = '';
  description: string = '';
  location: string = '';
  datePosted: Date = new Date();
  dateNeeded: Date;
  salary: number = 0;
  numberOfHires: number = 1;
  responsibilites: string = '';
  requirements: string = '';

  shouldShowSubmitButton: boolean = false;

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.showNewOpportunity = false; // change
    this.opportunityType = ''; // change
    this.clearInput();
    this.userService.getEmploymentOpportunity().subscribe((opp) => {
      this.employments = opp;
    });
    this.userService.getVolunteerOpportunity().subscribe((opp) => {
      this.volunteers = opp;
    });
    this.loading = false;
  }

  ngDoCheck() {
    if (this.showNewOpportunity) {
      this.newOpportunity = {
        recruiter: this.user._id,
        name: this.name,
        description: this.description,
        type: this.opportunityType,
        location: this.location,
        datePosted: this.datePosted,
        dateNeeded: this.dateNeeded,
        salary: this.salary,
        numberOfHires: this.numberOfHires,
        responsibilites: this.responsibilites.split('\n'),
        requirements: this.requirements.split('\n'),
        applicants: [],
      };

      if (this.opportunityType === 'volunteer') {
        // 8th value is salary, sketchy fix
        this.shouldShowSubmitButton =
          Object.values(this.newOpportunity).every((o, i) => !!o || i === 7) &&
          this.numberOfHires > 0;
      } else if (this.opportunityType === 'employment') {
        this.shouldShowSubmitButton =
          Object.values(this.newOpportunity).every((o) => !!o) &&
          this.salary > 0 &&
          this.numberOfHires > 0;
      }
    }
  }

  onNewOpportunity(isEmployment: string): void {
    this.opportunityType = isEmployment;
    this.showNewOpportunity = true;
  }

  onReturn(): void {
    this.ngOnInit();
  }

  onSubmit(): void {
    this.userService.createNewOpportunity(this.newOpportunity).subscribe(
      (res) => {
        if (this.newOpportunity.type === 'volunteer') {
          this.userService
            .addNewVolunteerOpportunity(this.user._id, res._id)
            .subscribe();
        } else if (this.newOpportunity.type === 'employment') {
          this.userService
            .addNewEmploymentOpportunity(this.user._id, res._id)
            .subscribe();
        }
        this.ngOnInit();
      },
      (err) => console.log(err)
    );
    this.ngOnInit();
  }

  clearInput(): void {
    this.name = '';
    this.description = '';
    this.location = '';
    this.datePosted = new Date();
    this.dateNeeded = null;
    this.salary = 0;
    this.numberOfHires = 1;
    this.responsibilites = '';
    this.requirements = '';
  }
}
