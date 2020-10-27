import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcIlProfileComponent } from './ic-il-profile.component';

describe('IcIlProfileComponent', () => {
  let component: IcIlProfileComponent;
  let fixture: ComponentFixture<IcIlProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcIlProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcIlProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
