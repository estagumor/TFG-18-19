import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // Para formularios y el autocompletado(reactive)
import {MatAutocompleteModule,MatInputModule, MatChipsModule, MatIconModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ProjectsComponent} from './components/projects/projects.component';
import { InvestigationProjectComponent } from './components/investigation-project/investigation-project.component';
import { ContractComponent } from './components/contract/contract.component';
import { NetComponent } from './components/net/net.component';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StartDateLimitationDirective } from './components/shared/start-date-limitation.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    InvestigationProjectComponent,
    ContractComponent,
    NetComponent,
    StartDateLimitationDirective,
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
    MatIconModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent],
  exports: [StartDateLimitationDirective],
})
export class AppModule {}
