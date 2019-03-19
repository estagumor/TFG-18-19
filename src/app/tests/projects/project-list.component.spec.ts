import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AcompleteComponent } from '../../components/acomplete/acomplete.component';
import { MatAutocompleteModule,MatInputModule, MatChipsModule, MatIconModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectListComponent } from '../../components/project-list/project-list.component';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterProjectsPipe} from '../../components/shared/filter.projects.pipe';
import { RouterModule, ActivatedRoute } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent, AcompleteComponent, FilterProjectsPipe],
      imports: [HttpClientModule,MatDialogModule, MatAutocompleteModule, MatInputModule, MatChipsModule, BrowserAnimationsModule, MatIconModule,ReactiveFormsModule, FormsModule, RouterModule.forRoot([])],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
