import { TestBed, inject } from '@angular/core/testing';

import { AllEventsService } from './all-events.service';

describe('AllEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllEventsService]
    });
  });

  it('should be created', inject([AllEventsService], (service: AllEventsService) => {
    expect(service).toBeTruthy();
  }));
});
