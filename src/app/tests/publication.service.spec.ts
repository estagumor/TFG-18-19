import { TestBed } from '@angular/core/testing';

import { PublicationService } from '../services/publication.service';

describe('PublicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicationService = TestBed.get(PublicationService);
    expect(service).toBeTruthy();
  });
});
