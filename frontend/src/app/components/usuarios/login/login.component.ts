import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from 'ngx-facebook/public_api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  userform: Usuario = new Usuario(); 
  returnUrl!: string;
  msglogin!: string; 


    constructor(private route: ActivatedRoute, private router: Router, private loginService:LoginService)
    { }

    ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    login() {
      this.loginService.login(this.userform.usuario, this.userform.password).subscribe(
        (result) => {
          const usuario = result;
          if (usuario.status === 1) {
            // Guardar el token y los datos del usuario
            sessionStorage.setItem("user", result.usuario);
            sessionStorage.setItem("userid", result._id);
            sessionStorage.setItem("perfil", result.perfil);
            sessionStorage.setItem("token", result.token);
            this.loginService.setLoggedIn(true);
            console.log('login correcto');
            if (usuario.perfil === 'propietario') {
              if (!sessionStorage.getItem('firstLoginPropietario')) {
                sessionStorage.setItem('firstLoginPropietario', 'true');
              }
              this.router.navigate(['propietario-form', 0]);
            } else {
              this.router.navigate([this.returnUrl]);
            }
          } else {
            this.msglogin = "Credenciales incorrectas..";
          }
        },
        error => {
          alert("Error de conexión");
          console.log("error en conexión");
          console.log(error);
        }
      );
  }

  registrarse(){
    this.router.navigate(['usuario-form',0]);
  }

}

