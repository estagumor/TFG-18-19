import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProjectsComponent } from './projects.component';
import {APP_BASE_HREF} from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { defer } from 'rxjs';


import { RouterModule, Routes } from '@angular/router';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, delete: jasmine.Spy };
  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsComponent ],
      imports: [ReactiveFormsModule, FormsModule,HttpClientModule, RouterModule.forRoot([])],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    projectService = new ProjectService(<any>httpClientSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should fill responseFind when a id is prompted', () => {
  //   fixture.detectChanges()
  //   let vacio =  new Project([], [], [], '', '', [], '', '', '', '', null, null, null, [], []);
  //   let relleno =  new Project([], [], [], 'isa', '', [], '#1234', 'OTROS', 'ACEPTADO', '', null, null, 0, [], []);
  //   let data = {"researchTeam": [], "workTeam": [], "hiredStaff": [], "title":"isa", "description":"", "leader":[], "reference":"#1234", "scope":"OTROS", "status":"ACEPTADO", "sponsor":"", "startDate":null, "endDate":null, "amount":0,"relatedPublications":[],"relatedTools":[],"_id":"5bd79886addca429f504da62","__v":0};
  //   var test = httpClientSpy.get.and.returnValue(asyncData(data));
  //   expect(component.responseFind).toEqual(vacio, 'empty project');
  //   component.projectId = "5bd79886addca429f504da62";
  //   component.find();
  //   console.log(component.responseFind);
  //   expect(component.responseFind).toEqual(relleno);

  // });
});


function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}