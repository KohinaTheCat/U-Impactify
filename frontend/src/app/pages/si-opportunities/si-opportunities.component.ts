import { Component, OnInit } from '@angular/core';

/* Mock for BOUN-114 */
export interface Opportunity {
  _id: string;
  name: string;
  description: string;
  location: string;
  positionType: string;
  datePosted: Date;
  dateNeeded: Date;
  salary?: number;
  numberOfHires: number;
  responsibilites: string[];
  requirements: string[];
}

/* MOCK FOR BOUN-114 */
export enum positionTypes {
  TEMPORARY = 'temporary',
  PERMANENT = 'permanent',
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

  ngOnInit(): void {
    this.employments = this.createMockOpportunities(2);
    this.volunteers = this.createMockOpportunities(3);
  }

  onNewOpportunity(): void {

  }

  /* MOCK FOR BOUN-114 */
  createMockOpportunities(i: number): Opportunity[] {
    return Array.from(Array(i), (v, k) => {
      const opp: Opportunity = {
        _id: `Opp${k++}`,
        name: `Help Out ${k++}`,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero aut placeat repellat amet asperiores vero in a perspiciatis doloribus cum! Commodi molestiae perferendis voluptas id ex provident dolorem nisi laudantium. Tenetur est soluta cum repudiandae ea corrupti voluptatum facilis perspiciatis a magnam ex iste fugit voluptatem eaque, molestiae accusantium hic laboriosam alias. Accusantium iure eaque odio voluptatibus consequatur. Harum, est? Sit et harum ipsa fugit ex? Quos iusto repudiandae porro amet, odit nihil totam. Repellat odio distinctio ex cumque autem, facilis est itaque amet qui ad aut? Harum, ipsam omnis. Ratione totam ipsum dicta ea soluta exercitationem blanditiis qui eum quia deleniti sapiente excepturi provident accusamus, obcaecati accusantium, eos pariatur harum suscipit reiciendis? Cupiditate aliquid aut fugit laboriosam, molestiae distinctio.',
        location: 'Toronto, ON',
        positionType: !(k % 2)
          ? positionTypes.PERMANENT
          : positionTypes.TEMPORARY,
        datePosted: new Date(),
        dateNeeded: new Date(Date.now() + 10000000000),
        salary: 19.25,
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
      };
      return opp;
    });
  }
}
