import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLecturesComponent } from './course-lectures.component';

describe('CourseLecturesComponent', () => {
  let component: CourseLecturesComponent;
  let fixture: ComponentFixture<CourseLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseLecturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
