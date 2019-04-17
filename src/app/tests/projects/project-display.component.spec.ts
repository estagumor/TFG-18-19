import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material'

import { ProjectDisplayComponent } from '../../components/project-display/project-display.component';

describe('ProjectDisplayComponent', () => {
  let component: ProjectDisplayComponent;
  let fixture: ComponentFixture<ProjectDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDisplayComponent ],
      imports: [ RouterModule.forRoot([]),HttpClientModule,MatDialogModule] ,
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
