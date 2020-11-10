import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GivingGardenComponent } from './giving-garden.component';

describe('GivingGardenComponent', () => {
  let component: GivingGardenComponent;
  let fixture: ComponentFixture<GivingGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GivingGardenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GivingGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
