import { inject, Injectable, signal } from "@angular/core";
import { FirestoreService } from "../firestore/firestore.service";

export type Exercise = {
  id: string;
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
    // {
    //   id: "abc",
    //   exerciseType: "test",
    //   weight: 20,
    //   setCount: 5,
    //   repCount: 4,
    // },
  ]);
  private firestoreService = inject(FirestoreService);

  constructor() {}

  addExercise(newExercise: Exercise) {
    this.exercises.update((prevExercises) => [...prevExercises, newExercise]);
  }

  async loadInExercises() {
    const exercisesFromFirestore = (await this.firestoreService.getData(
      "exercises",
    )) as Exercise[];
    if (exercisesFromFirestore) {
      this.exercises.set(exercisesFromFirestore);
    }
  }
}
