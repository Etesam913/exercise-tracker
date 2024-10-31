import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";
import { BrnSelectImports } from "@spartan-ng/ui-select-brain";
import { HlmSelectImports } from "@spartan-ng/ui-select-helm";
import { ExerciseService } from "../../services/exercise/exercise.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-exercise-creator",
  standalone: true,
  imports: [
    BrnSelectImports,
    HlmSelectImports,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    ReactiveFormsModule,
  ],
  templateUrl: "./exercise-creator.component.html",
})
export class ExerciseCreatorComponent {
  private routerService = inject(Router);
  exerciseService = inject(ExerciseService);
  exerciseCreationForm = new FormGroup({
    exerciseType: new FormControl("", [Validators.required]),
    repCount: new FormControl(1, [Validators.required, Validators.min(1)]),
    setCount: new FormControl(1, [Validators.required, Validators.min(1)]),
    weight: new FormControl(30, [Validators.required, Validators.min(5)]),
  });

  onSubmit() {
    if (this.exerciseCreationForm.valid) {
      const { exerciseType, repCount, setCount, weight } =
        this.exerciseCreationForm.value;
      if (!exerciseType || !repCount || !setCount || !weight) return;

      this.exerciseService.addExercise({
        id: crypto.randomUUID(),
        exerciseType,
        repCount,
        setCount,
        weight,
      });
      this.routerService.navigate([""]);
    }
  }
}
