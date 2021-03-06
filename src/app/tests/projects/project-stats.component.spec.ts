import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatsComponent } from '../../components/project-stats/project-stats.component';
import { ProjectService } from 'src/app/services/project.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

describe('ProjectStatsComponent', () => {
  let component: ProjectStatsComponent;
  let fixture: ComponentFixture<ProjectStatsComponent>;
  let element: HTMLElement;
  let projectService: ProjectService;
  let projectServiceStub: Partial<ProjectService>;
  let getNewProjectsSpy;
  let persons = [{
    "name": "José Antonio",
    "surname": "Parejo",
    "email": "japarejo at us punto es",
    "photo": "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
    "telf": "954556877",
    "allowed": true,
    "job": "RESEARCHER",
    "office": "I0.71",
    "scopusId": "24802465400",
    "professionalStatus": "RESEARCHER",
    "urls": [],
    "active": true,
    "_id": "5cefa10805b13e789525ce33",
  }];
  let projects = [{
  "researchTeam": persons,
  "workTeam": [],
  "hiredStaff": [],
  "title": "Metamorphic testing of RESTful Web APIs",
  "description": "This is a description",
  "leader": persons[0],
  "reference": "001",
  "scope": "EUROPEO",
  "status": "ACEPTADO",
  "sponsor": "This is a sponsor",
  "startDate": new Date("2017-01-01"),
  "endDate": new Date("2017-12-31"),
  "amount": 200000,
  "relatedTools": []
}, {
  "researchTeam": persons,
  "workTeam": [],
  "hiredStaff": [],
  "title": "Metamorphic testing of RESTful Web APIs",
  "description": "This is a description",
  "leader": persons[0],
  "reference": "001",
  "scope": "EUROPEO",
  "status": "ACEPTADO",
  "sponsor": "This is a sponsor",
  "startDate": new Date("2015-01-01"),
  "endDate": new Date("2017-06-31"),
  "amount": 200000,
  "relatedTools": []
},{
  "researchTeam": persons,
  "workTeam": [],
  "hiredStaff": [],
  "title": "Metamorphic testing of RESTful Web APIs",
  "description": "This is a description",
  "leader": persons[0],
  "reference": "001",
  "scope": "EUROPEO",
  "status": "ACEPTADO",
  "sponsor": "This is a sponsor",
  "startDate": new Date("2019-01-01"),
  "amount": 200000,
  "relatedTools": []
},{
  "researchTeam": persons,
  "workTeam": [],
  "hiredStaff": [],
  "title": "Metamorphic testing of RESTful Web APIs",
  "description": "This is a description",
  "leader": persons[0],
  "reference": "001",
  "scope": "EUROPEO",
  "status": "ACEPTADO",
  "sponsor": "This is a sponsor",
  "startDate": new Date("2015-01-01"),
  "amount": 200000,
  "relatedTools": []
},{
  "researchTeam": persons,
  "workTeam": [],
  "hiredStaff": [],
  "title": "Metamorphic testing of RESTful Web APIs",
  "description": "This is a description",
  "leader": persons[0],
  "reference": "001",
  "scope": "EUROPEO",
  "status": "ACEPTADO",
  "sponsor": "This is a sponsor",
  "startDate": new Date("2017-09-01"),
  "amount": 200000,
  "relatedTools": []
},{
  "researchTeam": persons,
  "workTeam": [],
  "hiredStaff": [],
  "title": "Metamorphic testing of RESTful Web APIs",
  "description": "This is a description",
  "leader": persons[0],
  "reference": "001",
  "scope": "EUROPEO",
  "status": "ACEPTADO",
  "sponsor": "This is a sponsor",
  "startDate": new Date("2015-01-01"),
  "endDate": new Date("2015-03-03"),
  "amount": 200000,
  "relatedTools": []
},{
  "researchTeam": persons,
  "workTeam": [],
  "hiredStaff": [],
  "title": "Metamorphic testing of RESTful Web APIs",
  "description": "This is a description",
  "leader": persons[0],
  "reference": "001",
  "scope": "EUROPEO",
  "status": "ACEPTADO",
  "sponsor": "This is a sponsor",
  "startDate": new Date("2015-01-01"),
  "endDate": new Date("2017-04-31"),
  "amount": 200000,
  "relatedTools": []
}];

  beforeEach(async(() => {
    // projectServiceStub = {
    //   getNewsProjects: function() {
    //     return of({"body": {"projects": projects } })
    //   }
    // }

    const projectService = jasmine.createSpyObj("ProjectService", ["getNewsProjects"]);
    getNewProjectsSpy = projectService.getNewsProjects.and.returnValue(of({"body": {"projects": projects}}))
    TestBed.configureTestingModule({
      declarations: [ ProjectStatsComponent ],
      imports: [ChartsModule],
      providers: [{provide: ProjectService, useValue: projectService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should return the values correctly', () => {
    expect(component.avgAm).toEqual([220140, 72157, 70740, 70740, 187915, 145303, 102960, 102960, 309537, 102960, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
    expect(component.count).toEqual([3, 3, 2, 2, 4, 4, 3, 3, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }); 
});
