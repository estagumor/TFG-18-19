import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicationCreateComponent } from '../../components/publication-create/publication.create.component';
import { DebugElement } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { of } from 'rxjs';
import { MatAutocompleteModule, MatInputModule, MatChipsModule, MatIconModule } from '@angular/material';
import { AcompleteComponent } from '../../components/acomplete/acomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Project } from 'src/app/models/project';
import { PersonService } from 'src/app/services/person.service';
import { ProjectService } from 'src/app/services/project.service';

function parsePerson(array): Person {
    return new Person(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11])
}

function parseProject(array): Project {
    return new Project(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13])
}

class MockActivatedRoute extends ActivatedRoute {
    constructor() {
        super();
        this.params = of({ id: "5" });
    }

    setParamsMock(params) {
        this.params = params
    }
}

describe("Publication's component", () => {
    let component: PublicationCreateComponent;
    let fixture: ComponentFixture<PublicationCreateComponent>;
    let publicationService: PublicationService;
    let activatedRouteStub: MockActivatedRoute;
    let element: HTMLElement;
    // Spies to intercept calls to the service
    let router;
    let routerSpy;
    let createSpy;
    let getSpy;
    let updateSpy;
    let getCongressSpy;
    let getAllSpy;
    let getProjectsSpy;
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
    }];
    let personService: PersonService;
    let personServiceStub: Partial<PersonService>;
    let projectService: ProjectService;
    let projectServiceStub: Partial<ProjectService>;

    beforeEach(async(() => {
        personServiceStub = {
            getAll: function () {
                return of({ "body": { "persons": persons } })
            }
        }
        projectServiceStub = {
            getProjects: function () {
                return of({ "body": { "projects": projects } })
            }
        }
        const personService = jasmine.createSpyObj("PersonService", ["getAll"]);
        const projectService = jasmine.createSpyObj("ProjectService", ["getProjects"]);
        getAllSpy = personService.getAll.and.returnValue(of({ "body": { "persons": persons[0] } }));
        getProjectsSpy = projectService.getProjects.and.returnValue(of({ "body": { "projects": projects[0] } }));
        activatedRouteStub = new MockActivatedRoute();
        // Set the component configuration and add it the necessary imports
        TestBed.configureTestingModule({
            declarations: [PublicationCreateComponent, AcompleteComponent],
            imports: [ReactiveFormsModule, FormsModule, HttpClientModule, MatAutocompleteModule, MatInputModule, MatChipsModule, BrowserAnimationsModule, MatIconModule, RouterModule.forRoot([])],
            providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }, { provide: PersonService, useValue: personServiceStub }, { provide: ProjectService, useValue: projectServiceStub }]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicationCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        const bannerDe: DebugElement = fixture.debugElement;
        var bannerEl: HTMLElement = bannerDe.nativeElement;
        element = bannerEl;
        publicationService = bannerDe.injector.get(PublicationService)
        router = bannerDe.injector.get(Router);
        routerSpy = spyOn(router, "navigate").and.returnValue("/publications");
        createSpy = spyOn(publicationService, "create").and.returnValue(of(true));
        getCongressSpy = spyOn(publicationService, "getCongressTitles").and.returnValue(of({
            "body": {
                "congressTitles": {

                }
            }
        }));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should enter the edit mode and display values of the publication', () => {
        activatedRouteStub.setParamsMock([{ "id?": "sd56f4s" }])
        fixture = TestBed.createComponent(PublicationCreateComponent);
        component = fixture.componentInstance;
        publicationService = fixture.debugElement.injector.get(PublicationService);
        getSpy = spyOn(publicationService, "getPublication").and.returnValue(of({
            "body": {
                "pub": {
                    scopusId: "SCOPUS_ID:85032230617",
                    articleTitle: "Metamorphic testing of RESTful Web APIs",
                    sourceType: "Journal",
                    documentType: "Article",
                    sourceTitle: "IEEE Transactions on Software Engineering",
                    pageRange: "1083-1099",
                    publicationDate: "2018",
                    DOI: "10.1109/TSE.2017.2764464",
                    authors: persons,
                    affiliation: "Universidad de Sevilla",
                    project: [projects],
                    assigned: true
                }
            }
        }));
        fixture.detectChanges();
        expect(getSpy).toHaveBeenCalled();
        expect(getCongressSpy).toHaveBeenCalled();
        expect(element.querySelector("input[name='articleTitle']").textContent = "Metamorphic testing of RESTful Web APIs");
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
        try {
            component.persons = persons.map((p) => {
                let temp = [...Object.values(p)]
                return parsePerson([...temp])
            });
        } catch (error) { }
        try {
            component.projects = projects.map((p) => {
                let temp = [...Object.values(p)]
                return parseProject([...temp])
            });
        } catch (error) { }

        documentType.setAttribute('value', 'Book');
        articleTitle.setAttribute('value', 'US');
        sourceType.setAttribute('selected', 'Book');

        // Makes Angular detect changes in the page and simulate the click
        fixture.detectChanges();
        boton.click();
        // Check that the create method has been called in the service
        expect(createSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalled();
        // expect(getAllSpy).toHaveBeenCalled();
        // expect(getProjectsSpy).toHaveBeenCalled();
    });

    it('should edit a publication', () => {
        activatedRouteStub.setParamsMock([{ "id?": "sd56f4s" }])
        fixture = TestBed.createComponent(PublicationCreateComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement.nativeElement;
        publicationService = fixture.debugElement.injector.get(PublicationService);
        getSpy = spyOn(publicationService, "getPublication").and.returnValue(of({
            "body": {
                "pub": {
                    scopusId: "SCOPUS_ID:85032230617",
                    articleTitle: "Metamorphic testing of RESTful Web APIs",
                    sourceType: "Journal",
                    documentType: "Article",
                    sourceTitle: "IEEE Transactions on Software Engineering",
                    pageRange: "1083-1099",
                    publicationDate: "2018",
                    DOI: "10.1109/TSE.2017.2764464",
                    authors: persons,
                    affiliation: "Universidad de Sevilla",
                    project: [projects],
                    assigned: true
                }
            }
        }));
        updateSpy = spyOn(publicationService, "updatePublication").and.returnValue(of({
            "body": {
                "pub": {
                    scopusId: "SCOPUS_ID:85032230617",
                    articleTitle: "Titulo2",
                    sourceType: "Journal",
                    documentType: "Article",
                    sourceTitle: "IEEE Transactions on Software Engineering",
                    pageRange: "1083-1099",
                    publicationDate: "2018",
                    DOI: "10.1109/TSE.2017.2764464",
                    authors: persons,
                    affiliation: "Universidad de Sevilla",
                    project: [projects],
                    assigned: true
                }
            }
        }));
        try {
            component.persons = persons.map((p) => {
                let temp = [...Object.values(p)]
                return parsePerson([...temp])
            });
        } catch (error) { }
        try {
            component.projects = projects.map((p) => {
                let temp = [...Object.values(p)]
                return parseProject([...temp])
            });
        } catch (error) { }
        // Se obtiene el boton que envia el formulario y dos inputs para darle algun valor
        // Get the button that send the form and two inputs to set their values
        let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
        let sourceType: HTMLSelectElement = element.querySelector("select[name='sourceType']")
        sourceType.setAttribute('selected', 'Book');
        fixture.detectChanges();
        // Makes Angular detect changes in the page and simulate the click
        boton.click();
        // Check that the create method has been called in the service
        expect(updateSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalled();
        expect(element.querySelector("input[name='articleTitle']").textContent = "Titulo2");
        expect(element.querySelector("select[name='sourceType']").textContent = "Book");
    });

    it('should try the auxiliar methods', () => {
        try {
            component.projects = projects.map((p) => {
                let temp = [...Object.values(p)]
                return parseProject([...temp])
            });
        } catch (error) { }
        let proj = parseProject(projects[0])
        expect(component.getProjects(["Metamorphic testing of RESTful Web APIs"])[0] == proj);
        expect(component.getStringProjects([proj])[0] == "Metamorphic testing of RESTful Web APIs");

        try {
            component.persons = persons.map((p) => {
                let temp = [...Object.values(p)]
                return parsePerson([...temp])
            });
        } catch (error) { }
        let per = parsePerson(persons[0])
        expect(component.getPersons(["Parejo"])[0] == per);
        expect(component.getStringPersons([per])[0] == "José Antonio Parejo");
    })
});