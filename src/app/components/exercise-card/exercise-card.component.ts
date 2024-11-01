import { Component, Input } from "@angular/core";
import { Exercise } from "../../services/exercise/exercise.service";
import {
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";
import { ExerciseTypePipe } from "../../pipes/exercise-type/exercise-type.pipe";

@Component({
  selector: "app-exercise-card",
  standalone: true,
  imports: [
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    ExerciseTypePipe,
  ],
  templateUrl: "./exercise-card.component.html",
})
export class ExerciseCardComponent {
  @Input() exercise!: Exercise;

  onDragStart(event: DragEvent) {
    const eventTarget = event.target as HTMLLIElement;
    if (!event.dataTransfer || !eventTarget.id) return;

    event.dataTransfer.setData("text/plain", eventTarget.id);

    // Create and append the drag image to the DOM
    const dragImage = document.createElement("div");
    dragImage.innerText = this.exercise.exerciseType;
    dragImage.setAttribute(
      "class",
      "py-1 px-2 border border-zinc-300 dark:border-zinc-600 rounded-md",
    );
    dragImage.style.position = "absolute";
    dragImage.style.top = "-999px"; // Hide it off-screen
    document.body.appendChild(dragImage);

    // Set the custom drag image
    event.dataTransfer.setDragImage(dragImage, -60, -60);

    // Cleanup: Remove the drag image after a brief delay to allow drag to start
    setTimeout(() => document.body.removeChild(dragImage), 0);
  }
}
