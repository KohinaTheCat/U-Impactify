import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiProfileComponent } from './si-profile.component';

describe('SiProfileComponent', () => {
  let component: SiProfileComponent;
  let fixture: ComponentFixture<SiProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
