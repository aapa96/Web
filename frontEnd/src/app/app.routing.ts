import { ModuleWithProviders }from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//user

import {UserEditComponent} from './components/user-edit.components';
import { HomeComponent } from './components/home.component';


// canchas

import { FieldListComponent } from './components/field-list.component';
import { FieldAddComponent } from './components/field-add.component';
import { FieldEditComponent } from './components/field-edit.component';
import { FieldDetailComponent } from './components/field-detail.component';

//noticias
import { NoticiaListComponent } from './components/noticia-list.component';
import { NoticiaAddComponent } from './components/noticia-add.component';
import { NoticiadEditComponent } from './components/noticia-edit.component';
import { NoticiaDetailComponent } from './components/noticia-detail.component';

 
 

const appRoutes: Routes = [
	{path:'', component:HomeComponent},
	{path:'mis-datos',component:UserEditComponent},
	
	{path:'fields/:page', component:FieldListComponent},
	{path:'createField', component:FieldAddComponent},
	{path:'edit-field/:id', component:FieldEditComponent},
	{path:'field/:id', component:FieldDetailComponent},



	

	{path:'noticias/:page', component:NoticiaListComponent},
	{path:'crear-noticias', component:NoticiaAddComponent},
	{path:'edit-noticia/:id', component:NoticiadEditComponent},
	{path:'noticia/:id', component:NoticiaDetailComponent},
 	
 	{path:'**',component:HomeComponent} 	

];


export const appRoutingProviders: any[] =[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);