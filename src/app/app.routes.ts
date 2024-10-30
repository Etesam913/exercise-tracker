import { Routes } from "@angular/router";
import { ExerciseCreatorComponent } from "./routes/exercise-creator/exercise-creator.component";
import { HomeComponent } from "./routes/home/home.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  {
    path: "exercise-creator",
    component: ExerciseCreatorComponent,
    title: "Exercise Creator",
  },
];
