import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PublicationsComponent } from '../../components/publication-create/publications.component';
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
    createSpy = spyOn(publicationsService, 'create').and.returnValue(of(true));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('bind publication properties through a form', () => {
    // Get the form input corresponding to the title and set his value to 'isa'
    document.querySelector("input[name='articleTitle']").textContent = 'Titulo de prueba';
    fixture.detectChanges();
    // Check that the binding of the object 'project' works
    expect(component.pub.articleTitle = 'Titulo de prueba');
  });

  it('should create a publication', () => {
    // Se obtiene el boton que envia el formulario y dos inputs para darle algun valor
    // Get the button that send the form and two inputs to set their values
    let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
    let articleTitle: HTMLInputElement = element.querySelector("input[name='articleTitle']")
    let sourceType: HTMLSelectElement = element.querySelector("select[name='sourceType']")
    let documentType: HTMLSelectElement = element.querySelector("select[name='documentType']")
    let sourceTitle: HTMLInputElement = element.querySelector("input[name='sourceTitle']")
    let firstAuthor: HTMLInputElement = element.querySelector("input[name='firstAuthor']")
    let affiliation: HTMLInputElement = element.querySelector("input[name='affiliation']")
    documentType.setAttribute('value','Book');
    articleTitle.setAttribute('value','US');
    sourceType.setAttribute('selected','Book')
    sourceTitle.setAttribute('value','US');
    firstAuthor.setAttribute('value','US');
    affiliation.setAttribute('value','US');
    // Makes Angular detect changes in the page and simulate the click
    fixture.detectChanges();
    boton.click();
    // Check that the create method has been called in the service
    expect(createSpy).toHaveBeenCalled();
  })

});