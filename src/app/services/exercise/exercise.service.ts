import { computed, inject, Injectable, signal } from "@angular/core";
import { FirestoreService } from "../firestore/firestore.service";
import { Firestore, collection } from "@angular/fire/firestore";
import { FirebaseAuthStateService } from "../firebase-auth-actions/firebase-auth-state.service";

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
  private authStateService = inject(FirebaseAuthStateService);
  private exerciseCollectionRef = computed(() => {
    if (!this.authStateService.loginState().userID) {
      return null;
    }
    return collection(
      this.firestore,
      `users/${this.authStateService.loginState().userID}/exercises`,
    );
  });

  exercises = signal<Exercise[]>([]);
  private firestoreService = inject(FirestoreService);
  private firestore: Firestore = inject(Firestore);

  async removeExercise(exerciseId: string) {
    await this.firestoreService.deleteDocument(
      `users/${this.authStateService.loginState().userID}/exercises`,
      exerciseId,
    );
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

  async loadInExercises() {
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
