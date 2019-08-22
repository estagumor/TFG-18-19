import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { PublicationStatsComponent } from '../../components/publication-stats/publication-stats.component';
import { PublicationService } from '../../services/publication.service';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

class MockActivatedRoute extends ActivatedRoute {
    constructor() {
        super();
        this.params = of({});
    }

    setParamsMock(params) {
        this.params = params
    }
}

describe('Estadísticas de publicación', () => {
    let component: PublicationStatsComponent;
    let fixture: ComponentFixture<PublicationStatsComponent>;
    let activatedRouteStub: MockActivatedRoute;
    let publicationService: PublicationService;
    let PublicationServiceStub: Partial<PublicationService>;
    let element: HTMLElement;
    let listSpy, filterSpy;
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

    let publications = [{
        scopusId: "SCOPUS_ID:85032230617",
        articleTitle: "Metamorphic testing of RESTful Web APIs",
        sourceType: "Journal",
        quartil: "Q1",
        documentType: "Article",
        sourceTitle: "IEEE Transactions on Software Engineering",
        pageRange: "1083-1099",
        publicationDate: "2018",
        DOI: "10.1109/TSE.2017.2764464",
        authors: persons,
        affiliation: "Universidad de Sevilla",
        project: projects,
        assigned: true
    },{
        scopusId: "SCOPUS_ID:85032230617",
        articleTitle: "Metamorphic testing of RESTful Web APIs",
        sourceType: "Journal",
        quartil: "Q2",
        documentType: "Article",
        sourceTitle: "IEEE Transactions on Software Engineering",
        pageRange: "1083-1099",
        publicationDate: "2018",
        DOI: "10.1109/TSE.2017.2764464",
        authors: persons,
        affiliation: "Universidad de Sevilla",
        project: projects,
        assigned: true
    },{
        scopusId: "SCOPUS_ID:85032230617",
        articleTitle: "Metamorphic testing of RESTful Web APIs",
        sourceType: "Journal",
        quartil: "Q3",
        documentType: "Article",
        sourceTitle: "IEEE Transactions on Software Engineering",
        pageRange: "1083-1099",
        publicationDate: "2018",
        DOI: "10.1109/TSE.2017.2764464",
        authors: persons,
        affiliation: "Universidad de Sevilla",
        project: projects,
        assigned: true
    },
    {
        scopusId: "SCOPUS_ID:85032230617",
        articleTitle: "Metamorphic testing of RESTful Web APIs",
        sourceType: "Journal",
        quartil: "Q4",
        documentType: "Article",
        sourceTitle: "IEEE Transactions on Software Engineering",
        pageRange: "1083-1099",
        publicationDate: "2018",
        DOI: "10.1109/TSE.2017.2764464",
        authors: persons,
        affiliation: "Universidad de Sevilla",
        project: projects,
        assigned: true
    },
    {
        scopusId: "SCOPUS_ID:85032230617",
        articleTitle: "Metamorphic testing of RESTful Web APIs",
        sourceType: "Conference Proceeding",
        congress: "A++",
        documentType: "Article",
        sourceTitle: "IEEE Transactions on Software Engineering",
        pageRange: "1083-1099",
        publicationDate: "2018",
        DOI: "10.1109/TSE.2017.2764464",
        authors: persons,
        affiliation: "Universidad de Sevilla",
        project: projects,
        assigned: true
    }]

    beforeEach(async(() => {

        activatedRouteStub = new MockActivatedRoute();
        TestBed.configureTestingModule({
            declarations: [PublicationStatsComponent],
            imports: [ChartsModule, HttpClientModule],
            providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicationStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // Tools to navigate in the DOM
        const bannerDe: DebugElement = fixture.debugElement;
        var bannerEl: HTMLElement = bannerDe.nativeElement;
        element = bannerEl;

        publicationService = bannerDe.injector.get(PublicationService)
        listSpy = spyOn(publicationService, "list").and.returnValue(of({ "body": { "pubs": publications } }));
        filterSpy = spyOn(publicationService, "filterByProject").and.returnValue(of({ "body": { "pubs": publications } }));
    });

    it('debe crearse', () => {
        expect(component).toBeTruthy();
    });

    it('debe crearse sin projectId', () => {
        fixture = TestBed.createComponent(PublicationStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // Tools to navigate in the DOM
        const bannerDe: DebugElement = fixture.debugElement;
        var bannerEl: HTMLElement = bannerDe.nativeElement;
        element = bannerEl;

        publicationService = bannerDe.injector.get(PublicationService)
        fixture.detectChanges();
        expect(listSpy).toHaveBeenCalled();
    });

    it('debe crearse con projectId', () => {
        activatedRouteStub.setParamsMock([{ "id": "sd56f4s" }])
        fixture = TestBed.createComponent(PublicationStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // Tools to navigate in the DOM
        const bannerDe: DebugElement = fixture.debugElement;
        var bannerEl: HTMLElement = bannerDe.nativeElement;
        element = bannerEl;

        publicationService = bannerDe.injector.get(PublicationService)
        fixture.detectChanges();
        expect(filterSpy).toHaveBeenCalled();
    });

});
