import { Component, inject } from "@angular/core";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { FirebaseAuthActionsService } from "../../services/firebase-auth/firebase-auth.service";
import { HlmIconModule, provideIcons } from "@spartan-ng/ui-icon-helm";
import { lucideLogIn } from "@ng-icons/lucide";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [HlmButtonDirective, HlmIconModule],
  templateUrl: "./login.component.html",
  providers: [provideIcons({ lucideLogIn })],
})
export class LoginComponent {
  private firebaseAuthActionsService = inject(FirebaseAuthActionsService);
  async loginClick() {
    await this.firebaseAuthActionsService.loginUsingGoogle();
  }
}
