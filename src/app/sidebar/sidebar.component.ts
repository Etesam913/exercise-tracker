import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent {
  currentPath = "";

  sidebarRoutes = [
    { path: "/", name: "Home" },
    { path: "/exercise-creator", name: "Exercise Creator" },
    { path: "/exercise-schedule", name: "Exercise Schedule" },
  ];
}
