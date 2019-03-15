import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationListComponent } from '../../components/publication-list/publication-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';

describe('PublicationListComponent', () => {
  let component: PublicationListComponent;
  let fixture: ComponentFixture<PublicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationListComponent ],
      imports: [HttpClientModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
