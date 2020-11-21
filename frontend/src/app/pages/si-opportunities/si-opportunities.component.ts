import { Component, OnInit } from '@angular/core';

/* Mock for BOUN-114 */
export interface Opportunity {
  _id?: string;
  name: string;
  description: string;
  location: string;
  datePosted: Date;
  dateNeeded: Date;
  salary?: number;
  numberOfHires: number;
  responsibilites: string[];
  requirements: string[];
  applicants?: string[];
}

@Component({
  selector: 'app-si-opportunities',
  templateUrl: './si-opportunities.component.html',
  styleUrls: ['./si-opportunities.component.css'],
})
export class SiOpportunitiesComponent implements OnInit {
  constructor() {}

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
    this.showNewOpportunity = false; // change
    this.opportunityType = ''; // change
    this.clearInput();
    this.employments = this.createMockOpportunities(2, true);
    this.volunteers = this.createMockOpportunities(3);
    this.loading = false;
  }

  ngDoCheck() {
    if (this.showNewOpportunity) {
      this.newOpportunity = {
        name: this.name,
        description: this.description,
        location: this.location,
        datePosted: this.datePosted,
        dateNeeded: this.dateNeeded,
        salary: this.salary,
        numberOfHires: this.numberOfHires,
        responsibilites: this.responsibilites.split('\n'),
        requirements: this.requirements.split('\n'),
      };

      if(this.opportunityType === 'volunteer') {
        // 6th value is salary, sketchy fix 
        this.shouldShowSubmitButton =
          Object.values(this.newOpportunity).every((o, i) => !!o || i === 5) &&
          this.numberOfHires > 0;
      } else if(this.opportunityType === 'employment') {
        this.shouldShowSubmitButton = Object.values(this.newOpportunity).every(o => !!o) && this.salary > 0 && this.numberOfHires > 0;
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
    console.log(this.newOpportunity);
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

  /* MOCK FOR BOUN-114 */
  createMockOpportunities(i: number, salary: boolean = false): Opportunity[] {
    return Array.from(Array(i), (v, k) => {
      const opp: Opportunity = {
        _id: `Opp${k++}`,
        name: `Help Out ${k++}`,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aut placeat repellat amet asperiores vero in a perspiciatis doloribus cum! Commodi molestiae perferendis voluptas id ex provident dolorem nisi laudantium. Tenetur est soluta cum repudiandae ea corrupti voluptatum facilis perspiciatis a magnam ex iste fugit voluptatem eaque, molestiae accusantium hic laboriosam alias. Accusantium iure eaque odio voluptatibus consequatur. Harum, est? Sit et harum ipsa fugit ex? Quos iusto repudiandae porro amet, odit nihil totam. Repellat odio distinctio ex cumque autem, facilis est itaque amet qui ad aut? Harum, ipsam omnis. Ratione totam ipsum dicta ea soluta exercitationem blanditiis qui eum quia deleniti sapiente excepturi provident accusamus, obcaecati accusantium, eos pariatur harum suscipit reiciendis? Cupiditate aliquid aut fugit laboriosam, molestiae distinctio.',
        location: 'Toronto, ON',
        datePosted: new Date(),
        dateNeeded: new Date(Date.now() + 10000000000),
        numberOfHires: Math.floor(Math.random() * 10 + 1),
        responsibilites: [
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Dolores pariatur et, eligendi dicta, quia eos praesentium odit adipisci animi, dolore ad est?',
          'Assumenda id laudantium magnam quos recusandae quas accusamus?',
          'Fugiat odio earum nihil repellat repellendus recusandae ut iste laborum, tempora molestias explicabo minus quaerat ea sapiente obcaecati magnam atque esse veritatis quia vitae amet fugit quibusdam velit.',
          'Veritatis, a.',
          'Non ad fugit illo soluta laudantium.',
        ],
        requirements: [
          'Corrupti vero nulla consectetur amet saepe illum molestiae iste voluptates quaerat perferendis dicta quidem laudantium, veritatis est facilis odit natus illo nihil nobis atque.',
          'Natus totam molestias accusamus id, rem deserunt quaerat? ',
          'Exercitationem natus repudiandae debitis consequatur soluta cum mollitia at? Dolorum dolorem laboriosam illo maxime animi illum quidem fugiat dolor harum?',
          'Dolorem, cum.',
        ],
        applicants: ['user1', 'user2', 'user2', 'user3', 'user4', 'user5'],
      };
      if (salary) opp.salary = 19.25;
      return opp;
    });
  }
}
