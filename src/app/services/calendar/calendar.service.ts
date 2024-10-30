import { Injectable, signal } from "@angular/core";

type CalendarData = {
  year: number;
  month: number;
  day: number;
};

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  calendarState = signal<CalendarData>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  });

  getYear() {
    return this.calendarState().year;
  }

  getMonth() {
    return this.calendarState().month;
  }

  getDay() {
    return this.calendarState().day;
  }

  getMonthFullName() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[this.calendarState().month];
  }

  getNumberOfDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }
}
