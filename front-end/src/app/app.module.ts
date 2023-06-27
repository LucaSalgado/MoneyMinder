import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroUnicoComponent } from './components/registro-unico/registro-unico.component';
import { RegistroParceladoComponent } from './components/registro-parcelado/registro-parcelado.component';
import { MongoDBService } from './services/mongoDB/mongo-db.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CalendarioComponent,
    DashboardComponent,
    RegistroComponent,
    HomeComponent,
    RegistroUnicoComponent,
    RegistroParceladoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [MongoDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
