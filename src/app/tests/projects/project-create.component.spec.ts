import { async, ComponentFixture, TestBed, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProjectCreateComponent } from '../../components/project-create/project-create.component';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatAutocompleteModule,MatInputModule, MatChipsModule, MatIconModule } from '@angular/material';
import { AcompleteComponent } from '../../components/acomplete/acomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { } from '@angular/router/testing';
import { Person } from 'src/app/models/person';

function parsePerson(array): Person{
  return new Person(array[0],array[1],array[2],array[3],array[4],array[5],array[6],array[7],array[8],array[9],array[10],array[11])
}

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
      super();
      this.params = of({id: "5"});
  }

  setParamsMock (params) {
    this.params = params
  }
}

describe("Project's component", () => {
  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;
  let element: HTMLElement;
  // Spies to intercept calls to the service
  let listSpy;
  let getterSpy;
  let createSpy;
  let projectService: ProjectService;
  let personService: PersonService;
  let personServiceStub: Partial<PersonService>;
  let updateSpy;
  let routerSpy;
  let router;
  let getAllSpy;
  let activatedRouteStub: MockActivatedRoute;
  let persons = [{
    "name" : "José Antonio",
    "surname" : "Parejo",
    "email" : "japarejo at us punto es",
    "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
    "telf" : "954556877",
    "allowed" : true,
    "job" : "RESEARCHER",
    "office" : "I0.71",
    "scopusId" : "24802465400",
    "professionalStatus" : "RESEARCHER",
    "urls" : [],
    "active" : true,
    "_id" : "5cefa10805b13e789525ce33",
},{
  "name" : "José Antonio",
  "surname" : "Parejo",
  "email" : "japarejo at us punto es",
  "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
  "telf" : "954556877",
  "allowed" : true,
  "job" : "HIRED",
  "office" : "I0.71",
  "scopusId" : "24802465400",
  "professionalStatus" : "RESEARCHER",
  "urls" : [],
  "active" : true,
  "_id" : "5cefa10805b13e789525ce33",
}]

  beforeEach(async(() => {
    personServiceStub = {
        getAll: function(){
            return of({"body": {"persons": []}})
        }
    }
    activatedRouteStub = new MockActivatedRoute()
    const personService = jasmine.createSpyObj("PersonService", ["getAll"]);
    getAllSpy = personService.getAll.and.returnValue(of({"body": {"persons": {}}}))
    // Set the component configuration and add it the necessary imports
    TestBed.configureTestingModule({
      declarations: [ProjectCreateComponent, AcompleteComponent],
      imports: [ReactiveFormsModule, FormsModule,NgbModule, HttpClientModule, MatAutocompleteModule, MatInputModule, MatChipsModule, BrowserAnimationsModule, MatIconModule, RouterModule.forRoot([])],
      providers: [{provide: ActivatedRoute, useValue: activatedRouteStub}, {provide: ComponentFixtureAutoDetect, useValue: true}, { provide: APP_BASE_HREF, useValue: '/' }, {provide: PersonService, useValue: personServiceStub}]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Tools to navigate in the DOM
    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    projectService = bannerDe.injector.get(ProjectService);
    personService = bannerDe.injector.get(PersonService)
    router = bannerDe.injector.get(Router)
    // Instantiate the spies to listen in the service methods
    // It returns true because we don't verify the response, just check that it is called
    listSpy = spyOn(projectService, 'getProjects').and.returnValue(of({"body": {"projects": {}}}));
    getterSpy = spyOn(projectService, 'getProject').and.returnValue(of({"body": {"project": {
      "_id" : "5cefa10805b13e789525ce31",
      "relatedTools" : [],
      "researchTeam" : [ 
          {
              "urls" : [],
              "_id" : "5cefa10805b13e789525ce32",
              "name" : "José Antonio",
              "surname" : "Parejo",
              "allowed" : true,
              "job" : "RESEARCHER",
              "office" : "I0.71",
              "scopusId" : "24802465400",
              "professionalStatus" : "RESEARCHER",
              "telf" : "954556877",
              "email" : "japarejo at us punto es",
              "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
              "active" : true
          }
      ],
      "workTeam" : [],
      "hiredStaff" : [],
      "title" : "Metamorphic testing of RESTful Web APIs",
      "leader" : [ 
          {
              "urls" : [],
              "_id" : "5cefa10805b13e789525ce33",
              "name" : "José Antonio",
              "surname" : "Parejo",
              "allowed" : true,
              "job" : "RESEARCHER",
              "office" : "I0.71",
              "scopusId" : "24802465400",
              "professionalStatus" : "RESEARCHER",
              "telf" : "954556877",
              "email" : "japarejo at us punto es",
              "photo" : "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
              "active" : true
          }
      ],
      "reference" : "001",
      "scope" : "EUROPEO",
      "status" : "ACEPTADO",
      "amount" : 200000,
      "startDate" : "2017-01-01T00:00:00.000Z",
      "endDate" : "2017-12-31T00:00:00.000Z",
      "__v" : 0
  }}}));
    createSpy = spyOn(projectService, 'createV2').and.returnValue(of(true));
    routerSpy = spyOn(router, 'navigate').and.returnValue("url");
    getAllSpy = spyOn(personService, "getAll").and.returnValue(of({"body": {"persons": persons}}));
    updateSpy = spyOn(projectService, "updateProject").and.returnValue(of({"body": {"project": persons}}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enter edit mode', () => {
    activatedRouteStub.setParamsMock([{"id?": "sd56f4s"}])
    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('bind project properties through a form', () => {
    // Get the form input corresponding to the title and set his value to 'isa'
    document.querySelector("input[name='title']").textContent = 'isa';
    // Check that the binding of the object 'project' works
    expect(component.project.title = 'isa');
  });

  xit('should create a project', () => {
    // Se obtiene el boton que envia el formulario y dos inputs para darle algun valor
    // Get the button that send the form and two inputs to set their values
    let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
    let competencia: HTMLInputElement = element.querySelector("select[name='scope']")
    let estado: HTMLInputElement = element.querySelector("select[name='status']")
    try {
      component.people = persons.map((p) => {
        let temp = [...Object.values(p)]
        return parsePerson([...temp])
      });
    } catch (error) {
      
    }
    component.finalResearchers.push("Parejo")
    estado.value = 'ACEPTADO';
    competencia.value = 'OTROS';
    // Makes Angular detect changes in the page and simulate the click
    fixture.detectChanges();
    boton.click();
    // Check that the create method has been called in the service
    expect(createSpy).toHaveBeenCalled();
    expect(fixture.componentInstance.errors["badResearchers"] == null).toBeTruthy();
  })

  xit('should edit a project', () => {
    activatedRouteStub.setParamsMock([{"id?": "sd56f4s"}])
    component.edit = true
    fixture.detectChanges();
    // Se obtiene el boton que envia el formulario y dos inputs para darle algun valor
    // Get the button that send the form and two inputs to set their values
    let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
    let competencia: HTMLInputElement = element.querySelector("select[name='scope']")
    let estado: HTMLInputElement = element.querySelector("select[name='status']")
    component.people = persons.map((p) => {
      let temp = [...Object.values(p)]
      return parsePerson([...temp])
    });
    component.finalResearchers.push("Parejo")
    estado.value = 'ACEPTADO';
    competencia.value = 'OTROS';
    // Makes Angular detect changes in the page and simulate the click
    fixture.detectChanges();
    boton.click();
    // Check that the create method has been called in the service
    expect(updateSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
    expect(fixture.componentInstance.errors["badResearchers"] == null).toBeTruthy();
  })

  it('should add 2 set end date as two years more than start date', () => {
    let durationSelect: HTMLSelectElement = element.querySelector('select[id="durationSelect"]')

    fixture.componentInstance.project.startDate = {year: 2019, month: 3, day: 14};
    durationSelect.selectedIndex = 2;
    durationSelect.dispatchEvent(new Event("change"));
    expect(fixture.componentInstance.project.endDate["year"] == 2021)
  })
});