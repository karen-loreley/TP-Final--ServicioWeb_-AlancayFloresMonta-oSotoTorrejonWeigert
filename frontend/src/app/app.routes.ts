import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
//usuarios
import { CrudUsuariosComponent } from './components/usuarios/crud-usuarios/crud-usuarios.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { LoginComponent } from './components/usuarios/login/login.component';
//locales
import { LocalComponent } from './components/locals/local/local.component';
import { LocalFormComponent } from './components/locals/local-form/local-form.component';
//alquileres
import { AlquilerComponent } from './components/alquileres/alquiler/alquiler.component';
import { AlquilerFormComponent } from './components/alquileres/alquiler-form/alquiler-form.component';


export const routes: Routes = [
        //inicio/home
        {path: '', redirectTo: '/home', pathMatch: 'full' }, //redirecciona directamente al home apenas inicia
        {path: 'home', component: HomeComponent},
    
        //alquileres
        {path: 'alquiler',component: AlquilerComponent,},
    
        //usuarios
        {path: 'crud-usuarios', component: CrudUsuariosComponent,},
        {path: 'registro', component: UsuarioFormComponent},
        {path: 'registro/:id', component: UsuarioFormComponent},
        {path: 'login',component: LoginComponent},
    
        //local
        {path: 'local', component: LocalComponent},
        {path: 'local-form/:id', component: LocalFormComponent},

         //alquiler
         {path: 'alquiler', component: AlquilerComponent,},
         {path: 'alquiler/:id', component: AlquilerComponent,},
         {path: 'alquiler-form', component: AlquilerFormComponent,},
];
