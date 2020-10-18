import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {

  constructor() { }

  title: String = "";

  ngOnInit(): void {
    this.title = location.pathname.substring(1);
  }

  ngOnChanges(): void {
    this.title = location.pathname.substring(1);
  }

}
