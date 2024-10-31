import { Component, effect, inject, Input } from "@angular/core";
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
  isActive = false;

  constructor() {
    effect(() => {
      this.isActive = this.calendarService.getDay() === this.dayNum;
    });
  }
}
