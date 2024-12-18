import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  signal,
  ViewChild,
} from "@angular/core";
import {
  Exercise,
  ExerciseService,
} from "../../services/exercise/exercise.service";
import {
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from "@spartan-ng/ui-card-helm";
import { ExerciseTypePipe } from "../../pipes/exercise-type/exercise-type.pipe";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmSpinnerComponent } from "@spartan-ng/ui-spinner-helm";
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from "@spartan-ng/ui-dialog-brain";
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from "@spartan-ng/ui-dialog-helm";
import { HlmLabelDirective } from "@spartan-ng/ui-label-helm";
import { HlmInputDirective } from "@spartan-ng/ui-input-helm";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";
import { lucideTrash2 } from "@ng-icons/lucide";
import { fromEvent, Subject, takeUntil } from "rxjs";
import { CalendarExerciseCardComponent } from "../../calendar-exercise-card/calendar-exercise-card.component";
import {
  CalendarService,
  DayData,
} from "../../services/calendar/calendar.service";

@Component({
  selector: "app-exercise-card",
  standalone: true,
  imports: [
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    ExerciseTypePipe,
    HlmButtonDirective,
    HlmSpinnerComponent,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmIconComponent,
    CalendarExerciseCardComponent,
  ],
  providers: [provideIcons({ lucideTrash2 })],
  templateUrl: "./exercise-card.component.html",
})
export class ExerciseCardComponent implements AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  @ViewChild("dragCard") card!: ElementRef<HTMLLIElement>;
  @Input() exercise!: Exercise;
  exerciseService = inject(ExerciseService);
  isLoading = signal(false);
  documentsForExerciseId = signal<DayData[]>([]);
  private calendarService = inject(CalendarService);

  ngAfterViewInit(): void {
    if (this.card.nativeElement) {
      fromEvent(this.card.nativeElement, "dragstart")
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((e) => this.onDragStart(e as DragEvent));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async onTrashClick() {
    this.documentsForExerciseId.set([]);
    const documentData =
      await this.calendarService.getDayDataDocumentsForExerciseId(
        this.exercise.id,
      );
    this.documentsForExerciseId.set(documentData);
  }

  onDragStart(event: DragEvent) {
    const eventTarget = event.target as HTMLLIElement;
    if (!event.dataTransfer || !eventTarget.id) return;

    event.dataTransfer.setData("text/plain", JSON.stringify(this.exercise));

    // Create and append the drag image to the DOM
    const dragImage = document.createElement("div");
    dragImage.innerText = this.exercise.exerciseType;
    dragImage.setAttribute(
      "class",
      "py-1 px-2 border border-zinc-300 dark:border-zinc-600 rounded-md",
    );
    dragImage.style.position = "absolute";
    dragImage.style.top = "-999px"; // Hide it off-screen
    document.body.appendChild(dragImage);

    // Set the custom drag image
    event.dataTransfer.setDragImage(dragImage, -60, -60);

    // Cleanup: Remove the drag image after a brief delay to allow drag to start
    setTimeout(() => document.body.removeChild(dragImage), 0);
  }

  async removeExercise(exerciseId: string) {
    this.isLoading.set(true);
    await this.calendarService.deleteDayDataDocumentsByExerciseId(
      this.documentsForExerciseId(),
      exerciseId,
    );
    await this.exerciseService.removeExercise(exerciseId);
    this.isLoading.set(false);
  }
}
