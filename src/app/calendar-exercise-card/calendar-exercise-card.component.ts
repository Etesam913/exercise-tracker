import { Component, computed, inject, Input } from "@angular/core";
import {
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";
import { ExerciseTypePipe } from "../pipes/exercise-type/exercise-type.pipe";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmSpinnerComponent } from "@spartan-ng/ui-spinner-helm";
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from "@spartan-ng/ui-dialog-brain";
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from "@spartan-ng/ui-dialog-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";
import { Exercise } from "../services/exercise/exercise.service";
import { lucideTrash2 } from "@ng-icons/lucide";
import { FirestoreService } from "../services/firestore/firestore.service";
import { CalendarService } from "../services/calendar/calendar.service";
import { FirebaseAuthStateService } from "../services/firebase-auth-actions/firebase-auth-state.service";

@Component({
  selector: "app-calendar-exercise-card",
  imports: [
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    ExerciseTypePipe,
    HlmButtonDirective,
    HlmSpinnerComponent,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmIconComponent,
  ],
  standalone: true,
  providers: [provideIcons({ lucideTrash2 })],
  templateUrl: "./calendar-exercise-card.component.html",
})
export class CalendarExerciseCardComponent {
  @Input() exercise!: Exercise;
  @Input() showDeleteButton = true;
  private calendarService = inject(CalendarService);
  private firestoreService = inject(FirestoreService);
  private authService = inject(FirebaseAuthStateService);
  private exercisesForActiveDay = computed(() => {
    const mapKey = `${this.calendarService.getYear()}-${this.calendarService.getMonth() + 1}-${this.calendarService.getDay()}`;
    if (this.calendarService.dayDataMap().has(mapKey)) {
      return this.calendarService.dayDataMap().get(mapKey)!;
    }
    return [];
  });

  async deleteExercise() {
    const newExercises = this.exercisesForActiveDay().filter(
      (exercise) => exercise.id !== this.exercise.id,
    );

    const dayDataMapKey = `${this.calendarService.getYear()}-${this.calendarService.getMonth() + 1}-${this.calendarService.getDay()}`;

    if (newExercises.length === 0) {
      await this.firestoreService.deleteDocument(
        `users/${this.authService.loginState().userID}/dayData`,
        dayDataMapKey,
      );
      this.calendarService.dayDataMap.update((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.delete(dayDataMapKey);
        return newMap;
      });
      return;
    }

    await this.calendarService.setDayDataForDay({
      exerciseData: newExercises,
      day: this.calendarService.getDay(),
      month: this.calendarService.getMonth() + 1,
      year: this.calendarService.getYear(),
      id: crypto.randomUUID(),
    });
  }
}
