import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroUnicoComponent } from './components/registro-unico/registro-unico.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CalendarioComponent,
    DashboardComponent,
    RegistroComponent,
    HomeComponent,
    RegistroUnicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
