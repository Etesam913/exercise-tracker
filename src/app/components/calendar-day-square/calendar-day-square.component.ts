import { Component, Input } from "@angular/core";

@Component({
  selector: "app-calendar-day-square",
  standalone: true,
  imports: [],
  templateUrl: "./calendar-day-square.component.html",
})
export class CalendarDaySquareComponent {
  @Input() dayNum!: number;
}
