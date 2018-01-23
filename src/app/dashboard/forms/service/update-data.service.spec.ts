import { TestBed, inject } from '@angular/core/testing';

import { UpdateDataService } from './update-data.service';

describe('UpdateDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateDataService]
    });
  });

  it('should be created', inject([UpdateDataService], (service: UpdateDataService) => {
    expect(service).toBeTruthy();
  }));
});
