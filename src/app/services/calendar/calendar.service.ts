import { computed, inject, Injectable, signal } from "@angular/core";
import { FirestoreService } from "../firestore/firestore.service";
import {
  collection,
  doc,
  Firestore,
  query,
  where,
  writeBatch,
  arrayRemove,
  deleteField,
} from "@angular/fire/firestore";
import { Exercise } from "../exercise/exercise.service";
import { FirebaseAuthStateService } from "../firebase-auth-actions/firebase-auth-state.service";

type CalendarData = {
  year: number;
  month: number;
  day: number;
  firstDayOffset: number;
};

export type DayData = {
  id: string;
  day: number;
  month: number;
  year: number;
  exerciseData: Record<string, Exercise>;
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
    firstDayOffset: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    ).getDay(),
  });
  dayDataMap = signal<Map<string, Record<string, Exercise>>>(new Map());
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
  firstDayOffsetArr = computed(() => {
    const { year, month } = this.calendarState();
    const firstDayOffset = new Date(year, month, 1).getDay();
    return Array.from({ length: firstDayOffset }, (_, i) => i);
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

  getFirstDayOffset() {
    return this.calendarState().firstDayOffset;
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
    const firstDayOffset = new Date(year, month, 1).getDay();
    this.calendarState.set({ year, month, day: 1, firstDayOffset });
  }

  previousMonth() {
    let { year, month } = this.calendarState();
    if (month === 0) {
      year -= 1;
      month = 11;
    } else {
      month -= 1;
    }
    const firstDayOffset = new Date(year, month, 1).getDay();
    this.calendarState.set({ year, month, day: 1, firstDayOffset });
  }

  setDay(day: number) {
    let { year, month } = this.calendarState();
    const numberOfDaysInMonth = this.getNumberOfDaysInMonth(year, month);
    if (day < 1 || day > numberOfDaysInMonth) {
      throw new Error(
        `Invalid day: ${day}. It should be between 1 and ${numberOfDaysInMonth}.`,
      );
    }
    this.calendarState.set({
      year,
      month,
      day,
      firstDayOffset: this.getFirstDayOffset(),
    });
  }

  async getDayDataDocumentsForExerciseId(exerciseId: string) {
    const dayDataCollection = this.dayDataCollectionRef();
    if (!dayDataCollection) return [];
    const dayDataFromFirestore = (await this.firestoreService.getData(
      query(
        dayDataCollection,
        where("exerciseIds", "array-contains", exerciseId),
      ),
    )) as DayData[];
    return dayDataFromFirestore;
  }

  async deleteDayDataDocumentsByExerciseId(
    docData: DayData[],
    exerciseId: string,
  ) {
    const batch = writeBatch(this.firestore);
    docData.forEach(({ id, exerciseData }) => {
      const docRef = doc(
        this.firestore,
        `users/${this.firebaseAuthStateService.loginState().userID}/dayData`,
        id,
      );

      // You are deleting the only exercise for this day, so you can delete the whole dayData document
      if (Object.keys(exerciseData).length === 1) {
        batch.delete(docRef);
        this.dayDataMap.update((prevDayDataMap) => {
          const newDayDataMap = new Map(prevDayDataMap);
          newDayDataMap.delete(id);
          return newDayDataMap;
        });
        return;
      }

      // Update the dayData signal so that the ui is reflected
      this.dayDataMap.update((prevDayDataMap) => {
        const newDayDataMap = new Map(prevDayDataMap);
        const exerciseDataForNewMap = newDayDataMap.get(id);
        if (exerciseDataForNewMap) {
          delete exerciseDataForNewMap[exerciseId];
          newDayDataMap.set(id, exerciseDataForNewMap);
        }
        return newDayDataMap;
      });
      batch.update(docRef, {
        exerciseIds: arrayRemove(exerciseId),
        [`exerciseData.${exerciseId}`]: deleteField(),
      });
    });
    await batch.commit();
  }

  async setDayDataForDay(dayData: DayData) {
    const dayDataCollection = this.dayDataCollectionRef();
    if (!dayDataCollection) return;
    const dayDataMapKey = `${dayData.year}-${dayData.month}-${dayData.day}`;
    const dayDataWithExerciseIds = {
      ...dayData,
      exerciseIds: Object.keys(dayData.exerciseData),
    };

    await this.firestoreService.setDocument(
      `users/${this.firebaseAuthStateService.loginState().userID}/dayData`,
      dayDataMapKey,
      dayDataWithExerciseIds,
      { merge: false },
    );

    this.dayDataMap.update((prevDayDataMap) => {
      const newDayDataMap = new Map(prevDayDataMap);
      newDayDataMap.set(dayDataMapKey, dayData.exerciseData);
      return newDayDataMap;
    });
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
        new Map<string, Record<string, Exercise>>(),
      );
      this.dayDataMap.set(newDayDataMap);
    }
  }
}
