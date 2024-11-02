import { ErrorHandler, Injectable } from "@angular/core";
import { toast } from "ngx-sonner";

@Injectable({
  providedIn: "root",
})
export class GlobalErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    // Log the error (you can also send it to an external logging service)
    console.error("An error occurred:", error);

    // Handle specific error types if necessary
    if (error.status === 404) {
      console.warn("Resource not found");
    } else if (error.status === 500) {
      console.warn("Server error");
    } else {
      // Handle generic error
      console.warn("An unexpected error occurred");
    }
    console.log("should show toast");
    toast("An Unexpected Error Occurred", {
      position: "top-right",
      dismissible: true,

      description: "Please try again later!",
    });
  }

  constructor() {}
}
