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

//pago y alquileres
import { AlquilerpagoComponent } from './components/alquileres/alquilerpago/alquilerpago.component';
import { PagoComponent } from './components/pagos/pago/pago.component';
import { FormPagoComponent } from './components/pagos/form-pago/form-pago.component';
import { AlquilerComponent } from './components/alquileres/alquiler/alquiler.component';

export const routes: Routes = [
        //inicio/home
        {path: '', redirectTo: '/home', pathMatch: 'full' }, //redirecciona directamente al home apenas inicia
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

        //pago
        {path: 'pago', component: PagoComponent},
        {path: 'pago-form/:id', component: FormPagoComponent},
        {path: 'pago-form', component: FormPagoComponent},
];
