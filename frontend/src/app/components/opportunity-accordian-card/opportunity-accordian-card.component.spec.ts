import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityAccordianCardComponent } from './opportunity-accordian-card.component';

describe('OpportunityAccordianCardComponent', () => {
  let component: OpportunityAccordianCardComponent;
  let fixture: ComponentFixture<OpportunityAccordianCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityAccordianCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityAccordianCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
