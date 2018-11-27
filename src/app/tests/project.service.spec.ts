import { TestBed, async } from '@angular/core/testing';
import { ProjectService } from '../services/project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http'
import { defer } from 'rxjs';

function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

describe("Project's service", () => {
    let httpClientSpy: { get: jasmine.Spy };
    let projectService: ProjectService;

    beforeEach(() => {
        // TODO: spy on other methods too
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        projectService = new ProjectService(<any>httpClientSpy);
    });

    it('Must return the given project', () => {
        var data = [{"researchTeam":[],"workTeam":[],"hiredStaff":[],"leader":[],"relatedPublications":[],"relatedTools":[],"_id":"5bd79886addca429f504da62","__v":0}];
        var test = httpClientSpy.get.and.returnValue(asyncData(data));
        projectService.getProjects().subscribe(
            project => expect(project).toEqual(project, 'expected data'),
    fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('Must return a 404 error whenever the server send it', () => {
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