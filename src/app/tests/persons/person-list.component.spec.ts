import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListComponent } from '../../components/person-list/person-list.component';
import { PersonService } from 'src/app/services/person.service';
import { of } from 'rxjs';
import { DisplayComponent } from 'src/app/components/display/display.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute, Router } from '@angular/router'
import { DebugElement } from '@angular/core';
import { MatAutocompleteModule, MatInputModule, MatChipsModule, MatIconModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Person } from 'src/app/models/person';

class MockActivatedRoute extends ActivatedRoute {
    constructor() {
        super();
        this.params = of({ id: "5" });
    }

    setParamsMock(params) {
        this.params = params
    }
}

function parsePerson(array): Person {
    return new Person(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11])
}

describe('PersonListComponent', () => {
    let component: PersonListComponent;
    let fixture: ComponentFixture<PersonListComponent>;
    let personServiceStub: Partial<PersonService>;
    let routerSpy;
    let router;
    let activatedRouteStub: MockActivatedRoute;
    let element;
    let persons = [{
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
    }, {
        name: "Carlos",
        surname: "Müller",
        allowed: true,
        job: "RESEARCHER",
        office: "F0.43",
        scopusId: "55728096900",
        professionalStatus: "RESEARCHER",
        telf: "954553868",
        email: "cmuller at us punto es",
        photo: "https://www.isa.us.es/2.0/assets/img/members/picture-1378798236.jpg",
        active: true
    }, {
        name: "Adela",
        surname: "del Rio",
        allowed: true,
        job: "RESEARCHER",
        office: "F0.54",
        scopusId: "22333640600",
        professionalStatus: "RESEARCHER",
        telf: "954559814",
        email: "adeladelrio at us punto es",
        photo: "https://www.isa.us.es/2.0/assets/img/members/picture-11384027785.jpg",
        active: true
    }]

    beforeEach(async(() => {
        activatedRouteStub = new MockActivatedRoute();
        personServiceStub = {
            getAll: function () {
                return of({
                    "body": {
                        "persons": persons
                    }
                })
            },
            getPerson: function () {
                return of({
                    "body": {
                        "person": persons[0]
                    }
                })
            }
        }
        TestBed.configureTestingModule({
            declarations: [PersonListComponent, DisplayComponent],
            imports: [HttpClientModule, MatDialogModule, MatAutocompleteModule, MatInputModule, MatChipsModule, BrowserAnimationsModule, MatIconModule, RouterModule.forRoot([])],
            providers: [{ provide: PersonService, useValue: personServiceStub }, { provide: ActivatedRoute, useValue: activatedRouteStub }],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonListComponent);
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
        expect(component.listado.length == 3).toBeTruthy();
    });

    it('should try the display button', () => {
        let boton: HTMLButtonElement = element.querySelector("button[name='displayButton']");
        boton.click();
        expect(routerSpy).toHaveBeenCalled();
    });

    it('should try the display method', () => {
        component.displayPerson("sd56f4s")
        expect(component.selectedPerson == parsePerson(persons[0]));
    });

    it('should show a display pop up', () => {
        let personDiv: HTMLDivElement = element.querySelector("#personDiv")
        personDiv.click()
    });

    it('should filter', () => {
        let input = element.querySelector("input[name='filterPerson']");
        input.value = "Parejo";
        input.dispatchEvent(new Event("keyup"));
        expect(component.listado2[0] == parsePerson(persons[0]));
    });
});
