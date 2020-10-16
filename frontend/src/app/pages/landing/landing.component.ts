import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  id: String = ""

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
  }

}
