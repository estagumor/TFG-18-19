import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PublicationsComponent } from '../../components/publications/publications.component';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatAutocompleteModule,MatInputModule, MatChipsModule, MatIconModule } from '@angular/material';
import { AcompleteComponent } from '../../components/acomplete/acomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe("Publication's component", () => {
  let component: PublicationsComponent;
  let fixture: ComponentFixture<PublicationsComponent>;
  let element: HTMLElement;
  // Spies to intercept calls to the service
  let listSpy;
  let getterSpy;
  let createSpy;
  let publicationsService: PublicationService;

  beforeEach(async(() => {
    // Set the component configuration and add it the necessary imports
    TestBed.configureTestingModule({
      declarations: [PublicationsComponent, AcompleteComponent],
      imports: [ReactiveFormsModule, FormsModule,NgbModule, HttpClientModule, MatAutocompleteModule, MatInputModule, MatChipsModule, BrowserAnimationsModule, MatIconModule, RouterModule.forRoot([])],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Tools to navigate in the DOM
    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    publicationsService = bannerDe.injector.get(PublicationService)
    // Instantiate the spies to listen in the service methods
    // It returns true because we don't verify the response, just check that it is called
    listSpy = spyOn(publicationsService, 'create').and.returnValue(of(true));
    getterSpy = spyOn(publicationsService, 'list').and.returnValue(of(true));
    createSpy = spyOn(publicationsService, 'saveAll').and.returnValue(of(true));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bind publication properties through a form', () => {
    // Get the form input corresponding to the title and set his value to 'isa'
    document.querySelector("input[name='articleTitle']").textContent = 'Titulo de prueba';
    // Check that the binding of the object 'project' works
    expect(component.pub.articleTitle = 'Titulo de prueba');
  });

  //PREGUNTAR SOBRE ESTO
  it('should list all the publications', () => {
    // Get the button that calls to the list function and simulate the click
    let boton: HTMLButtonElement = element.querySelector("button[id='listButton']")
    boton.click();
    // Check that the list method has been called
    expect(listSpy).toHaveBeenCalled();
  })

  it('should create a publication', () => {
    // Se obtiene el boton que envia el formulario y dos inputs para darle algun valor
    // Get the button that send the form and two inputs to set their values
    let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
    let articleTitle: HTMLInputElement = element.querySelector("select[name='articleTitle']")
    let sourceType: HTMLInputElement = element.querySelector("select[name='sourceType']")
    let documentType: HTMLInputElement = element.querySelector("select[name='documentType']")
    let sourceTitle: HTMLInputElement = element.querySelector("select[name='sourceTitle']")
    articleTitle.value = 'Titulo de prueba';
    sourceType.value = 'Journal';
    documentType.value = 'Article';
    sourceTitle.value = 'Titulo de prueba2';
    // Makes Angular detect changes in the page and simulate the click
    fixture.detectChanges();
    boton.click();
    // Check that the create method has been called in the service
    expect(createSpy).toHaveBeenCalled();
  })

  /*
  it('should get a project', () => {
    // Get the id input to set his value
    const input = fixture.debugElement.query(By.css('#idInput'));
    component.projectId = "5bd79886addca429f504da62"
    // Simulate that user press the key 'enter', which calls to the method
    input.triggerEventHandler('keyup.enter', {})
    // Check that the method has been called in the service
    expect(getterSpy).toHaveBeenCalled();
  })
  */
});