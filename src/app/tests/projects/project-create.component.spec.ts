// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { HttpClientModule } from '@angular/common/http';
// import { ProjectCreateComponent } from '../../components/project-create/project-create.component';
// import { APP_BASE_HREF } from '@angular/common';
// import { DebugElement } from '@angular/core';
// import { ProjectService } from '../../services/project.service';
// import { of } from 'rxjs';
// import { By } from '@angular/platform-browser';
// import { MatAutocompleteModule,MatInputModule, MatChipsModule, MatIconModule } from '@angular/material';
// import { AcompleteComponent } from '../../components/acomplete/acomplete.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule, Router } from '@angular/router';

// describe("Project's component", () => {
//   let component: ProjectCreateComponent;
//   let fixture: ComponentFixture<ProjectCreateComponent>;
//   let element: HTMLElement;
//   // Spies to intercept calls to the service
//   let listSpy;
//   let getterSpy;
//   let createSpy;
//   let projectService: ProjectService;
//   let routerSpy;
//   let router;

//   beforeEach(async(() => {
//     // Set the component configuration and add it the necessary imports
//     TestBed.configureTestingModule({
//       declarations: [ProjectCreateComponent, AcompleteComponent],
//       imports: [ReactiveFormsModule, FormsModule,NgbModule, HttpClientModule, MatAutocompleteModule, MatInputModule, MatChipsModule, BrowserAnimationsModule, MatIconModule, RouterModule.forRoot([])],
//       providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
//     })
//       .compileComponents();

//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProjectCreateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     // Tools to navigate in the DOM
//     const bannerDe: DebugElement = fixture.debugElement;
//     var bannerEl: HTMLElement = bannerDe.nativeElement;
//     element = bannerEl;

//     projectService = bannerDe.injector.get(ProjectService)
//     router = bannerDe.injector.get(Router)
//     // Instantiate the spies to listen in the service methods
//     // It returns true because we don't verify the response, just check that it is called
//     listSpy = spyOn(projectService, 'getProjects').and.returnValue(of(true));
//     getterSpy = spyOn(projectService, 'getProject').and.returnValue(of(true));
//     createSpy = spyOn(projectService, 'createV2').and.returnValue(of(true));
//     routerSpy = spyOn(router, 'navigate').and.returnValue("url")
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('bind project properties through a form', () => {
//     // Get the form input corresponding to the title and set his value to 'isa'
//     document.querySelector("input[name='title']").textContent = 'isa';
//     // Check that the binding of the object 'project' works
//     expect(component.project.title = 'isa');
//   });

//   it('should create a project', () => {
//     // Se obtiene el boton que envia el formulario y dos inputs para darle algun valor
//     // Get the button that send the form and two inputs to set their values
//     let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
//     let competencia: HTMLInputElement = element.querySelector("select[name='scope']")
//     let estado: HTMLInputElement = element.querySelector("select[name='status']")
//     estado.value = 'ACEPTADO';
//     competencia.value = 'OTROS';
//     // Makes Angular detect changes in the page and simulate the click
//     fixture.detectChanges();
//     boton.click();
//     // Check that the create method has been called in the service
//     expect(createSpy).toHaveBeenCalled();
//   })
// });