import { Component } from "@angular/core";
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
  exerciseCreationForm = new FormGroup({
    exerciseType: new FormControl("", [Validators.required]),
    repititionCount: new FormControl(1, [Validators.required]),
    setCount: new FormControl(1, [Validators.required]),
  });

  onSubmit() {
    if (this.exerciseCreationForm.valid) {
      this.exerciseCreationForm.reset();
    }
  }
}
