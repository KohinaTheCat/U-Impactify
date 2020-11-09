import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giving-garden',
  templateUrl: './giving-garden.component.html',
  styleUrls: ['./giving-garden.component.css']
})
export class GivingGardenComponent implements OnInit {
  opened: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  donate(){
    this.opened = !this.opened;
  }

}
