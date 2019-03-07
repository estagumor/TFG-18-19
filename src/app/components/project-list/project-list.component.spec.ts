import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AcompleteComponent } from '../acomplete/acomplete.component';
import { MatAutocompleteModule,MatInputModule, MatChipsModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectListComponent } from './project-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent, AcompleteComponent],
      imports: [MatAutocompleteModule, MatInputModule, MatChipsModule, BrowserAnimationsModule, MatIconModule,ReactiveFormsModule, FormsModule]
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
