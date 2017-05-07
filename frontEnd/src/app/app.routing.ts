import { ModuleWithProviders }from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//user

import {UserEditComponent} from './components/user-edit.components';
import { HomeComponent } from './components/home.component';


// canchas

import { FieldListComponent } from './components/field-list.component';
import { FieldAddComponent } from './components/field-add.component';


const appRoutes: Routes = [
	{path:'', component:HomeComponent},
	{path:'fields/:page', component:FieldListComponent},
	{path:'createField', component:FieldAddComponent},
	{path:'mis-datos',component:UserEditComponent},
	{path:'**',component:FieldListComponent}

];


export const appRoutingProviders: any[] =[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);