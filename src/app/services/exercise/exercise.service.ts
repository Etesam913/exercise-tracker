import { Injectable, signal } from "@angular/core";

export type Exercise = {
  exerciseType: string;
  repCount: number;
  setCount: number;
};

@Injectable({
  providedIn: "root",
})
export class ExerciseService {
  exercises = signal<Exercise[]>([]);
  constructor() {}

  addExercise(newExercise: Exercise) {
    this.exercises.update((prevExercises) => [...prevExercises, newExercise]);
  }
}
