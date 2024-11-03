import { Component, inject, signal } from "@angular/core";
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
import { HlmSpinnerComponent } from "@spartan-ng/ui-spinner-helm";

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
    HlmSpinnerComponent,
  ],
  templateUrl: "./exercise-creator.component.html",
})
export class ExerciseCreatorComponent {
  private routerService = inject(Router);
  exerciseService = inject(ExerciseService);
  exerciseCreationForm = new FormGroup({
    exerciseType: new FormControl("", [Validators.required]),
    repCount: new FormControl(5, [Validators.required, Validators.min(1)]),
    setCount: new FormControl(5, [Validators.required, Validators.min(1)]),
    weight: new FormControl(30, [Validators.required, Validators.min(5)]),
  });
  isLoading = signal(false);
  doesDuplicateExerciseExist = signal(false);
  async onSubmit() {
    this.doesDuplicateExerciseExist.set(false);
    if (this.exerciseCreationForm.valid) {
      this.isLoading.set(true);
      const { exerciseType, repCount, setCount, weight } =
        this.exerciseCreationForm.value;
      if (!exerciseType || !repCount || !setCount || !weight) return;

      const didSucceed = await this.exerciseService.addExercise({
        exerciseType,
        repCount,
        setCount,
        weight,
      });
      this.isLoading.set(false);

      if (didSucceed) {
        this.routerService.navigate([""]);
      }
      // There is a duplicate
      else {
        this.doesDuplicateExerciseExist.set(true);
      }
    }
  }
}
