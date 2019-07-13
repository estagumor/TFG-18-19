import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  let deleteSpy;
  let personService: PersonService;
  let routerSpy;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDisplayComponent ],
      imports: [RouterModule.forRoot([]), HttpClientModule, MatDialogModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
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

    deleteSpy = spyOn(personService, "deletePerson").and.returnValue(of(true));
    routerSpy = spyOn(router, 'navigate').and.returnValue("url");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should delete a person and go to persons' list", () => {
    let deleteButton: HTMLButtonElement = element.querySelector("button[name='deleteButton']");
    // TODO Quitar esto
    console.log("delete")
    console.log(element.querySelector("#deleteButton"));
    fixture.detectChanges();
    deleteButton.click();
    expect(deleteSpy).toHaveBeenCalled();
  })
});
