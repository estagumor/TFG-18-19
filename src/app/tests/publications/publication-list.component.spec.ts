import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute, ActivatedRouteSnapshot, ParamMap, UrlSegment, convertToParamMap } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PublicationListComponent } from '../../components/publication-list/publication-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPublicationsPipe } from 'src/app/components/shared/filter.publications.pipe';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DisplayComponent } from 'src/app/components/display/display.component';
import { DebugElement } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { of } from 'rxjs';

describe('PublicationListComponent', () => {
  let component: PublicationListComponent;
  let fixture: ComponentFixture<PublicationListComponent>;
  let publicationServiceStub: Partial<PublicationService>
  let routerSpy;
  let router;
  let element;
  let testbed;
  let pub = {
    "_id" : "5cefa10805b13e789525ce41",
    "scopusId" : "SCOPUS_ID:85032230617",
    "articleTitle" : "Metamorphic testing of RESTful Web APIs",
    "sourceType" : "Journal",
    "documentType" : "Article",
    "sourceTitle" : "IEEE Transactions on Software Engineering",
    "pageRange" : "1083-1099",
    "publicationDate" : "2018",
    "DOI" : "10.1109/TSE.2017.2764464",
    "authors" : [ 
        {
            "urls" : [],
            "_id" : "5cefa10805b13e789525ce42",
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
    "affiliation" : "Universidad de Sevilla",
    "project" : [ 
        {
            "relatedTools" : [],
            "_id" : "5cefa10805b13e789525ce31",
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
    ],
    "assigned" : true,
    "quartil" : "Q1",
    "__v" : 0
}

  beforeEach(async(() => {
    publicationServiceStub = {
        list: function(){
            return of({"body": {"pubs": [pub]}})
        },
        getPublication: function(id){
            return of({"body" :{"pub": pub}})
        },
        filterByProject: function(id){
            return of({"body" :{"pub": [pub]}})
        }
    }
    testbed = TestBed.configureTestingModule({
      declarations: [ PublicationListComponent, FilterPublicationsPipe, DisplayComponent ],
      imports: [ RouterModule.forRoot([]),HttpClientModule, ReactiveFormsModule, FormsModule] ,
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, {provide: PublicationService, useValue: publicationServiceStub}]

    }).overrideModule(BrowserDynamicTestingModule, { //https://stackoverflow.com/questions/41483841/providing-entrycomponents-for-a-testbed/45550720
        set: {
            entryComponents: [DisplayComponent]
        }
    });
}));

  beforeEach(() => {

  });

  it('should create', () => {
    fixture = TestBed.createComponent(PublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    router = bannerDe.injector.get(Router);


    routerSpy = spyOn(router, 'navigateByUrl').and.returnValue("url");
    testbed.compileComponents()
    expect(component).toBeTruthy();
  });

  it('should show a display pop up', () => {
    fixture = TestBed.createComponent(PublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    router = bannerDe.injector.get(Router);


    routerSpy = spyOn(router, 'navigateByUrl').and.returnValue("url");
    testbed.compileComponents()
    let publicationtDiv: HTMLDivElement = element.querySelector("button[type='button']")
    publicationtDiv.click()
  });

  it('should filter by project', () => {
    TestBed.overrideComponent(PublicationListComponent, {
        set: {
            providers: [{provide: ActivatedRoute, useValue: {snapshot: {paramMap: convertToParamMap({id: '4sd3f'})}}}, { provide: APP_BASE_HREF, useValue: '/' }, {provide: PublicationService, useValue: publicationServiceStub}]
        }
    })
    fixture = TestBed.createComponent(PublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    router = bannerDe.injector.get(Router);


    routerSpy = spyOn(router, 'navigateByUrl').and.returnValue("url");
    fixture = TestBed.createComponent(PublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
});
