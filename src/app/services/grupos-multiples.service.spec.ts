import { TestBed } from '@angular/core/testing';

import { GruposMultiplesService } from './grupos-multiples.service';

describe('GruposMultiplesService', () => {
  let service: GruposMultiplesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposMultiplesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
