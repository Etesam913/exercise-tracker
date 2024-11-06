import { inject, Injectable, signal } from "@angular/core";
import { Auth, authState } from "@angular/fire/auth";

type LoginState = {
  isLoggedIn: boolean;
  userID: string | null;
};

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthStateService {
  auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  loginState = signal<LoginState>({
    isLoggedIn: false,
    userID: null,
  });

  constructor() {}
}
