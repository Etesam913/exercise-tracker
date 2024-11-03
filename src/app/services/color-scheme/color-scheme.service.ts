import { inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ColorSchemeService {
  private mediaQuery: MediaQueryList = window.matchMedia(
    "(prefers-color-scheme: dark)",
  );
  private currentScheme: string;
  private renderer: Renderer2;
  private rendererFactory = inject(RendererFactory2);

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.currentScheme = this.getColorScheme();
    this.applyColorScheme(this.currentScheme); // Apply the initial color scheme on app start
    this.mediaQuery.addEventListener(
      "change",
      this.handleColorSchemeChange.bind(this),
    );
  }

  // Get the initial color scheme
  getColorScheme(): string {
    return this.mediaQuery.matches ? "dark" : "light";
  }

  // Handle color scheme change
  private handleColorSchemeChange(event: MediaQueryListEvent) {
    const newScheme = event.matches ? "dark" : "light";
    this.currentScheme = newScheme;
    this.applyColorScheme(newScheme);
  }

  // Apply the color scheme to the app
  private applyColorScheme(scheme: string) {
    const mainElement = document.querySelector("body");
    if (!mainElement) return;
    if (scheme === "dark") {
      this.renderer.addClass(mainElement, "dark");
    } else {
      this.renderer.removeClass(mainElement, "dark");
    }
  }

  getCurrentScheme(): string {
    return this.currentScheme;
  }
}
