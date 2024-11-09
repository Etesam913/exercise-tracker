import { Component, inject } from "@angular/core";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HlmToasterComponent } from "@spartan-ng/ui-sonner-helm";
import { NavigationService } from "./services/navigation/navigation.service";
import { AsyncPipe } from "@angular/common";
import { ColorSchemeService } from "./services/color-scheme/color-scheme.service";
import { LoginComponent } from "./routes/login/login.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    HlmButtonDirective,
    SidebarComponent,
    LoginComponent,
    RouterOutlet,
    HlmToasterComponent,
    AsyncPipe,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  titleService = inject(Title);
  private colorSchemeService = inject(ColorSchemeService);
  navigationService = inject(NavigationService);
}
