import { Component } from "@angular/core";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HlmButtonDirective, SidebarComponent, RouterOutlet],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "exercise-tracker";
}
