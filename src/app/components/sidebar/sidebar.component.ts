import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HlmButtonDirective],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
  currentPath = "";

  sidebarRoutes = [
    { path: "/", name: "Home" },
    { path: "/exercise-creator", name: "Exercise Creator" },
  ];
}
