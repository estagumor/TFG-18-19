import { TestBed, async } from '@angular/core/testing';
import { ProjectService } from '../../services/project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http'
import { defer } from 'rxjs';
import { Project } from '../../models/project';

function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

// Given an object return a Promise
export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}

describe("Project's service", () => {
    // Set the http methods where Jasmine is going to intercept the requests
    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, delete: jasmine.Spy, put: jasmine.Spy };
    let projectService: ProjectService;

    beforeEach(() => {
        // Instance the spied class and set the http methods to be spied
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put']);
        projectService = new ProjectService(<any>httpClientSpy);
    });

    it('must return a new project', () => {
        // The project that the server should return
        var data = { "researchTeam": [], "workTeam": [], "hiredStaff": [], "title": "isa", "description": "", "leader": [], "reference": "#1234", "scope": "OTROS", "status": "ACEPTADO", "sponsor": "", "startDate": null, "endDate": null, "amount": 0, "relatedTools": [], "_id": "5bd79886addca429f504da62", "__v": 0 };
        // The project that the service will send
        let pro = new Project([], [], [], "isa", "", [], "#1234", "OTROS", status = "ACEPTADO", "", null, null, 0, []);
        // The httpClientSpy will return 'data' on a 'POST' request
        var test = httpClientSpy.post.and.returnValue(asyncData(data));
        // Makes the request and expects the returned project is equal to 'data'
        projectService.createV2(pro).subscribe(
            project => {
                expect(project).toEqual(data, 'expected data')
                expect(test).toHaveBeenCalled()
            },
            fail
        );
        // Expect that the httpClientSpy has received just one request
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });

    it('must return the given project', () => {
        // An empty project to be returned by the spy
        var pro: Project = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, []);
        // The httpClientSpy will return the previous project on a 'GET' request
        var test = httpClientSpy.get.and.returnValue(asyncData(pro));
        // Makes the request to the server and expect the returned data to be equal than 'pro'
        projectService.getProject("5bd79886addca429f504da62").subscribe(
            project => {
                expect(project).toEqual(pro, 'expected data')
                expect(test).toHaveBeenCalled()
            },
            fail
        );
        // Expect that the httpClientSpy has received just one request
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('must return the project with title "ISA"', () => {
        // An empty project to be returned by the spy
        var pro: Project = new Project([], [], [], 'ISA', '', [], '', '', '', '', null, null, null, []);
        // The httpClientSpy will return the previous project on a 'GET' request
        var test = httpClientSpy.get.and.returnValue(asyncData(pro));
        // Makes the request to the server and expect the returned data to be equal than 'pro'
        projectService.findByTitle("ISA").subscribe(
            project => {
                expect(project).toEqual(pro, 'expected data')
                expect(project.title).toEqual('ISA', 'expected title')
                expect(test).toHaveBeenCalled()
            }, fail);
        // Expect that the httpClientSpy has received just one request
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('must return the project with reference "123456A"', () => {
        // An empty project to be returned by the spy
        var pro: Project = new Project([], [], [], '', '', [], '123456A', '', '', '', null, null, null, []);
        // The httpClientSpy will return the previous project on a 'GET' request
        var test = httpClientSpy.get.and.returnValue(asyncData(pro));
        // Makes the request to the server and expect the returned data to be equal than 'pro'
        projectService.findByReference("123456A").subscribe((project) => {
            expect(project).toEqual(pro, 'expected data')
            expect(project.reference).toEqual('123456A', 'expected data')
            expect(test).toHaveBeenCalled()
        }, fail)
        // Expect that the httpClientSpy has received just one request
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('must return the two projects', () => {
        // An array of two projects to be returned by the spy
        var data = [{ "researchTeam": [], "workTeam": [], "hiredStaff": [], "leader": [], "relatedTools": [], "_id": "5bd79886addca429f504da62", "__v": 0 }, { "_id": "5bf95ebb4568120016585dc5", "researchTeam": ["Estrella Aguilera Moreno", " Manuel Herrera Avila"], "workTeam": ["Estrella Aguilera Moreno"], "hiredStaff": ["Estrella Aguilera Moreno", " Manuel Herrera Avila"], "leader": ["Estrella"], "relatedTools": [""], "title": "ISA", "reference": "reference", "scope": "OTROS", "status": "ACEPTADO", "sponsor": "", "startDate": "2018-10-10T00:00:00.000Z", "endDate": "2019-10-10T00:00:00.000Z", "amount": 0, "__v": 0 }];
        // The httpClientSpy will return the previous array on a 'GET' request
        var test = httpClientSpy.get.and.returnValue(asyncData(data));
        // Makes the request to the server and expects the returned data to be equal than 'data'
        projectService.getProjects().subscribe(
            projects => {
                expect(projects).toEqual(data, 'expected data')
                expect(test).toHaveBeenCalled()
            },
            fail
        );
        // Expect that the httpClientSpy has received just one request
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('must update the given project with title "updated title"', () => {
        // The project that the server will return
        var pro: Project = new Project([], [], [], '', '', [], '123456A', '', '', '', null, null, null, []);
        // Makes the httpClientSpy return the previous project on a 'PUT' request
        var test = httpClientSpy.put.and.returnValue(asyncData(pro));
        // Makes the request and expects the returned project is equal to 'data'
        var updated = pro
        updated.title = "updated title"
        projectService.updateProject(updated).subscribe(
            project => {
                expect(project.title).toEqual('updated title', 'expected data')
                expect(test).toHaveBeenCalled()
            },
            fail
        );
        // Expect that the httpClientSpy has received just one request
        expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
    });

    it('must delete the given project', () => {
        // The project that the server will return
        var data = [{ "researchTeam": [], "workTeam": [], "hiredStaff": [], "leader": [], "relatedTools": [], "_id": "5bd79886addca429f504da62", "__v": 0 }];
        // Makes the httpClientSpy return the previous project on a 'DELETE' request
        var test = httpClientSpy.delete.and.returnValue(asyncData(data));
        // Makes the request and expects the returned project is equal to 'data'
        projectService.deleteProject("5bd79886addca429f504da62").subscribe(
            project => {
                expect(project).toEqual(project, 'expected data')
                expect(test).toHaveBeenCalled()
            },
            fail
        );
        // Expect that the httpClientSpy has received just one request
        expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
    });

    it('must return a 404 error whenever the server send it', () => {
        // Instantiate an error response that the server will return
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not Found'
        });

        // Makes the httpClientSpy return the previous error via a Promise
        let test = httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        // Makes the request and expects the returned error contains the message from 'errorResponse'
        projectService.getProjects().subscribe(
            projects => fail('expected an error, not projects'),
            error => {
                expect(error.error).toContain('test 404 error')
                expect(test).toHaveBeenCalled()
            }
        );
    });

    it('must return the project whose start date is less than 15 years older than actual date', () => {
        // An array of two projects to be returned by the spy
        var data = [{ "researchTeam": [], "startDate":"10/10/2012", "workTeam": [], "hiredStaff": [], "leader": [], "relatedTools": [], "_id": "5bd79886addca429f504da62", "__v": 0 }];
        // The httpClientSpy will return the previous array on a 'GET' request
        var test = httpClientSpy.get.and.returnValue(asyncData(data));
        // Makes the request to the server and expects the returned data to be equal than 'data'
        projectService.getProjects().subscribe(
            projects => {
                expect(projects).toEqual(data, 'expected data')
                expect(test).toHaveBeenCalled()
            },
            fail
        );
        // Expect that the httpClientSpy has received just one request
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });





});