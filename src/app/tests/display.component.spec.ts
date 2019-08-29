import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DisplayComponent } from '../components/display/display.component';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;
  
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ DisplayComponent ],
      imports: [HttpClientModule],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {"objeto":{"urls":[],"_id":"5d45ab6e1a7455742efd7f4c","name":"José Antonio","surname":"Parejo","allowed":true,"job":"RESEARCHER","office":"I0.71","scopusId":"24802465400","professionalStatus":"RESEARCHER","telf":"954556877","email":"japarejo at us punto es","photo":"https://www.isa.us.es/2.0/assets/img/members/picture-11995321950.jpg","active":true,"__v":0},"fields":{"name":"Nombre","surname":"Apellidos","email":"Correo electrónico","telf":"Teléfono","office":"Despacho"}}},
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    
  })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;

    // find the hero's DebugElement and element
    let titleDe = fixture.debugElement.query(By.css('.card-header'));
    let restDe = fixture.debugElement.query(By.css('.card-body'));
    
    let titleEl = titleDe.nativeElement;
    let restEl = restDe.nativeElement;
    // mock the hero supplied by the parent component
    let expectedObj = { title: 'Prueba', array: ['Pepe','Julia','Ana'] };
    // simulate the parent setting the input property with that hero
    component.objeto = expectedObj;


    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display our object correctly', () => {
    // const expectedPipedName = expectedHero.name.toUpperCase();
    // expect(heroEl.textContent).toContain(expectedPipedName);
  });

});
