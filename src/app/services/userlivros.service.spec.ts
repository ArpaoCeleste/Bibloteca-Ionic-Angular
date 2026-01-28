import { TestBed } from '@angular/core/testing';

import { userlivroService } from './userlivros.service';

describe('userlivroService', () => {
  let service: userlivroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(userlivroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});