import { TestBed } from '@angular/core/testing';

import { FirebaseAuthStateService } from './firebase-auth-state.service';

describe('FirebaseAuthStateService', () => {
  let service: FirebaseAuthStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAuthStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
