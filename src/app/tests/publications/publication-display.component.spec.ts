import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { RouterModule, Route, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material'

import { PublicationDisplayComponent } from '../../components/publication-display/publication-display.component';
import { PublicationService } from 'src/app/services/publication.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

describe('PublicationDisplayComponent', () => {
  let component: PublicationDisplayComponent;
  let fixture: ComponentFixture<PublicationDisplayComponent>;
  let routeSpy;
  let router: Router
  let publicationServiceStub: Partial<PublicationService>;
  let element

  beforeEach(async(() => {
    publicationServiceStub = {
        getPublication: function(id){
            return of({"body": {"pub": {}}})
        }
    }
    TestBed.configureTestingModule({
      declarations: [PublicationDisplayComponent],
      imports: [RouterModule.forRoot([]), HttpClientModule, MatDialogModule],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}, {provide: PublicationService, useValue: publicationServiceStub}, { provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    router = bannerDe.injector.get(Router);

    routeSpy = spyOn(router, "navigate").and.returnValue("url")
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to edit view', () => {
      let boton: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("button[id='editButton']")
      boton.click()
      expect(routeSpy).toHaveBeenCalled()
  })
});
