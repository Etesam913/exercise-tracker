import { TestBed } from "@angular/core/testing";

import { FirebaseAuthActionsService } from "./firebase-auth.service";

describe("FirebaseAuthService", () => {
  let service: FirebaseAuthActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAuthActionsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
