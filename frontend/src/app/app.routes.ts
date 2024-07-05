import { Routes } from '@angular/router';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { Component } from '@angular/core';
import { CrudUsuariosComponent } from './components/crud-usuarios/crud-usuarios.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { HomeComponent } from './components/home/home.component';
import { AlquilerFormComponent } from './components/alquileres/alquiler-form/alquiler-form.component';
import { LocalComponent } from './components/local/local.component';
import { LocalFormComponent } from './components/local-form/local-form.component';

export const routes: Routes = [
        //inicio/home
        {path: '', redirectTo: '/home', pathMatch: 'full' }, //redirecciona directamente al home apenas inicia
        {path: 'home', component: HomeComponent},
    
        //usuarios
        {path: 'crud-usuarios', component: CrudUsuariosComponent,},
        {path: 'registro', component: UsuarioFormComponent},
    
        //local
        {path: 'local', component: LocalComponent,},
        {path: 'local-form/:id', component: LocalFormComponent,},

        //alquiler
        {path: 'alquiler', component: AlquilerComponent,},
        {path: 'alquiler/:id', component: AlquilerComponent,},
        {path: 'alquiler-form', component: AlquilerFormComponent,},
        {path: 'alquiler-form/:id', component: AlquilerFormComponent,},
];
