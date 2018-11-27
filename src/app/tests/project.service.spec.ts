import { TestBed, async } from '@angular/core/testing';
import { ProjectService } from '../services/project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http'
import { defer } from 'rxjs';
import { Project } from '../models/project';

function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

describe("Project's service", () => {
    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, delete: jasmine.Spy };
    let projectService: ProjectService;

    beforeEach(() => {
        // TODO: spy on other methods too
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
        projectService = new ProjectService(<any>httpClientSpy);
    });

    it('must return the given project', () => {
        var pro: Project = new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []);
        var test = httpClientSpy.get.and.returnValue(asyncData(pro));
        projectService.getProject("5bd79886addca429f504da62").subscribe(
            project => expect(project).toEqual(pro, 'expected data'),
    fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('must return the two projects', () => {
        var data = [{"researchTeam":[],"workTeam":[],"hiredStaff":[],"leader":[],"relatedPublications":[],"relatedTools":[],"_id":"5bd79886addca429f504da62","__v":0},{"_id":"5bf95ebb4568120016585dc5","researchTeam":["Estrella Aguilera Moreno"," Manuel Herrera Avila"],"workTeam":["Estrella Aguilera Moreno"],"hiredStaff":["Estrella Aguilera Moreno"," Manuel Herrera Avila"],"leader":["Estrella"],"relatedPublications":[""],"relatedTools":[""],"title":"ISA","reference":"reference","scope":"OTROS","status":"ACEPTADO","sponsor":"","startDate":"2018-10-10T00:00:00.000Z","endDate":"2019-10-10T00:00:00.000Z","amount":0,"__v":0}];
        var test = httpClientSpy.get.and.returnValue(asyncData(data));
        projectService.getProjects().subscribe(
            projects => expect(projects).toEqual(data, 'expected data'),
    fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('must return a new project', () => {
        var data = {"researchTeam": [], "workTeam": [], "hiredStaff": [], "title":"isa", "description":"", "leader":[], "reference":"#1234", "scope":"OTROS", "status":"ACEPTADO", "sponsor":"", "startDate":null, "endDate":null, "amount":0,"relatedPublications":[],"relatedTools":[],"_id":"5bd79886addca429f504da62","__v":0};
        let pro = new Project([],[],[],"isa","",[],"#1234","OTROS",status="ACEPTADO","",null,null,0,[],[]);
        var test = httpClientSpy.post.and.returnValue(asyncData(data));
        projectService.createV2(pro).subscribe(
            project => {
                expect(project).toEqual(data, 'expected data')
            },
    fail 
        );
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    });

    it('must delete the given project', () => {
        var data = [{"researchTeam":[],"workTeam":[],"hiredStaff":[],"leader":[],"relatedPublications":[],"relatedTools":[],"_id":"5bd79886addca429f504da62","__v":0}];
        var test = httpClientSpy.delete.and.returnValue(asyncData(data));
        projectService.deleteProject("5bd79886addca429f504da62").subscribe(
            project => expect(project).toEqual(project, 'expected data'),
    fail
        );
        expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
    });

    it('must return a 404 error whenever the server send it', () => {
        const errorResponse = new HttpErrorResponse({
          error: 'test 404 error',
          status: 404, statusText: 'Not Found'
        });
       
        let test = httpClientSpy.get.and.returnValue(asyncError(errorResponse));
        
        projectService.getProjects().subscribe(
          projects => fail('expected an error, not projects'),
          error  => expect(error).toContain('test 404 error')
        );
      });
      
      



});

export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
  }