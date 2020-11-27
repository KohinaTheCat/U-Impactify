import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubmissionComponent } from './student-submission.component';

describe('StudentSubmissionComponent', () => {
  let component: StudentSubmissionComponent;
  let fixture: ComponentFixture<StudentSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
