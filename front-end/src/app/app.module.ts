import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegistroPageComponent } from './pages/registro/registro.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { MongoDBService } from './services/mongoDB/mongo-db.service';
import { MenuVisivelService } from './services/menuVisivel/menu-visivel.service';
import { RegistroSidebarComponent } from './components/registro/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CalendarioComponent,
    DashboardComponent,
    RegistroPageComponent,
    RegistroComponent,
    HomeComponent,
    RegistroSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MongoDBService, MenuVisivelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
