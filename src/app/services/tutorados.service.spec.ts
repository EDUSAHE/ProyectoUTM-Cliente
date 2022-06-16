import { TestBed } from '@angular/core/testing';

import { TutoradosService } from './tutorados.service';

describe('TutoradosService', () => {
  let service: TutoradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutoradosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
