import { Component } from "@angular/core";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HlmButtonDirective],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "exercise-tracker";
}
