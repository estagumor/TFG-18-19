import { TestBed } from '@angular/core/testing';

import { PersonService } from '../../services/person.service';

describe('PersonService', () => {
  // Set the http methods where Jasmine is going to intercept the requests
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
  let publicationService: PersonService;

  beforeEach(() => {
    // Instance the spied class and set the http methods to be spied
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    publicationService = new PersonService(<any>httpClientSpy);
  });
});
