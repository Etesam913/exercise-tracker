import { Component, computed, inject, Input } from "@angular/core";
import { CalendarService } from "../../services/calendar/calendar.service";

@Component({
  selector: "app-calendar-day-square",
  standalone: true,
  imports: [],
  templateUrl: "./calendar-day-square.component.html",
})
export class CalendarDaySquareComponent {
  @Input() dayNum!: number;
  calendarService = inject(CalendarService);
  isActive = computed(
    () => this.calendarService.calendarState().day === this.dayNum,
  );

  // Using the dayDataMap to get all exercises for the inputted day
  exercisesForCurrentDay = computed(() => {
    const mapKey = `${this.calendarService.getYear()}-${this.calendarService.getMonth() + 1}-${this.dayNum}`;
    if (this.calendarService.dayDataMap().has(mapKey)) {
      return this.calendarService.dayDataMap().get(mapKey)!;
    }
    return [];
  });
}
