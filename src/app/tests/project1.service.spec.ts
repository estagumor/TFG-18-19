import { TestBed, async } from '@angular/core/testing';
import { ProjectService } from '../services/project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { defer } from 'rxjs';

function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

describe('ProjectService', () => {
    // let httpClientSpy: { get: jasmine.Spy };
    // let heroService: ProjectService;

    // beforeEach(() => {
    //     // TODO: spy on other methods too
    //     httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    //     heroService = new ProjectService(<any>httpClientSpy);
    //     console.log(heroService);
    // });

    // it('should return expected heroes (HttpClient called once)', () => {
    //     var data = [{"researchTeam":[],"workTeam":[],"hiredStaff":[],"leader":[],"relatedPublications":[],"relatedTools":[],"_id":"5bd79886addca429f504da62","__v":0}];
    //     var test = httpClientSpy.get.and.returnValue(asyncData(data));
    //     console.log(test);
    //     console.log(heroService.getProjects());
    //     console.log(heroService.url);
    //     heroService.getProjects().subscribe(
    //         heroes => heroes.subscribe(res => {expect(heroes.length).toBe(22)})
    //     );
    // });



});

