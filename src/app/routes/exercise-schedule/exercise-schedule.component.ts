import { Component, inject } from "@angular/core";
import { ExerciseCardComponent } from "../../components/exercise-card/exercise-card.component";
import { ExerciseService } from "../../services/exercise/exercise.service";

@Component({
  selector: "app-exercise-schedule",
  standalone: true,
  imports: [ExerciseCardComponent],
  templateUrl: "./exercise-schedule.component.html",
})
export class ExerciseScheduleComponent {
  exerciseService = inject(ExerciseService);
}
