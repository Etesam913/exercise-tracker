import { inject, Injectable, signal } from "@angular/core";
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  authState,
  User,
  signOut,
} from "@angular/fire/auth";
import { Subscription } from "rxjs";
import { FirestoreService } from "../firestore/firestore.service";
import { ExerciseService } from "../exercise/exercise.service";
import { FirebaseAuthStateService } from "../firebase-auth-actions/firebase-auth-state.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthActionsService {
  private googleAuthProvider = new GoogleAuthProvider();
  firestoreService = inject(FirestoreService);
  authStateSubscription: Subscription;
  private authStateService = inject(FirebaseAuthStateService);
  private exerciseService = inject(ExerciseService);
  private router = inject(Router);

  constructor() {
    this.authStateSubscription = this.authStateService.authState$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        if (aUser !== null) {
          this.saveUserDataIntoDocument(aUser);
          this.authStateService.loginState.set({
            isLoggedIn: true,
            userID: aUser.uid,
          });
          this.router.navigate(["/"]);
          this.exerciseService.loadInExercises();
        } else {
          this.router.navigate(["/login"]);
          this.authStateService.loginState.set({
            isLoggedIn: false,
            userID: null,
          });
          this.exerciseService.exercises.set([]);
        }
      },
    );
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }

  async loginUsingGoogle() {
    await signInWithPopup(this.authStateService.auth, this.googleAuthProvider);
  }
  saveUserDataIntoDocument(user: User) {
    // Save user data to Firestore
    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      providerId: user.providerData[0]?.providerId,
      lastLogin: user.metadata.lastSignInTime,
    };
    this.firestoreService.setDocument(`users`, user.uid, userData);
  }
  async logoutUsingGoogle() {
    await signOut(this.authStateService.auth);
  }
}
