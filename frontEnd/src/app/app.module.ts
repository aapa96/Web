import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing,appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.components';

import { FieldListComponent } from './components/field-list.component';
import { FieldAddComponent } from './components/field-add.component';
import { FieldEditComponent } from './components/field-edit.component';
import { FieldDetailComponent } from './components/field-detail.component';

import { NoticiaListComponent } from './components/noticia-list.component';
import { NoticiaAddComponent } from './components/noticia-add.component';
import { NoticiadEditComponent } from './components/noticia-edit.component';
import { NoticiaDetailComponent } from './components/noticia-detail.component';

import { EventoAddComponent } from './components/eventos-add.component'; 
import { EventoListComponent } from './components/eventos-list.component';
/*import { EventoListComponent } from './components/evento-list.component';
import { EventodAddComponent } from './components/evento-add.component'; 
import { EventoDetailComponent } from './components/evento-detail.component';
*/
 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,

    FieldListComponent,
    FieldAddComponent,
    FieldEditComponent,
    FieldDetailComponent,

    EventoAddComponent,
    EventoListComponent,
 
    NoticiaListComponent,
    NoticiaAddComponent,
    NoticiadEditComponent,
    NoticiaDetailComponent



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
