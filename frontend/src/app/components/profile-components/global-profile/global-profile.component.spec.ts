import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalProfileComponent } from './global-profile.component';

describe('GlobalProfileComponent', () => {
  let component: GlobalProfileComponent;
  let fixture: ComponentFixture<GlobalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
