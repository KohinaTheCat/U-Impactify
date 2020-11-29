import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentSubmissionsComponent } from './view-student-submissions.component';

describe('ViewStudentSubmissionsComponent', () => {
  let component: ViewStudentSubmissionsComponent;
  let fixture: ComponentFixture<ViewStudentSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStudentSubmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
