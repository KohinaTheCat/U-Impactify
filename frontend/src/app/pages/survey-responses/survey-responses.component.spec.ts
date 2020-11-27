import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResponsesComponent } from './survey-responses.component';

describe('SurveyResponsesComponent', () => {
  let component: SurveyResponsesComponent;
  let fixture: ComponentFixture<SurveyResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyResponsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
