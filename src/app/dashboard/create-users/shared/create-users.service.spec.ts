import { TestBed, inject } from '@angular/core/testing';

import { CreateUsersService } from './create-users.service';

describe('CreateUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateUsersService]
    });
  });

  it('should be created', inject([CreateUsersService], (service: CreateUsersService) => {
    expect(service).toBeTruthy();
  }));
});
