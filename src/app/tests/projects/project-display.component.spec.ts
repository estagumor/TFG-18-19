import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectDisplayComponent } from '../../components/project-display/project-display.component';
import { of } from 'rxjs';
import { PublicationService } from 'src/app/services/publication.service';
import { DebugElement } from '@angular/core';

xdescribe('ProjectDisplayComponent', () => {
    let component: ProjectDisplayComponent;
    let fixture: ComponentFixture<ProjectDisplayComponent>;
    let element: HTMLElement;
    let router;
    let deleteSpy, getSpy, editSpy, routerSpy, getAllSpy, filterSpy;
    let projectService: ProjectService;
    let projectServiceStub: Partial<ProjectService>;
    let publicationService: PublicationService;
    let publicationServiceStub: Partial<PublicationService>;

    beforeEach(async(() => {        
        publicationServiceStub = {
            filterByProject: function(id) {
                return of({"body": {"pubs": {}}});
            }
        }

        projectServiceStub = {
            deleteProject: function(id) {
                return of({"body": {"project": {}}});
            }
        }

        TestBed.configureTestingModule({
            declarations: [ProjectDisplayComponent],
            imports: [RouterModule.forRoot([]), HttpClientModule, MatDialogModule],
            providers: [{provide: publicationService, useValue: publicationServiceStub}, {provide: projectService, useValue: projectServiceStub}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const bannerDe: DebugElement = fixture.debugElement;
        var bannerEl: HTMLElement = bannerDe.nativeElement;
        element = bannerEl;
        
        projectService = bannerDe.injector.get(ProjectService);
        publicationService = bannerDe.injector.get(PublicationService);
        router = bannerDe.injector.get(Router);

        var person1 = {
			name: "José Antonio", 
			surname: "Parejo", 
			allowed: true, 
			job: "RESEARCHER",
			office: "I0.71",
			scopusId: "24802465400",
			professionalStatus: "RESEARCHER",
			telf: "954556877",
			email: "japarejo at us punto es",
			photo: "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
			active: true
		}

        getSpy = spyOn(projectService, "getProject").and.returnValue({"body": {"project": {
			researchTeam : [person1],
			workTeam: [],
			hiredStaff: [],
			title: "Metamorphic testing of RESTful Web APIs",
			leader: person1,
			reference: "001",
			scope: "EUROPEO",
			status: "ACEPTADO",
			amount: 200000,
			relatedTools: [],
			startDate: new Date("2017-01-01"),
			endDate: new Date("2017-12-31")
        }}});
        
        deleteSpy = spyOn(projectService, "deleteProject").and.returnValue(of(true));
        routerSpy = spyOn(router, "navigate").and.returnValue("url");
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });

    xit("should go to edit view", () => {
        let editButton: HTMLButtonElement = element.querySelector("button[name='editButton']");
        editButton.click()
        expect(routerSpy).toHaveBeenCalled();
    });
    
    xit("should delete a project", () => {
        let deleteButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[name='deleteButton']");
        deleteButton.click()
        expect(routerSpy).toHaveBeenCalled();
        expect(deleteSpy).toHaveBeenCalled();
    });

    xit("should show the publication", () => {
        let showTable: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("table[id='showPublicationProject']");
        showTable.click()
        expect(routerSpy).toHaveBeenCalled();
    });
});
