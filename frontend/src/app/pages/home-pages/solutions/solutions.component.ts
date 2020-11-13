import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css'],
})
export class SolutionsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isStudent: boolean = true;

  onPress(): void {
    this.router.navigateByUrl('/signup');
  }
}
