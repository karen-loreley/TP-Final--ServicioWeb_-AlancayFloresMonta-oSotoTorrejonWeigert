import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
          var usuario = result;
          if (usuario.status == 1){

          sessionStorage.setItem("user", usuario.username);
          sessionStorage.setItem("userid", usuario.userid);
          sessionStorage.setItem("perfil", usuario.perfil);

          this.router.navigateByUrl(this.returnUrl);
          } else {

          this.msglogin="Credenciales incorrectas..";
          }
      },
      error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
          });
  }

  formusuario(){
    this.router.navigate(['usuario-form']);
  }

}

