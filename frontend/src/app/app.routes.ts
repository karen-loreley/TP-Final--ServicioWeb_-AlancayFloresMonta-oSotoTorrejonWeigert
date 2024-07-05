import { Routes } from '@angular/router';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { Component } from '@angular/core';
import { CrudUsuariosComponent } from './components/crud-usuarios/crud-usuarios.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { HomeComponent } from './components/home/home.component';
<<<<<<< Updated upstream
import { AlquilerFormComponent } from './components/alquileres/alquiler-form/alquiler-form.component';
import { LocalComponent } from './components/local/local.component';
import { LocalFormComponent } from './components/local-form/local-form.component';
=======
//usuarios
import { CrudUsuariosComponent } from './components/usuarios/crud-usuarios/crud-usuarios.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { LoginComponent } from './components/usuarios/login/login.component';
//locales
import { LocalComponent } from './components/locals/local/local.component';
import { LocalFormComponent } from './components/locals/local-form/local-form.component';
import { AlquilerComponent } from './components/alquileres/alquiler/alquiler.component';
import { PagoComponent } from './components/pagos/pago/pago.component';
import { FormPagoComponent } from './components/pagos/form-pago/form-pago.component';
import { AlquilerFormComponent } from './components/alquileres/alquiler-form/alquiler-form.component';
>>>>>>> Stashed changes

export const routes: Routes = [
        //inicio/home
        {path: '', redirectTo: '/home', pathMatch: 'full' }, //redirecciona directamente al home apenas inicia
        {path: 'home', component: HomeComponent},
    
<<<<<<< Updated upstream
=======
        //alquileres
        {path: 'alquiler',component: AlquilerComponent},
        {path: 'alquiler/:id', component: AlquilerComponent,},
        {path: 'alquiler-form', component: AlquilerFormComponent,},
        {path: 'alquiler-form/:id', component: AlquilerFormComponent,},
    
>>>>>>> Stashed changes
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
