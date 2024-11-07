import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarExerciseCardComponent } from './calendar-exercise-card.component';

describe('CalendarExerciseCardComponent', () => {
  let component: CalendarExerciseCardComponent;
  let fixture: ComponentFixture<CalendarExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarExerciseCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
