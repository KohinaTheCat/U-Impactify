import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupQuestionaireComponent } from './signup-questionaire.component';

describe('SignupQuestionaireComponent', () => {
  let component: SignupQuestionaireComponent;
  let fixture: ComponentFixture<SignupQuestionaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupQuestionaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupQuestionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
