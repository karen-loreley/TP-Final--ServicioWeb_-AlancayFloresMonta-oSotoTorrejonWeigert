import { Routes } from '@angular/router';
import { AlquilerComponent } from './components/alquileres/alquiler/alquiler.component';
import { Component } from '@angular/core';
import { CrudUsuariosComponent } from './components/usuarios/crud-usuarios/crud-usuarios.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { HomeComponent } from './components/home/home.component';
import { LocalComponent } from './components/locals/local/local.component';
import { LocalFormComponent } from './components/locals/local-form/local-form.component';
import { AlquilerpagoComponent } from './components/alquileres/alquilerpago/alquilerpago.component';

export const routes: Routes = [
        //inicio/home
        {path: '', redirectTo: '/home', pathMatch: 'full' }, //redirecciona directamente al home apenas inia
        {path: 'home', component: HomeComponent},

        //alquileres
        {path: 'alquiler',component: AlquilerComponent,},
        {path: 'alquiler/pago',component:AlquilerpagoComponent},
        //usuarios
        {path: 'crud-usuarios', component: CrudUsuariosComponent,},
        {path: 'usuario-form', component: UsuarioFormComponent},

        //local
        {path: 'local', component: LocalComponent},
        {path: 'local-form/:id', component: LocalFormComponent},
];
