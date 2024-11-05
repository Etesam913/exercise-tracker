import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { FirebaseAuthService } from "../../services/firebase-auth/firebase-auth.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HlmButtonDirective],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
  currentPath = "";
  firebaseAuthService = inject(FirebaseAuthService);
  sidebarRoutes = [
    { path: "/", name: "Home" },
    { path: "/exercise-creator", name: "Exercise Creator" },
  ];

  authButtonOnClick() {
    if (this.firebaseAuthService.loginState().isLoggedIn) {
      this.firebaseAuthService.logoutUsingGoogle();
    } else {
      this.firebaseAuthService.loginUsingGoogle();
    }
  }
}
