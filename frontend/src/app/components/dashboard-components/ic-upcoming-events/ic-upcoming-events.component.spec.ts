import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcUpcomingEventsComponent } from './ic-upcoming-events.component';

describe('IcUpcomingEventsComponent', () => {
  let component: IcUpcomingEventsComponent;
  let fixture: ComponentFixture<IcUpcomingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcUpcomingEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcUpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
