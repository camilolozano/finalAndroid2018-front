import { TestBed, inject } from '@angular/core/testing';

import { EnterPasswordService } from './enter-password.service';

describe('EnterPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterPasswordService]
    });
  });

  it('should be created', inject([EnterPasswordService], (service: EnterPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
