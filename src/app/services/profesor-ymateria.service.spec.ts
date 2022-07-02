import { TestBed } from '@angular/core/testing';

import { ProfesorYmateriaService } from './profesor-ymateria.service';

describe('ProfesorYmateriaService', () => {
  let service: ProfesorYmateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesorYmateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
