import { computed, inject, Injectable, signal } from "@angular/core";
import { FirestoreService } from "../firestore/firestore.service";
import { collection, Firestore, query, where } from "@angular/fire/firestore";
import { Exercise } from "../exercise/exercise.service";
import { FirebaseAuthStateService } from "../firebase-auth-actions/firebase-auth-state.service";

type CalendarData = {
  year: number;
  month: number;
  day: number;
};

export type DayData = {
  id: string;
  day: number;
  month: number;
  year: number;
  exerciseData: Exercise[];
};

type DayDataSignalRecord = Record<string, DayData>;

@Injectable({
  providedIn: "root",
})
export class CalendarService {
  calendarState = signal<CalendarData>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  });
  dayDataMap = signal<Map<string, Exercise[]>>(new Map());
  private firebaseAuthStateService = inject(FirebaseAuthStateService);
  private firestoreService = inject(FirestoreService);
  private firestore: Firestore = inject(Firestore);
  dayDataCollectionRef = computed(() => {
    const { isLoggedIn, userID } = this.firebaseAuthStateService.loginState();
    if (isLoggedIn) {
      return collection(this.firestore, `users/${userID}/dayData`);
    }
    return null;
  });

  monthlyDayData = signal<DayDataSignalRecord>({});

  constructor() {}

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

  nextMonth() {
    let { year, month } = this.calendarState();
    if (month === 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }
    this.calendarState.set({ year, month, day: 1 });
  }

  previousMonth() {
    let { year, month } = this.calendarState();
    if (month === 0) {
      year -= 1;
      month = 11;
    } else {
      month -= 1;
    }
    this.calendarState.set({ year, month, day: 1 });
  }

  setDay(day: number) {
    let { year, month } = this.calendarState();
    const numberOfDaysInMonth = this.getNumberOfDaysInMonth(year, month);
    if (day < 1 || day > numberOfDaysInMonth) {
      throw new Error(
        `Invalid day: ${day}. It should be between 1 and ${numberOfDaysInMonth}.`,
      );
    }
    this.calendarState.set({ year, month, day });
  }

  async setDayDataForDay(dayData: DayData) {
    const dayDataCollection = this.dayDataCollectionRef();
    if (!dayDataCollection) return;
    await this.firestoreService.setDocument(
      `users/${this.firebaseAuthStateService.loginState().userID}/dayData`,
      `${dayData.year}-${dayData.month}-${dayData.day}`,
      dayData,
    );
  }

  async loadInMonthlyDayData() {
    const dayDataCollection = this.dayDataCollectionRef();
    if (!dayDataCollection) return;
    const dayDataFromFirestore = (await this.firestoreService.getData(
      query(
        dayDataCollection,
        where("month", "==", this.getMonth() + 1),
        where("year", "==", this.getYear()),
      ),
    )) as DayData[];
    if (dayDataFromFirestore) {
      const newDayDataMap = dayDataFromFirestore.reduce(
        (accMap, dayDataObj) => {
          const mapKey = `${dayDataObj.year}-${dayDataObj.month}-${dayDataObj.day}`;
          accMap.set(mapKey, dayDataObj.exerciseData);
          return accMap;
        },
        new Map<string, Exercise[]>(),
      );
      this.dayDataMap.set(newDayDataMap);
    }
  }
}
