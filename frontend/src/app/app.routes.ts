import { Routes } from '@angular/router';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { Component } from '@angular/core';
import { CrudUsuariosComponent } from './components/crud-usuarios/crud-usuarios.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent

    },
    {
        path: 'alquiler',
        component: AlquilerComponent,
    },
    {
        path: 'crud-usuarios', component: CrudUsuariosComponent,
    },
    {
        path: 'usuario-form', component: UsuarioFormComponent
    }
];
