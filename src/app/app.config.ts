import {
  ApplicationConfig,
  ErrorHandler,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { environment } from "../environments/environment.prod";
import { routes } from "./app.routes";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { GlobalErrorHandlerService } from "./services/global-error-handler/global-error-handler.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
};
