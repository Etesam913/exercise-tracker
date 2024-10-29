import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCreatorComponent } from './exercise-creator.component';

describe('ExerciseCreatorComponent', () => {
  let component: ExerciseCreatorComponent;
  let fixture: ComponentFixture<ExerciseCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
