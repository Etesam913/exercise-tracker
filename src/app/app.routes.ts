import { Routes } from "@angular/router";
import { HomeComponent } from "./routes/home/home.component";
import { ExerciseScheduleComponent } from "./routes/exercise-schedule/exercise-schedule.component";
import { ExerciseCreatorComponent } from "./routes/exercise-creator/exercise-creator.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  {
    path: "exercise-schedule",
    component: ExerciseScheduleComponent,
    title: "Exercise Schedule",
  },
  {
    path: "exercise-creator",
    component: ExerciseCreatorComponent,
    title: "Exercise Creator",
  },
];
