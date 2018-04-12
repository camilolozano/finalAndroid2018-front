import { TestBed, inject } from '@angular/core/testing';

import { CreateCompaniesService } from './create-companies.service';

describe('CreateCompaniesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCompaniesService]
    });
  });

  it('should be created', inject([CreateCompaniesService], (service: CreateCompaniesService) => {
    expect(service).toBeTruthy();
  }));
});
