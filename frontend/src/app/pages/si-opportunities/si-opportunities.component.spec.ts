import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiOpportunitiesComponent } from './si-opportunities.component';

describe('SiOpportunitiesComponent', () => {
  let component: SiOpportunitiesComponent;
  let fixture: ComponentFixture<SiOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiOpportunitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
