import { TestBed, inject } from '@angular/core/testing';

import { DetailAllEventsService } from './detail-all-events.service';

describe('DetailAllEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailAllEventsService]
    });
  });

  it('should be created', inject([DetailAllEventsService], (service: DetailAllEventsService) => {
    expect(service).toBeTruthy();
  }));
});
