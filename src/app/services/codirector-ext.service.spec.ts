import { TestBed } from '@angular/core/testing';

import { CodirectorExtService } from './codirector-ext.service';

describe('CodirectorExtService', () => {
  let service: CodirectorExtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodirectorExtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
