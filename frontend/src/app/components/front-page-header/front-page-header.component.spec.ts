import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageHeaderComponent } from './front-page-header.component';

describe('FrontPageHeaderComponent', () => {
  let component: FrontPageHeaderComponent;
  let fixture: ComponentFixture<FrontPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
