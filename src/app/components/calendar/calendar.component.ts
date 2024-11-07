import { Component, inject, effect, computed } from "@angular/core";
import { CalendarService } from "../../services/calendar/calendar.service";
import { CalendarDaySquareComponent } from "../calendar-day-square/calendar-day-square.component";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { ExerciseCardComponent } from "../exercise-card/exercise-card.component";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";
import { lucideChevronLeft, lucideChevronRight } from "@ng-icons/lucide";
import { FirebaseAuthActionsService } from "../../services/firebase-auth/firebase-auth.service";
import { CalendarExerciseCardComponent } from "../../calendar-exercise-card/calendar-exercise-card.component";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [
    CalendarDaySquareComponent,
    HlmButtonDirective,
    CalendarExerciseCardComponent,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucideChevronLeft, lucideChevronRight })],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent {
  calendarService = inject(CalendarService);
  private authService = inject(FirebaseAuthActionsService);
  daysInMonthArr: number[] = [];
  private previousMonth: number | null = null;
  private previousYear: number | null = null;
  // Using the dayDataMap to get all exercises for the inputted day
  exercisesForActiveDay = computed(() => {
    const mapKey = `${this.calendarService.getYear()}-${this.calendarService.getMonth() + 1}-${this.calendarService.getDay()}`;
    if (this.calendarService.dayDataMap().has(mapKey)) {
      return this.calendarService.dayDataMap().get(mapKey)!;
    }
    return [];
  });

  constructor() {
    effect(() => {
      const { year, month } = this.calendarService.calendarState();
      const daysInMonth = this.calendarService.getNumberOfDaysInMonth(
        year,
        month,
      );
      this.daysInMonthArr = [];
      for (let i = 0; i < daysInMonth; i++) {
        this.daysInMonthArr.push(i + 1);
      }
      // When the month or the year changes, then we need to fetch the data for the month and year
      if (
        this.previousMonth !== month ||
        this.previousYear !== year ||
        this.calendarService.dayDataCollectionRef()
      ) {
        this.calendarService.loadInMonthlyDayData();
      }

      this.previousYear = year;
      this.previousMonth = month;
    });
  }
}
