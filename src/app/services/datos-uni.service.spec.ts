import { TestBed } from '@angular/core/testing';

import { DatosUniService } from './datos-uni.service';

describe('DatosUniService', () => {
  let service: DatosUniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosUniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
