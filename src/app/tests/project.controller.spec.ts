// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe("Project's controller", () => {
    // Create the http client and set the server url, that depends on the enviroment
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let baseUrl = environment.serverUrl + '/api/project';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        // Inject the http service and test controller for each test
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    /// Tests begin ///

    it('get projects', () => {
        // A mock of the project the server should return
        var datos = [{ "researchTeam": [], "workTeam": [], "hiredStaff": [], "leader": [], "relatedPublications": [], "relatedTools": [], "_id": "5bd79886addca429f504da62", "__v": 0 }];
        let url = baseUrl + "s";
        // Make an HTTP GET request
        httpClient.get(url)
            .subscribe(data =>
                // When observable resolves, result should match test data
                expect(data).toEqual(datos)
            );

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(url);

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(datos);

        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('get project by id', () => {
        // A mock of the project the server should return
        var datos = [{ "researchTeam": [], "workTeam": [], "hiredStaff": [], "leader": [], "relatedPublications": [], "relatedTools": [], "_id": "5bd79886addca429f504da62", "__v": 0 }];
        let url = baseUrl + "/5bd79886addca429f504da62";
        // Make an HTTP GET request
        httpClient.get(url)
            .subscribe(data =>
                // When observable resolves, result should match test data
                expect(data).toEqual(datos)
            );

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(url);

        // Assert that the request is a GET.
        expect(req.request.method).toEqual('GET');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(datos);

        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('save project', () => {
        // A mock of the project the server should return and it is used as data on the POST request
        var datos = [{ "researchTeam": [], "workTeam": [], "hiredStaff": [], "leader": [], "relatedPublications": [], "relatedTools": [] }];
        let url = baseUrl;
        // Make an HTTP POST request
        httpClient.post(url, datos)
            .subscribe(data =>
                // When observable resolves, result should match test data
                expect(data).toEqual(datos)
            );

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(url);

        // Assert that the request is a POST.
        expect(req.request.method).toEqual('POST');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(datos);

        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    it('delete project by id', () => {
        // A mock of the project the server should return
        var datos = [{ "researchTeam": [], "workTeam": [], "hiredStaff": [], "leader": [], "relatedPublications": [], "relatedTools": [], "_id": "5bd79886addca429f504da62", "__v": 0 }];
        let url = baseUrl + "/5bd79886addca429f504da62";
        // Make an HTTP DELETE request
        httpClient.delete(url)
            .subscribe(data =>
                // When observable resolves, result should match test data
                expect(data).toEqual(datos)
            );

        // The following `expectOne()` will match the request's URL.
        // If no requests or multiple requests matched that URL
        // `expectOne()` would throw.
        const req = httpTestingController.expectOne(url);

        // Assert that the request is a DELETE.
        expect(req.request.method).toEqual('DELETE');

        // Respond with mock data, causing Observable to resolve.
        // Subscribe callback asserts that correct data was returned.
        req.flush(datos);

        // Finally, assert that there are no outstanding requests.
        httpTestingController.verify();
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });
});

