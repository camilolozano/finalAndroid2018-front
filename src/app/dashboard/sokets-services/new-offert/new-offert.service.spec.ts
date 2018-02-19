import { TestBed, inject } from '@angular/core/testing';

import { NewOffertService } from './new-offert.service';

describe('NewOffertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewOffertService]
    });
  });

  it('should be created', inject([NewOffertService], (service: NewOffertService) => {
    expect(service).toBeTruthy();
  }));
});
