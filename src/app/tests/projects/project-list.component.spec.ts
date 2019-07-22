import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AcompleteComponent } from '../../components/acomplete/acomplete.component';
import { MatAutocompleteModule, MatInputModule, MatChipsModule, MatIconModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterProjectsPipe } from '../../components/shared/filter.projects.pipe';
import { RouterModule, ActivatedRoute, Router } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { Project } from 'src/app/models/project';
import { DisplayComponent } from 'src/app/components/display/display.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('ProjectListComponent', () => {
    let component: ProjectListComponent;
    let fixture: ComponentFixture<ProjectListComponent>;
    let projectServiceStub: Partial<ProjectService>;
    let routerSpy;
    let router;
    let element;
    let pro1 = {
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
        "startDate" : "2010-01-01T00:00:00.000Z",
        "endDate" : "2010-12-31T00:00:00.000Z",
        "__v" : 0
    }
    let pro2 = {
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
    }
    let pro3 = {
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
        "startDate" : "2019-01-01T00:00:00.000Z",
        "__v" : 0
    }
    beforeEach(async(() => {
        projectServiceStub = {
            getProjects: function(){
                return of({"body": {"projects": [pro1, pro2, pro3]}})
            },
            getProject: function(id){
                return of({"body": {"project": pro1}})
            }
        }
        TestBed.configureTestingModule({
            declarations: [ProjectListComponent, AcompleteComponent, FilterProjectsPipe, DisplayComponent],
            imports: [HttpClientModule, MatDialogModule, MatAutocompleteModule, MatInputModule, MatChipsModule, BrowserAnimationsModule, MatIconModule, ReactiveFormsModule, FormsModule, RouterModule.forRoot([])],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }, {provide: ProjectService, useValue: projectServiceStub}],
        }).overrideModule(BrowserDynamicTestingModule, { //https://stackoverflow.com/questions/41483841/providing-entrycomponents-for-a-testbed/45550720
            set: {
                entryComponents: [DisplayComponent]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const bannerDe: DebugElement = fixture.debugElement;
        var bannerEl: HTMLElement = bannerDe.nativeElement;
        element = bannerEl;

        router = bannerDe.injector.get(Router);


        routerSpy = spyOn(router, 'navigateByUrl').and.returnValue("url");
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.listado.length == 3).toBeTruthy()
    });

    it('should go to project display', () => {
        let boton: HTMLButtonElement = element.querySelector("button[name='displayButton']")
        boton.click()
        expect(routerSpy).toHaveBeenCalled()
    });

    it('should filter by status', () => {
        let boton: HTMLButtonElement = element.querySelector("button[data-target='all']")
        boton.click()
        expect(component.listado.length == component.listado2.length)

        boton = element.querySelector("button[data-target='cinco']")
        boton.click()
        expect(component.listado.length == component.listado2.length)
    })

    it('should show a display pop up', () => {
        let projectDiv: HTMLDivElement = element.querySelector(".media")
        projectDiv.click()
    })
});
