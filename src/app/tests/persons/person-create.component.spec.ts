import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PersonCreateComponent } from '../../components/person-create/person-create.component';
import { PersonService } from '../../services/person.service';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';

class MockActivatedRoute extends ActivatedRoute {
  constructor() {
      super();
      this.params = of({id: "5"});
  }

  setParamsMock (params) {
    this.params = params
  }
}

xdescribe('PersonCreateComponent', () => {
  let component: PersonCreateComponent;
  let fixture: ComponentFixture<PersonCreateComponent>;
  let personServiceStub: Partial<PersonService>;
  let personService: PersonService;
  let activatedRouteStub: MockActivatedRoute;
  let element: HTMLElement;
  let createSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonCreateComponent ],
      imports: [ NgForm, NgModule ],
      providers: [{provide: PersonService, useValue: personServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCreateComponent);
    component = fixture.componentInstance;
    // personServiceStub = {

    // }
    personService = fixture.debugElement.injector.get(PersonService);
    createSpy = spyOn(personService, "create").and.returnValue(of(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the person of the url', () => {
    //TODO MIRAR IDS ACTUALES?
    activatedRouteStub.setParamsMock([{"id?": ""}])
    fixture = TestBed.createComponent(PersonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('bind person properties through a form', () => {
    document.querySelector("input[name='name']").textContent = 'Manuel';
    expect(component.person.name = 'Manuel');
  });

  it('should create a project', () => {
    let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
    //DEFINIR VARIABLES QUE SE REQUIERAN AQUI
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

  //TODO falta por probar el update
});
