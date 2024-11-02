import { Component, inject, effect } from "@angular/core";
import { CalendarService } from "../../services/calendar/calendar.service";
import { CalendarDaySquareComponent } from "../calendar-day-square/calendar-day-square.component";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CalendarDaySquareComponent, HlmButtonDirective],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent {
  calendarService = inject(CalendarService);
  daysInMonthArr: number[] = [];
  private previousMonth: number | null = null;
  private previousYear: number | null = null;

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
      if (this.previousMonth !== month || this.previousYear !== year) {
        this.calendarService.loadInMonthlyDayData();
      }

      this.previousYear = year;
      this.previousMonth = month;
    });
  }
}
