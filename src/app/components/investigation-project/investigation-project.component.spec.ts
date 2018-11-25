import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InvestigationProjectComponent } from './investigation-project.component';
import {APP_BASE_HREF} from '@angular/common';


import { RouterModule, Routes } from '@angular/router';

describe('InvestigationProjectComponent', () => {
  let component: InvestigationProjectComponent;
  let fixture: ComponentFixture<InvestigationProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationProjectComponent ],
      imports: [ReactiveFormsModule, FormsModule,HttpClientModule, RouterModule.forRoot([])],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
