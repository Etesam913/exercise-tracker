import { Injectable, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NavigationService {
  private currentPath = signal("");
  navigationEnd$: Observable<NavigationEnd>;
  constructor(private router: Router) {
    this.navigationEnd$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    );

    this.navigationEnd$.subscribe((event: NavigationEnd) => {
      console.log(event.urlAfterRedirects);
      this.currentPath.set(event.urlAfterRedirects);
    });
  }

  getCurrentPath() {
    return this.currentPath;
  }
}
