import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';

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
import { RegistroSidebarComponent } from './pages/registro/sidebar/sidebar.component';
import { AtualizacaoComponent } from './components/atualizacao/atualizacao.component';
import { ExclusaoComponent } from './components/exclusao/exclusao.component';

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
    AtualizacaoComponent,
    ExclusaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [MongoDBService, MenuVisivelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
