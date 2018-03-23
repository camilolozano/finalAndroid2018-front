import { TestBed, inject } from '@angular/core/testing';

import { ListOffersService } from './list-offers.service';

describe('ListOffersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListOffersService]
    });
  });

  it('should be created', inject([ListOffersService], (service: ListOffersService) => {
    expect(service).toBeTruthy();
  }));
});
