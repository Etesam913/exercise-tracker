import { Component, inject } from "@angular/core";
import { ExerciseCardComponent } from "../../components/exercise-card/exercise-card.component";
import { ExerciseService } from "../../services/exercise/exercise.service";
import { CalendarComponent } from "../../components/calendar/calendar.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ExerciseCardComponent, CalendarComponent],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  exerciseService = inject(ExerciseService);
}
