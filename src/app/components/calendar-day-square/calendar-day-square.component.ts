import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  signal,
  ViewChild,
} from "@angular/core";
import { CalendarService } from "../../services/calendar/calendar.service";
import { fromEvent, map, merge, Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-calendar-day-square",
  standalone: true,
  imports: [],
  templateUrl: "./calendar-day-square.component.html",
})
export class CalendarDaySquareComponent implements AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChild("daySquare") daySquare!: ElementRef<HTMLButtonElement>;
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
  isDragOver = signal(false);
  private dragEnterCount = 0;

  ngAfterViewInit(): void {
    fromEvent(this.daySquare.nativeElement, "dragenter")
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => {
        e.preventDefault();
        this.dragEnterCount += 1;
        if (this.dragEnterCount === 1) {
          this.isDragOver.set(true);
        }
      });

    const dragLeave$ = fromEvent(
      this.daySquare.nativeElement,
      "dragleave",
    ).pipe(map(() => "dragleave"));

    const drop$ = fromEvent(this.daySquare.nativeElement, "drop").pipe(
      map(() => "drop"),
    );

    merge(dragLeave$, drop$)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((eventName) => {
        if (eventName === "dragleave" || eventName === "drop") {
          this.dragEnterCount -= 1;
          if (this.dragEnterCount === 0) {
            this.isDragOver.set(false);
          }
        }

        if (eventName === "drop") {
          console.log("dropped");
        }
      });

    fromEvent(this.daySquare.nativeElement, "dragover")
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e) => e.preventDefault());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
