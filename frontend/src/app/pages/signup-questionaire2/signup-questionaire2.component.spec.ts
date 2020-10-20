import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupQuestionaire2Component } from './signup-questionaire2.component';

describe('SignupQuestionaire2Component', () => {
  let component: SignupQuestionaire2Component;
  let fixture: ComponentFixture<SignupQuestionaire2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupQuestionaire2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupQuestionaire2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
