import { Injectable, signal } from "@angular/core";

export type Exercise = {
  exerciseType: string;
  repCount: number;
  setCount: number;
  weight: number;
};

@Injectable({
  providedIn: "root",
})
export class ExerciseService {
  exercises = signal<Exercise[]>([
    {
      exerciseType: "test",
      weight: 20,
      setCount: 5,
      repCount: 4,
    },
  ]);
  constructor() {}

  addExercise(newExercise: Exercise) {
    this.exercises.update((prevExercises) => [...prevExercises, newExercise]);
  }
}
