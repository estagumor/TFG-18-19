import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // Para formularios y el autocompletado(reactive)
import {MatAutocompleteModule,MatInputModule, MatChipsModule, MatIconModule, MatDialogModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ProjectCreateComponent} from './components/project-create/project-create.component';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StartDateLimitationDirective } from './components/shared/start-date-limitation.directive';
import { PublicationCreateComponent } from './components/publication-create/publication.create.component';
import { PublicationListComponent } from './components/publication-list/publication-list.component';
import { AcompleteComponent } from './components/acomplete/acomplete.component';
import { DisplayComponent } from './components/display/display.component';
import { LeadersRestrictionDirective } from './components/shared/leaders-restriction.directive';
import { ProjectListComponent } from '../app/components/project-list/project-list.component';
import { ProjectDisplayComponent } from '../app/components/project-display/project-display.component';
import { FilterProjectsPipe} from './components/shared/filter.projects.pipe';
import { FilterPublicationsPipe} from './components/shared/filter.publications.pipe';
import { PublicationAddListComponent } from '../app/components/publication-add-list/publication-add-list.component';
import { Router } from '@angular/router';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PublicationStatsComponent } from './components/publication-stats/publication-stats.component';
import { ChartsModule } from 'ng2-charts';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonDisplayComponent } from './components/person-display/person-display.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectStatsComponent } from './components/project-stats/project-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectCreateComponent,
    StartDateLimitationDirective,
    PublicationCreateComponent,
    PublicationListComponent,
    AcompleteComponent,
    DisplayComponent,
    LeadersRestrictionDirective,
    ProjectListComponent,
    ProjectDisplayComponent,
    FilterProjectsPipe,
    FilterPublicationsPipe,
    PublicationAddListComponent,
    PersonCreateComponent,
    PublicationStatsComponent,
    PersonListComponent,
    PersonDisplayComponent,
    DashboardComponent,
    ProjectStatsComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    ChartsModule
  ],
  entryComponents: [PublicationListComponent, DisplayComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports: [StartDateLimitationDirective],
})
export class AppModule {}
