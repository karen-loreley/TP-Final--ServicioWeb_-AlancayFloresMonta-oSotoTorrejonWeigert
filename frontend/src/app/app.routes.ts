import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
//usuarios
import { CrudUsuariosComponent } from './components/usuarios/crud-usuarios/crud-usuarios.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { LoginComponent } from './components/usuarios/login/login.component';
//locales
import { LocalComponent } from './components/locals/local/local.component';
import { LocalFormComponent } from './components/locals/local-form/local-form.component';
import { AlquilerComponent } from './components/alquileres/alquiler/alquiler.component';
import { PagoComponent } from './components/pagos/pago/pago.component';
import { AlquilerFormComponent } from './components/alquileres/alquiler-form/alquiler-form.component';
import { FormPagoComponent } from './components/pagos/form-pago/form-pago.component';
import { NovedadComponent } from './components/novedades/novedad/novedad.component';
import { NovedadFormComponent } from './components/novedades/novedad-form/novedad-form.component';
import { PropietarioComponent } from './components/propietarios/propietario/propietario.component';
import { PropietarioFormComponent } from './components/propietarios/propietario-form/propietario-form.component';
import { SuccesComponent } from './components/pagos/succes/succes.component';
import { CrudPromocinoComponent } from './components/alquileres/crud-promocino/crud-promocino.component';

export const routes: Routes = [
        //inicio/home

        {path: 'home', component: HomeComponent},

        //alquileres
        {path: 'alquiler',component: AlquilerComponent},
        {path: 'alquiler/:id', component: AlquilerComponent,},
        {path: 'alquiler-form', component: AlquilerFormComponent,},
        {path: 'alquiler-form/:id', component: AlquilerFormComponent,},

        //usuarios
        {path: 'crud-usuarios', component: CrudUsuariosComponent,},
        {path: 'usuario-form', component: UsuarioFormComponent},
        {path: 'usuario-form/:id', component: UsuarioFormComponent},
        {path: 'login', component: LoginComponent},

        //local
        {path: 'local', component: LocalComponent},
        {path: 'local-form/:id', component: LocalFormComponent},

        //pago
        {path: 'pago', component: PagoComponent},
        {path: 'pago-form/:id', component: FormPagoComponent},
        {path: 'pago-form', component: FormPagoComponent},
        { path:'pago-exitoso', component: SuccesComponent },
        { path:'pago-fallido', component: SuccesComponent },
        
        //novedades
        {path: 'novedad', component: NovedadComponent},
        {path: 'novedad/:id', component: NovedadComponent},
        {path: 'novedad-form', component: NovedadFormComponent},
        {path: 'novedad-form/:id', component: NovedadFormComponent},

        //propietarios
        {path: 'propietario', component: PropietarioComponent},
        {path: 'propietario-form/:id', component: PropietarioFormComponent},

        //promociones
        {path: 'crud-promocion', component: CrudPromocinoComponent},

        {path: '**', redirectTo: '/home', pathMatch: 'full' }, //redirecciona directamente al home apenas inicia

];
