import { Component, OnInit } from '@angular/core';
import { Opportunity } from 'src/app/models/opportunity.model';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-si-opportunities',
  templateUrl: './si-opportunities.component.html',
  styleUrls: ['./si-opportunities.component.css'],
})
export class SiOpportunitiesComponent implements OnInit {
  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {}

  user: User;
  volunteers: Opportunity[];
  employments: Opportunity[];
  loading: boolean = true;
  showNewOpportunity: boolean = false;
  opportunityType: string;

  newOpportunity: Opportunity;

  editOpportunityId: string;

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
    this.showNewOpportunity = false;
    this.opportunityType = '';
    this.clearInput();
    this.userService.getEmploymentOpportunity().subscribe((opp) => {
      this.employments = opp;
      this.userService.getVolunteerOpportunity().subscribe((opp) => {
        this.volunteers = opp;
        this.loading = false;
      });
    });
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
        responsibilites: this.responsibilites
          .split('\n')
          .filter((s) => !!s.trim().length && s !== '\n'),
        requirements: this.requirements
          .split('\n')
          .filter((s) => s.trim() !== '' && s.trim() !== '\n'),
        applicants: [],
      };

      this.shouldShowSubmitButton =
        !!this.name &&
        !!this.description &&
        !!this.location &&
        this.dateNeeded &&
        (this.opportunityType === 'employment' ? this.salary > 0 : true) &&
        this.numberOfHires > 0 &&
        !!this.responsibilites.length &&
        !!this.requirements.length;
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
    if (this.editOpportunityId) {
      this.newOpportunity._id = this.editOpportunityId;
      this.userService.updateOpportunity(this.newOpportunity).subscribe(
        (res) => {
          this.ngOnInit();
        },
        (err) => console.log(err)
      );
    } else {
      this.userService.createNewOpportunity(this.newOpportunity).subscribe(
        (res) => {
          if (this.newOpportunity.type === 'volunteer') {
            this.userService
              .addNewVolunteerOpportunity(this.user._id, res._id)
              .subscribe((user: User) => {
                this.userService.setUser(user);
                this.ngOnInit();
              });
          } else if (this.newOpportunity.type === 'employment') {
            this.userService
              .addNewEmploymentOpportunity(this.user._id, res._id)
              .subscribe((user: User) => {
                this.userService.setUser(user);
                this.ngOnInit();
              });
          }
        },
        (err) => console.log(err)
      );
    }
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
    this.opportunityType = '';
    this.requirements = '';
    this.editOpportunityId = '';
    this.newOpportunity = null;
  }

  setInput(opportunity: Opportunity): void {
    const {
      _id,
      name,
      description,
      location,
      datePosted,
      dateNeeded,
      salary,
      numberOfHires,
      responsibilites,
      type,
      requirements,
    } = opportunity;
    this.editOpportunityId = _id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.datePosted = new Date(datePosted);
    this.dateNeeded = new Date(dateNeeded);
    this.salary = salary;
    this.numberOfHires = numberOfHires;
    this.opportunityType = type;
    this.responsibilites = responsibilites.join('\n');
    this.requirements = requirements.join('\n');
  }

  onApply(opportunityId: string) {
    this.userService
      .applyOpportunity(opportunityId, this.user._id)
      .subscribe((res) => this.ngOnInit());
  }

  onApproveHire(req: any) {
    const { toBeHired, opportunityName, opportunityId } = req;
    const approveMessage = {
      from: this.user._id,
      time: new Date(),
      body: `Congrats! You have been selected for '${opportunityName}' with ${this.user._id}! To further discuss your position, when you will be starting, and how to get started, feel free to email us, or just reply to this message, and we will be happy to help. Thank you very much.`,
    };
    toBeHired.forEach((id: string) => {
      this.chatService.findChat(this.user._id, id).subscribe(
        (chat) => {
          this.chatService.sendMessage(approveMessage, chat._id);
        },
        (err) => {
          // CASE chat is not found
          if (err) {
            this.chatService
              .postNewChat(this.user._id, id)
              .subscribe((chat) => {
                this.userService
                  .addChat(this.user._id, chat._id)
                  .subscribe((res) => {
                    this.userService.setUser(res);
                    this.userService.addChat(id, chat._id).subscribe((res) => {
                      this.chatService.sendMessage(approveMessage, chat._id);
                    });
                  });
              });
          }
        }
      );
    });
    this.onDelete(opportunityId);
  }

  onDelete(opportunityId: string) {
    this.userService
      .removeOpportunity(this.user._id, opportunityId)
      .subscribe((res) => {
        this.userService.setUser(res);
        this.userService.deleteOpportunity(opportunityId).subscribe((res) => {
          this.ngOnInit();
        });
      });
  }

  onEdit(opportunity: Opportunity) {
    this.newOpportunity = opportunity;
    this.setInput(opportunity);
    this.onNewOpportunity(opportunity.type);
  }
}
