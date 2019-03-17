import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationAddListComponent } from '../../components/publication-add-list/publication-add-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common';

describe('PublicationAddListComponent', () => {
  let component: PublicationAddListComponent;
  let fixture: ComponentFixture<PublicationAddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationAddListComponent ],
      imports: [HttpClientModule, RouterModule.forRoot([]),MatDialogModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
