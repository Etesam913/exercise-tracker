import { inject, Injectable, signal } from "@angular/core";
import { FirestoreService } from "../firestore/firestore.service";
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
} from "@angular/fire/firestore";

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
  private collectionRef!: CollectionReference<DocumentData, DocumentData>;
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
  private firestore: Firestore = inject(Firestore);

  constructor() {
    this.collectionRef = collection(this.firestore, "exercises");
  }

  async removeExercise(exerciseId: string) {
    await this.firestoreService.deleteDocument("exercises", exerciseId);
    this.exercises.update((prevExercises) =>
      prevExercises.filter(({ id }) => id !== exerciseId),
    );
  }

  async addExercise(newExercise: Omit<Exercise, "id">) {
    const newDoc = await this.firestoreService.addDocument(
      this.collectionRef,
      newExercise,
    );
    console.log(newDoc.id);
    this.exercises.update((prevExercises) => [
      ...prevExercises,
      { ...newExercise, id: newDoc.id },
    ]);

    return newDoc.id;
  }

  async loadInExercises() {
    const exercisesFromFirestore = (await this.firestoreService.getData(
      this.collectionRef,
    )) as Exercise[];
    if (exercisesFromFirestore) {
      this.exercises.set(exercisesFromFirestore);
    }
  }
}
