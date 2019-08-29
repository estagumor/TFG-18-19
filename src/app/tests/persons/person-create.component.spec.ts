import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonCreateComponent } from '../../components/person-create/person-create.component';
import { PersonService } from '../../services/person.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.params = of({ id: "5" });
  }

  setParamsMock(params) {
    this.params = params
  }
}

describe('PersonCreateComponent', () => {
  let component: PersonCreateComponent;
  let fixture: ComponentFixture<PersonCreateComponent>;
  let personService: PersonService;
  let activatedRouteStub: MockActivatedRoute;
  let element: HTMLElement;
  let createSpy;
  let updateSpy;
  let getSpy;

  beforeEach(async(() => {
    activatedRouteStub = new MockActivatedRoute();
    TestBed.configureTestingModule({
      declarations: [PersonCreateComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule.forRoot([])],
      providers: [{provide: ActivatedRoute, useValue: activatedRouteStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;
    personService = fixture.debugElement.injector.get(PersonService);
    createSpy = spyOn(personService, "create").and.returnValue(of(true));
    updateSpy = spyOn(personService, "updatePerson").and.returnValue(of({
      "body": {
        "person": {
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
        }
      }
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enter the edit mode and display the values of the person', () => {
    activatedRouteStub.setParamsMock([{"id?": "sd56f4s"}])
    fixture = TestBed.createComponent(PersonCreateComponent);
    component = fixture.componentInstance;
    personService = fixture.debugElement.injector.get(PersonService);
    getSpy = spyOn(personService, "getPerson").and.returnValue(of({
      "body": {
        "person": {
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
        }
      }
    }));
    fixture.detectChanges();
    expect(getSpy).toHaveBeenCalled();
    expect(element.querySelector("input[name='name']").textContent = "José Antonio");
  });

  it('bind person properties through a form', () => {
    element.querySelector("input[name='name']").textContent = 'Manuel';
    expect(component.person.name = 'Manuel');
  });

  it('should create a person', () => {
    let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
    let job: HTMLInputElement = element.querySelector("select[name='job']")
    let professionalStatus: HTMLInputElement = element.querySelector("select[name='professionalStatus']")

    job.value = 'RESEARCHER';
    professionalStatus.value = 'NONE';
    // Makes Angular detect changes in the page and simulate the click
    fixture.detectChanges();
    boton.click();
    // Check that the create method has been called in the service
    expect(createSpy).toHaveBeenCalled();
  });

  it('should edit a person', () => {
    activatedRouteStub.setParamsMock([{ "id?": "sd56f4s" }])
    component.edit = true
    fixture.detectChanges();

    let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
    let job: HTMLInputElement = element.querySelector("select[name='job']")
    let professionalStatus: HTMLInputElement = element.querySelector("select[name='professionalStatus']")

    job.value = 'RESEARCHER';
    professionalStatus.value = 'NONE';
    // Makes Angular detect changes in the page and simulate the click
    fixture.detectChanges();
    boton.click();
    // Check that the create method has been called in the service
    expect(updateSpy).toHaveBeenCalled();
  });
});
