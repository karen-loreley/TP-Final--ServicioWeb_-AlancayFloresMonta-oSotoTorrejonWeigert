import { Routes } from '@angular/router';
import { AlquilerComponent } from './components/alquileres/alquiler/alquiler.component';
import { Component } from '@angular/core';
import { CrudUsuariosComponent } from './components/usuarios/crud-usuarios/crud-usuarios.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { HomeComponent } from './components/home/home.component';
import { LocalComponent } from './components/locals/local/local.component';
import { LocalFormComponent } from './components/locals/local-form/local-form.component';
import { PagoComponent } from './components/pagos/pago/pago.component';
import { FormPagoComponent } from './components/pagos/form-pago/form-pago.component';

export const routes: Routes = [
        //inicio/home
        {path: '', redirectTo: '/home', pathMatch: 'full' }, //redirecciona directamente al home apenas inicia
        {path: 'home', component: HomeComponent},
    
        //alquileres
        {path: 'alquiler',component: AlquilerComponent,},
    
        //usuarios
        {path: 'crud-usuarios', component: CrudUsuariosComponent,},
        {path: 'registro', component: UsuarioFormComponent},
    
        //local
        {path: 'local', component: LocalComponent},
        {path: 'local-form/:id', component: LocalFormComponent},

        //pago
        {path: 'pago', component: PagoComponent},
        {path: 'pago-form/:id', component: FormPagoComponent},
        {path: 'pago-form', component: FormPagoComponent},
        
];
