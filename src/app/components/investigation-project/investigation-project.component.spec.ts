import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InvestigationProjectComponent } from './investigation-project.component';
import { APP_BASE_HREF } from '@angular/common';
import {MatAutocompleteModule,MatInputModule, MatChipsModule, MatIconModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { InvestigationProject } from 'src/app/models/investigationProject';
import { InvestigationProjectService } from '../../services/investigation.project.service';

describe('InvestigationProjectComponent', () => {
  let component: InvestigationProjectComponent;
  let fixture: ComponentFixture<InvestigationProjectComponent>;
  let frms: DebugElement;
  let p: InvestigationProject;
  let el: any;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationProjectComponent ],
      imports: [ReactiveFormsModule, FormsModule,HttpClientModule, MatAutocompleteModule, MatInputModule, MatChipsModule, MatIconModule, RouterModule.forRoot([])],
      providers: [{InvestigationProjectService, provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationProjectComponent);
    component = fixture.componentInstance;
    frms = fixture.debugElement.query(By.css('form')); //OBTAINS THE FORMS OF THE COMPONENT
    el = frms.nativeElement;
    fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //GENERAL
  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(InvestigationProjectComponent); //Create the component
    fixture.detectChanges(); 
    const compiled = fixture.debugElement.nativeElement; //Get the component compiled
    expect(compiled.querySelector('h2').textContent).toContain('Proyectos de investigacion'); //Checks that the h2 tag contains the title
  }));

  //FORMS
  it('should call the onSubmit method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement; //We search the button inside the form
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0); //No se le llama porque da error de validacion
  }));

  //SERVICE
  /*
  it('should delete the investigation project', async(() => {
    p = new InvestigationProject(['Pepe','Lola'], ['Lola'], ['Julia'],'Prueba','Esto es una prueba',['NoseNose'],'246810k','scope','status','Sponsor', new Date(), new Date(), 230, [], []);
    component.borrar(p._id)
  })
  */
});
