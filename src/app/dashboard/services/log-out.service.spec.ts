import { TestBed, inject } from '@angular/core/testing';

import { LogOutService } from './log-out.service';

describe('LogOutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogOutService]
    });
  });

  it('should be created', inject([LogOutService], (service: LogOutService) => {
    expect(service).toBeTruthy();
  }));
});
