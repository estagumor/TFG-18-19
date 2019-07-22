import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material'

import { PersonDisplayComponent } from '../../components/person-display/person-display.component';
import { DebugElement } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { of } from 'rxjs';

describe('Person Display Component', () => {
  let component: PersonDisplayComponent;
  let fixture: ComponentFixture<PersonDisplayComponent>;
  let element: HTMLElement;
  let personServiceStub: Partial<PersonService>;

  let deleteSpy;
  let getSpy;
  let editSpy;
  let personService: PersonService;
  let routerSpy;
  let router;
  let getAllSpy;

  beforeEach(async(() => {
    personServiceStub = {
        getPerson: function(personId){
            return of({"body": {"person": {}}});
        },
        updatePerson: function(personId){
            return of({"body": {}});
        },
        deletePerson: function(personId){
            return of({"body": {}});
        },
        getAll: function(){
            return of({"body": {"persons": {}}})
        }
    }
    TestBed.configureTestingModule({
      declarations: [ PersonDisplayComponent ],
      imports: [RouterModule.forRoot([]), HttpClientModule, MatDialogModule],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}, {provide: PersonService, useValue: personServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    personService = bannerDe.injector.get(PersonService);
    router = bannerDe.injector.get(Router);

    getSpy = null;
    editSpy = spyOn(personService, "updatePerson").and.returnValue(of(true));
    deleteSpy = spyOn(personService, "deletePerson").and.returnValue(of(true));
    getAllSpy = spyOn(personService, "getAll").and.returnValue(of(true));
    routerSpy = spyOn(router, 'navigate').and.returnValue("url");
  });

  it('should create', () => {
    getSpy = spyOn(personService, "getPerson").and.returnValue(of({"body": {}}))
    expect(component).toBeTruthy();
  });

  it("should delete a person and go to persons' list", () => {
    getSpy = spyOn(personService, "getPerson").and.returnValue(of({"body": {}}))
    let deleteButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[id='deleteButton']");
    deleteButton.click();
    expect(deleteSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  })

  it("should go to edit view", () => {
    getSpy = spyOn(personService, "getPerson").and.returnValue(of({"body": {}}))
    let editButton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[id='editButton']");
    editButton.click()
    expect(routerSpy).toHaveBeenCalled();
  })

  it("should go to list view", () => {
    personServiceStub.getPerson = function(personId) {
      return of(null);
    }
    getSpy = spyOn(personService, "getPerson").and.returnValue(of(null));
    fixture = TestBed.createComponent(PersonDisplayComponent)
    expect(routerSpy).toHaveBeenCalled()
  })
});
