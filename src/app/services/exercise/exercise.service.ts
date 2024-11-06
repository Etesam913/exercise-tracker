import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { FirestoreService } from "../firestore/firestore.service";
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
} from "@angular/fire/firestore";
import { FirebaseAuthService } from "../firebase-auth/firebase-auth.service";

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
  private exerciseCollectionRef = computed(() => {
    if (!this.authService.loginState().userID) {
      return null;
    }
    return collection(
      this.firestore,
      `users/${this.authService.loginState().userID}/exercises`,
    );
  });

  exercises = signal<Exercise[]>([]);

  private firestoreService = inject(FirestoreService);
  private firestore: Firestore = inject(Firestore);
  private authService = inject(FirebaseAuthService);

  constructor() {
    effect(
      () => {
        if (this.authService.loginState().isLoggedIn) {
          this.loadInExercises();
        } else {
          this.exercises.set([]);
        }
      },
      { allowSignalWrites: true },
    );
  }

  async removeExercise(exerciseId: string) {
    await this.firestoreService.deleteDocument("exercises", exerciseId);
    this.exercises.update((prevExercises) =>
      prevExercises.filter(({ id }) => id !== exerciseId),
    );
  }

  async addExercise(newExercise: Omit<Exercise, "id">): Promise<boolean> {
    const exerciseCollection = this.exerciseCollectionRef();
    if (
      this.exercises().some(
        ({ exerciseType, repCount, setCount, weight }) =>
          exerciseType === newExercise.exerciseType &&
          repCount === newExercise.repCount &&
          setCount === newExercise.setCount &&
          weight === newExercise.weight,
      ) ||
      !exerciseCollection
    ) {
      return false;
    }

    const newDoc = await this.firestoreService.addDocument(
      exerciseCollection,
      newExercise,
    );

    this.exercises.update((prevExercises) => [
      ...prevExercises,
      { ...newExercise, id: newDoc.id },
    ]);
    return true;
  }

  private async loadInExercises() {
    const exerciseCollection = this.exerciseCollectionRef();
    if (!exerciseCollection) return;
    const exercisesFromFirestore = (await this.firestoreService.getData(
      exerciseCollection,
    )) as Exercise[];
    if (exercisesFromFirestore) {
      this.exercises.set(exercisesFromFirestore);
    }
  }
}
