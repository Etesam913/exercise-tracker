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
import { collection, Firestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthService {
  private auth: Auth = inject(Auth);
  private googleAuthProvider = new GoogleAuthProvider();
  isLoggedIn = signal(false);
  firestoreService = inject(FirestoreService);
  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor() {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        if (aUser !== null) {
          this.saveUserDataIntoDocument(aUser);
          this.isLoggedIn.set(true);
        } else {
          this.isLoggedIn.set(false);
        }
      },
    );
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
  }
  async loginUsingGoogle() {
    const userCredential = await signInWithPopup(
      this.auth,
      this.googleAuthProvider,
    );
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
    await signOut(this.auth);
  }
}
