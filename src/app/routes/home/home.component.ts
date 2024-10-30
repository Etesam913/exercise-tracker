import { Component, inject } from "@angular/core";
import { ExerciseCardComponent } from "../../components/exercise-card/exercise-card.component";
import { ExerciseService } from "../../services/exercise/exercise.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ExerciseCardComponent],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  exerciseService = inject(ExerciseService);
}
