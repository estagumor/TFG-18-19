import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationAddListComponent } from '../../components/publication-add-list/publication-add-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { RouterModule, Router } from '@angular/router'
import { FilterPublicationsPipe } from '../../components/shared/filter.publications.pipe';
import { FilterProjectsPipe } from '../../components/shared/filter.projects.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { ProjectService } from 'src/app/services/project.service';
import { of } from 'rxjs';
import { Publication } from 'src/app/models/publication';
import { ScopusService } from 'src/app/services/scopus.service';
import { PublicationService } from 'src/app/services/publication.service';
import { DebugElement } from '@angular/core';

describe('PublicationAddListComponent', () => {
    let component: PublicationAddListComponent;
    let fixture: ComponentFixture<PublicationAddListComponent>;
    let projectServiceStub: Partial<ProjectService>;
    let scopusServiceStub: Partial<ScopusService>;
    let publicationServiceStub: Partial<PublicationService>;
    let routerSpy;
    let router;
    let element;

    let pub = {
        "_id": "5cefa10805b13e789525ce41",
        "scopusId": "SCOPUS_ID:85032230617",
        "articleTitle": "Metamorphic testing of RESTful Web APIs",
        "sourceType": "Journal",
        "documentType": "Article",
        "sourceTitle": "IEEE Transactions on Software Engineering",
        "pageRange": "1083-1099",
        "publicationDate": "2018",
        "DOI": "10.1109/TSE.2017.2764464",
        "authors": [
            {
                "urls": [],
                "_id": "5cefa10805b13e789525ce42",
                "name": "José Antonio",
                "surname": "Parejo",
                "allowed": true,
                "job": "RESEARCHER",
                "office": "I0.71",
                "scopusId": "24802465400",
                "professionalStatus": "RESEARCHER",
                "telf": "954556877",
                "email": "japarejo at us punto es",
                "photo": "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
                "active": true
            }
        ],
        "affiliation": "Universidad de Sevilla",
        "project": [
            {
                "relatedTools": [],
                "_id": "5cefa10805b13e789525ce31",
                "researchTeam": [
                    {
                        "urls": [],
                        "_id": "5cefa10805b13e789525ce32",
                        "name": "José Antonio",
                        "surname": "Parejo",
                        "allowed": true,
                        "job": "RESEARCHER",
                        "office": "I0.71",
                        "scopusId": "24802465400",
                        "professionalStatus": "RESEARCHER",
                        "telf": "954556877",
                        "email": "japarejo at us punto es",
                        "photo": "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
                        "active": true
                    }
                ],
                "workTeam": [],
                "hiredStaff": [],
                "title": "Metamorphic testing of RESTful Web APIs",
                "leader": [
                    {
                        "urls": [],
                        "_id": "5cefa10805b13e789525ce33",
                        "name": "José Antonio",
                        "surname": "Parejo",
                        "allowed": true,
                        "job": "RESEARCHER",
                        "office": "I0.71",
                        "scopusId": "24802465400",
                        "professionalStatus": "RESEARCHER",
                        "telf": "954556877",
                        "email": "japarejo at us punto es",
                        "photo": "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
                        "active": true
                    }
                ],
                "reference": "001",
                "scope": "EUROPEO",
                "status": "ACEPTADO",
                "amount": 200000,
                "startDate": "2017-01-01T00:00:00.000Z",
                "endDate": "2017-12-31T00:00:00.000Z",
                "__v": 0
            }
        ],
        "assigned": true,
        "quartil": "Q1",
        "__v": 0
    }

    beforeEach(async(() => {
        projectServiceStub = {
            getProjects: function () {
                return of({
                    "body": {
                        "projects": [{
                            "_id": "5cefa10805b13e789525ce31",
                            "relatedTools": [],
                            "researchTeam": [
                                {
                                    "urls": [],
                                    "_id": "5cefa10805b13e789525ce32",
                                    "name": "José Antonio",
                                    "surname": "Parejo",
                                    "allowed": true,
                                    "job": "RESEARCHER",
                                    "office": "I0.71",
                                    "scopusId": "24802465400",
                                    "professionalStatus": "RESEARCHER",
                                    "telf": "954556877",
                                    "email": "japarejo at us punto es",
                                    "photo": "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
                                    "active": true
                                }
                            ],
                            "workTeam": [],
                            "hiredStaff": [],
                            "title": "Metamorphic testing of RESTful Web APIs",
                            "leader": [
                                {
                                    "urls": [],
                                    "_id": "5cefa10805b13e789525ce33",
                                    "name": "José Antonio",
                                    "surname": "Parejo",
                                    "allowed": true,
                                    "job": "RESEARCHER",
                                    "office": "I0.71",
                                    "scopusId": "24802465400",
                                    "professionalStatus": "RESEARCHER",
                                    "telf": "954556877",
                                    "email": "japarejo at us punto es",
                                    "photo": "https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg",
                                    "active": true
                                }
                            ],
                            "reference": "001",
                            "scope": "EUROPEO",
                            "status": "ACEPTADO",
                            "amount": 200000,
                            "startDate": "2017-01-01T00:00:00.000Z",
                            "endDate": "2017-12-31T00:00:00.000Z",
                            "__v": 0
                        }]
                    }
                })
            }
        }
        scopusServiceStub = {
            getPubs: function(latestDate, start = 0, count = 25, users = []): Promise<Publication[]> {
                return new Promise<Publication[]>(resolve => {
                    resolve([new Publication(pub.scopusId, pub.articleTitle, pub.sourceTitle, pub.documentType, pub.sourceTitle, null, "", "", pub.publicationDate, pub.DOI, "", [], pub.affiliation, pub.assigned, [], pub.quartil, "")])
                })
            }
            // getPubs: function(latestDate, start, count, users) {
            //     return new Promise<Publication[]>(resolve => {
            //         resolve([new Publication(pub.scopusId, pub.articleTitle, pub.sourceTitle, pub.documentType, pub.sourceTitle, null, "", "", pub.publicationDate, pub.DOI, "", [], pub.affiliation, pub.assigned, [], pub.quartil, "")])
            //     })
            // }
        }
        publicationServiceStub = {
            saveAll(publications, projects){
                return of([])
            }
        }
        TestBed.configureTestingModule({
            declarations: [PublicationAddListComponent, FilterPublicationsPipe, FilterProjectsPipe],
            imports: [HttpClientModule, RouterModule.forRoot([]), MatDialogModule, ReactiveFormsModule, FormsModule, NgxLoadingModule.forRoot({})],
            providers: [{ provide: PublicationService, useValue: publicationServiceStub},{ provide: APP_BASE_HREF, useValue: '/' }, { provide: ScopusService, useValue: scopusServiceStub }, { provide: ProjectService, useValue: projectServiceStub }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicationAddListComponent);
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
    });

    it('should add a publication when selecting it', () => {
        component.listado = [new Publication(pub.scopusId, pub.articleTitle, pub.sourceTitle, pub.documentType, pub.sourceTitle, null, "", "", pub.publicationDate, pub.DOI, "", [], pub.affiliation, pub.assigned, [], pub.quartil, "")]
        fixture.detectChanges();
        let tableRow: HTMLTableRowElement = fixture.debugElement.nativeElement.querySelector("tr[name='pubs']");
        tableRow.click()
        expect(component.pubsToSave.length > 0)
        let check: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("tr[name='pubs']>td>input");
        check.checked = true;
        tableRow.click()
        expect(component.pubsToSave.length == 0)
    })

    it('should select all publications', () => {
        component.listado = [new Publication(pub.scopusId, pub.articleTitle, pub.sourceTitle, pub.documentType, pub.sourceTitle, null, "", "", pub.publicationDate, pub.DOI, "", [], pub.affiliation, pub.assigned, [], pub.quartil, "")]
        fixture.detectChanges();
        let boton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[class='btn btn-warning']")
        boton.click()
        let check: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("tr[name='pubs']>td>input");
        expect(check.checked).toBeTruthy()
    })

    it('should load a publication from scopus when selecting a project', () => {
        let tableRow: HTMLTableRowElement = fixture.debugElement.nativeElement.querySelector("tr[name='projects']");
        tableRow.click()
        expect(component.listado.length > 0)
        let check: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("tr[name='projects']>td>input");
        check.checked = true;
        tableRow.click()
        expect(component.listado.length == 0)
    })

    it('should save and join projects and publications', () => {
        let boton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[class='btn btn-primary']")
        boton.click();
        expect(routerSpy).toHaveBeenCalled()
    })
});
