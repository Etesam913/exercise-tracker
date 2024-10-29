import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseScheduleComponent } from './exercise-schedule.component';

describe('ExerciseScheduleComponent', () => {
  let component: ExerciseScheduleComponent;
  let fixture: ComponentFixture<ExerciseScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
