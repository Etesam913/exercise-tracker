import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "exerciseType",
  standalone: true,
})
export class ExerciseTypePipe implements PipeTransform {
  transform(value: string): string {
    return (
      value.slice(0, 1).toUpperCase() + value.slice(1).replaceAll("-", " ")
    );
  }
}
