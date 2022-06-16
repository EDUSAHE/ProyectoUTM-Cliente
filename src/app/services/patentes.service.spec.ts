import { TestBed } from '@angular/core/testing';

import { PatentesService } from './patentes.service';

describe('PatentesService', () => {
  let service: PatentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
