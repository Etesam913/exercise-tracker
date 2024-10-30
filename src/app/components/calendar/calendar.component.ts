import { Component, inject, effect } from "@angular/core";
import { CalendarService } from "../../services/calendar/calendar.service";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [],
  templateUrl: "./calendar.component.html",
})
export class CalendarComponent {
  calendarService = inject(CalendarService);
  daysInMonthArr: number[] = [];
  constructor() {
    effect(() => {
      const { year, month } = this.calendarService.calendarState();
      const daysInMonth = this.calendarService.getNumberOfDaysInMonth(
        year,
        month,
      );

      for (let i = 0; i < daysInMonth; i++) {
        this.daysInMonthArr.push(i + 1);
      }
    });
  }
}
