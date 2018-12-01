import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './projects.component';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { defer, of } from 'rxjs';
import { By } from '@angular/platform-browser';


import { RouterModule, Routes } from '@angular/router';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let element: HTMLElement;
  let listSpy;
  let getterSpy;
  let createSpy;
  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule.forRoot([])],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    var bannerEl: HTMLElement = bannerDe.nativeElement;
    element = bannerEl;

    projectService = bannerDe.injector.get(ProjectService)
    listSpy = spyOn(projectService, 'getProjects').and.returnValue(of(true));  
    getterSpy = spyOn(projectService, 'getProject').and.returnValue(of(true));
    createSpy = spyOn(projectService, 'createV2').and.returnValue(of(true));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('bind project properties through a form', () => {
    document.querySelector("input[name='title']").textContent = 'isa';
    expect(component.project.title = 'isa');
  });
  it('should list all the projects', () => {
    let boton: HTMLButtonElement = element.querySelector("button[id='listButton']")
    boton.click();
    expect(listSpy).toHaveBeenCalled();
  })

  it('should create a project', () => {
    let boton: HTMLButtonElement = element.querySelector("button[id='submitForm']")
    let competencia: HTMLInputElement = element.querySelector("input[name='scope']")
    let estado : HTMLInputElement = element.querySelector("input[name='status']")
    estado.value = 'ACEPTADO';
    competencia.value = 'OTROS';
    fixture.detectChanges();
    boton.click();
    expect(createSpy).toHaveBeenCalled();
  })

  it('should get a project', () => {
    const input = fixture.debugElement.query(By.css('#idInput'));
    component.projectId = "5bd79886addca429f504da62"
    input.triggerEventHandler('keyup.enter', {})
    expect(getterSpy).toHaveBeenCalled();
  })
});