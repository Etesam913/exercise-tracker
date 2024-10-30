import { Component, inject } from "@angular/core";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { ColorSchemeService } from "./services/color-scheme/color-scheme.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HlmButtonDirective, SidebarComponent, RouterOutlet],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  titleService = inject(Title);
  colorSchemeService = inject(ColorSchemeService);
}
