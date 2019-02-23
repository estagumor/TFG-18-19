import { TestBed } from '@angular/core/testing';

import { ScopusService } from './scopus.service';

describe('ScopusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScopusService = TestBed.get(ScopusService);
    expect(service).toBeTruthy();
  });
});
