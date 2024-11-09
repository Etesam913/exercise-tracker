import { Routes } from "@angular/router";
import { ExerciseCreatorComponent } from "./routes/exercise-creator/exercise-creator.component";
import { HomeComponent } from "./routes/home/home.component";
import { PageNotFoundComponent } from "./routes/page-not-found/page-not-found.component";
import { LoginComponent } from "./routes/login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  {
    path: "exercise-creator",
    component: ExerciseCreatorComponent,
    title: "Exercise Creator",
  },
  {
    path: "login",
    title: "Login",
    component: LoginComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
    title: "Page Not Found",
  },
];
