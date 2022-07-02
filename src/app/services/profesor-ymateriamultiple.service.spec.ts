import { TestBed } from '@angular/core/testing';

import { ProfesorYmateriamultipleService } from './profesor-ymateriamultiple.service';

describe('ProfesorYmateriamultipleService', () => {
  let service: ProfesorYmateriamultipleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorYmateriamultipleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
