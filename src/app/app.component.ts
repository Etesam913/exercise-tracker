import { Component, inject, OnInit, signal } from "@angular/core";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { RouterOutlet } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { ColorSchemeService } from "./services/color-scheme/color-scheme.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ExerciseService } from "./services/exercise/exercise.service";
import { HlmToasterComponent } from "@spartan-ng/ui-sonner-helm";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    HlmButtonDirective,
    SidebarComponent,
    RouterOutlet,
    HlmToasterComponent,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  titleService = inject(Title);
  colorSchemeService = inject(ColorSchemeService);
  exerciseService = inject(ExerciseService);

  ngOnInit(): void {
    this.exerciseService.loadInExercises();
  }
}
