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

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthService {
  private auth: Auth = inject(Auth);
  private googleAuthProvider = new GoogleAuthProvider();
  isLoggedIn = signal(false);

  authState$ = authState(this.auth);
  authStateSubscription: Subscription;

  constructor() {
    this.authStateSubscription = this.authState$.subscribe(
      (aUser: User | null) => {
        //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
        if (aUser !== null) {
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

  async logoutUsingGoogle() {
    await signOut(this.auth);
  }
}
