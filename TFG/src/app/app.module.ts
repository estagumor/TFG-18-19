import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing, appRoutingProviders} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from '../material-module';


import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ExternoComponent} from './components/externo/externo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ProjectsComponent,
    ExternoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
