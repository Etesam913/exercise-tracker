import { Component, Input } from "@angular/core";
import { Exercise } from "../../services/exercise/exercise.service";
import {
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";

@Component({
  selector: "app-exercise-card",
  standalone: true,
  imports: [
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  templateUrl: "./exercise-card.component.html",
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;
}
