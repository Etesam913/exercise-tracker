import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { FirebaseAuthStateService } from "../../services/firebase-auth-actions/firebase-auth-state.service";
import { FirebaseAuthActionsService } from "../../services/firebase-auth/firebase-auth.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HlmButtonDirective],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
  currentPath = "";
  private firebaseAuthActionsService = inject(FirebaseAuthActionsService);
  firebaseAuthStateService = inject(FirebaseAuthStateService);
  sidebarRoutes = [
    { path: "/", name: "Home" },
    { path: "/exercise-creator", name: "Exercise Creator" },
  ];

  authButtonOnClick() {
    if (this.firebaseAuthStateService.loginState().isLoggedIn) {
      this.firebaseAuthActionsService.logoutUsingGoogle();
    } else {
      this.firebaseAuthActionsService.loginUsingGoogle();
    }
  }
}
