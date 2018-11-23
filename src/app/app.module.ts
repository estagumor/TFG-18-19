import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // Para formularios y el autocompletado(reactive)
import {routing, appRoutingProviders} from './app.routing'; // Para el enrutado
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material'; // Material design para el autocompletado
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'; // Ni puta idea
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // Animaciones para el autocompletado
import {DemoMaterialModule} from '../material-module'; // Mas material design para el autocompletado


import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ProjectsComponent} from './components/projects/projects.component';
import { InvestigationProjectComponent } from './components/investigation-project/investigation-project.component';
import { ContractComponent } from './components/contract/contract.component';
import { NetComponent } from './components/net/net.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    InvestigationProjectComponent,
    ContractComponent,
    NetComponent
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
    appRoutingProviders, // Para el enrutado
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
