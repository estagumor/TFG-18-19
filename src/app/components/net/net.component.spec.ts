import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NetComponent } from './net.component';
import {APP_BASE_HREF} from '@angular/common';


import { RouterModule, Routes } from '@angular/router';

describe('NetComponent', () => {
  let component: NetComponent;
  let fixture: ComponentFixture<NetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetComponent ],
      imports: [ReactiveFormsModule, FormsModule,HttpClientModule, RouterModule.forRoot([])],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
