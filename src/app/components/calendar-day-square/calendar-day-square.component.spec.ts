import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDaySquareComponent } from './calendar-day-square.component';

describe('CalendarDaySquareComponent', () => {
  let component: CalendarDaySquareComponent;
  let fixture: ComponentFixture<CalendarDaySquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDaySquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDaySquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
