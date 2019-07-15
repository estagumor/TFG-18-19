import { TestBed, async } from '@angular/core/testing';
import { PublicationService } from '../../services/publication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http'
import { defer } from 'rxjs';
import { Publication } from '../../models/publication';
import { Project } from 'src/app/models/project';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe("Publication's service", () => {
  // Set the http methods where Jasmine is going to intercept the requests
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };
  let publicationService: PublicationService;

  beforeEach(() => {
    // Instance the spied class and set the http methods to be spied
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    publicationService = new PublicationService(<any>httpClientSpy);
  });

  it('must create a publication and return it', () => {
    // An empty project to be returned by the spy
    
    var pubMocked = {
      "scopusId": "",
      "articleTitle": null,
      "sourceType": "",
      "documentType": "",
      "sourceTitle": "",
      "sourceVolume": "",
      "pageRange": "",
      "publicationDate": "",
      "DOI": "",
      "firstAuthor": null,
      "affiliation": "",
      "assigned": false,
      "project": null
    }
    var pro: Publication = new Publication("", "title", "Book", "Book", "", 0, "", "", "", "", "", [], "", false, null,null,null);
    // The httpClientSpy will return the previous project on a 'POST' request
    var test = httpClientSpy.post.and.returnValue(asyncData(pubMocked));
    // Makes the request to the server and expect the returned data to be equal than 'pro'
    publicationService.create(pro).subscribe(
      pub => expect(pub).toEqual(pub, 'expected data'),
      fail
    );
    // Expect that the httpClientSpy has received just one request
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('must return an error', () => {
    // Instantiate an error response that the server will return
    const errorResponse = new HttpErrorResponse({
      error: 'test 500 error',
      status: 500, statusText: 'Error while creating'
    });
    var pro: Publication = new Publication("", "title", "Book", "Book", "", 0, "", "", "", "", "", [], "", false,null,null,null);
    // The httpClientSpy will return the previous array on a 'POST' request
    var test = httpClientSpy.post.and.returnValue(asyncError(errorResponse));
    // Makes the request to the server and expects the returned data to be equal than 'data'
    publicationService.create(pro).subscribe(

      pub => {
        
        fail('expected an error, not pub')
      },
      error => expect(error.error).toContain('test 500 error')
    );
    // Expect that the httpClientSpy has received just one request
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('must return the two projects', () => {
    // An array of two projects to be returned by the spy
    var data = [
      {
      "scopusId": "",
      "articleTitle": "title",
      "sourceType": "Book",
      "documentType": "Book",
      "sourceTitle": "",
      "sourceVolume": "",
      "sourceIdentifier": null,
      "ORCID": "",
      "pageRange": "",
      "publicationDate": "",
      "DOI": "",
      "firstAuthor": "autor",
      "affiliation": "",
      "assigned": false,
      "_id":"5bd79886addca429f504da62",
      "__v":0,
      "project":null},
      {
      "scopusId": "",
      "articleTitle": "title",
      "sourceType": "Book",
      "documentType": "Book",
      "sourceTitle": "",
      "sourceVolume": "",
      "sourceIdentifier": null,
      "ORCID": "",
      "pageRange": "",
      "publicationDate": "",
      "DOI": "",
      "firstAuthor": "autor",
      "affiliation": "",
      "assigned": false,
      "_id":"5bd79886addca429f504da62",
      "__v":0,
      "project":null
    }];
    // The httpClientSpy will return the previous array on a 'GET' request
    var test = httpClientSpy.get.and.returnValue(asyncData(data));
    // Makes the request to the server and expects the returned data to be equal than 'data'
    publicationService.list().subscribe(
      pubs => expect(pubs).toEqual(data, 'expected data'),
      fail
    );
    // Expect that the httpClientSpy has received just one request
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('must return two projects available due to limit = 3', () => {
    // An array of two projects to be returned by the spy
    var data = [
      {
      "scopusId": "",
      "articleTitle": "title",
      "sourceType": "Book",
      "documentType": "Book",
      "sourceTitle": "",
      "sourceVolume": "",
      "sourceIdentifier": null,
      "ORCID": "",
      "pageRange": "",
      "publicationDate": "",
      "DOI": "",
      "firstAuthor": "autor",
      "affiliation": "",
      "assigned": false,
      "_id":"5bd79886addca429f504da62",
      "project":null,
      "__v":0},
      {
      "scopusId": "",
      "articleTitle": "title",
      "sourceType": "Book",
      "documentType": "Book",
      "sourceTitle": "",
      "sourceVolume": "",
      "sourceIdentifier": null,
      "ORCID": "",
      "pageRange": "",
      "publicationDate": "",
      "DOI": "",
      "firstAuthor": "autor",
      "affiliation": "",
      "assigned": false,
      "_id":"5bd79886addca429f504da62",
      "project":null,
      "__v":0
    }];
    // The httpClientSpy will return the previous array on a 'GET' request
    var test = httpClientSpy.get.and.returnValue(asyncData(data));
    // Makes the request to the server and expects the returned data to be equal than 'data'
    publicationService.list(3).subscribe(
      pubs => expect(pubs).toEqual(data, 'expected data'),
      fail
    );
    // Expect that the httpClientSpy has received just one request
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('must create two publications and return them', () => {
    // An empty project to be returned by the spy
    var pubMocked = [{
      "scopusId": "",
      "articleTitle": "title",
      "sourceType": "Book",
      "documentType": "Book",
      "sourceTitle": "",
      "sourceVolume": "",
      "sourceIdentifier": null,
      "ORCID": "",
      "pageRange": "",
      "publicationDate": "",
      "DOI": "",
      "firstAuthor": "autor",
      "affiliation": "",
      "project":null,
      "assigned": false
    },{
      "scopusId": "",
      "articleTitle": "title",
      "sourceType": "Book",
      "documentType": "Book",
      "sourceTitle": "",
      "sourceVolume": "",
      "sourceIdentifier": null,
      "ORCID": "",
      "pageRange": "",
      "publicationDate": "",
      "DOI": "",
      "firstAuthor": "autor",
      "affiliation": "",
      "project":null,
      "assigned": false
    }]
    var pro: Publication = new Publication("", "title", "Book", "Book", "", 0, "", "", "", "", "", [], "", false, null,null,null);
    var project: Project = new Project([],[],[], "sfds", "", [], "sfds", "REGIONAL","OTROS","", null, null, 200, [])
    // The httpClientSpy will return the previous project on a 'POST' request
    var test = httpClientSpy.post.and.returnValue(asyncData(pubMocked));
    // Makes the request to the server and expect the returned data to be equal than 'pro'
    publicationService.saveAll([pro,pro],[project]).subscribe(
      pub => expect(pub).toEqual(pubMocked, 'expected data'),
      fail
    );
    // Expect that the httpClientSpy has received just one request
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('must update the publication', () => {
    var pub: Publication = new Publication("", "title", "Book", "Book", "", 0, "", "", "", "", "", [], "", false,null,null,null);
    var test = httpClientSpy.put.and.returnValue(asyncData(pub));
    var updated = pub
    updated.articleTitle = "updated title"
    publicationService.updatePublication(updated).subscribe(res => {
        expect(pub.articleTitle).toEqual('updated title', 'expected data')
        expect(test).toHaveBeenCalled()
    }, fail);
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  }); 
});

// Given an object return a Promise
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}