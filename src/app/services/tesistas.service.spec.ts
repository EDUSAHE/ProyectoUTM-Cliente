import { TestBed } from '@angular/core/testing';

import { TesistasService } from './tesistas.service';

describe('TesistasService', () => {
  let service: TesistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
