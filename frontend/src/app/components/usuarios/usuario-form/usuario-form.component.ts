import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
  usuario!: Usuario;
  usuarios: Array<Usuario>;
  mostrarContrasena = false;
  randomPassword: string = "";
  accion: string = "new"; //accion tendra los valores de new y update

  constructor(private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute){
    this.usuarios = new Array<Usuario>();
    this.iniciarVariable();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) { //si hay un id
        if (params['id'] === '0') { 
          this.accion = "new";
        } else {
          this.accion = "update";
          this.cargarUsuario(params['id']);
        }
      }
    });
  }

    iniciarVariable(){
      this.usuario = new Usuario();
    }

    registrarUsuario():void{

      if (this.randomPassword) {
              // Si hay una contraseña generada, se guarda en usuario.password
              this.usuario.password = this.randomPassword;
          }

      this.usuarioService.addUsuario(this.usuario).subscribe(
        respond => {
          if(respond.status == 1){
            
            alert("El usuario se agrego correctamente");
            console.log(respond);
            this.router.navigate(['crud-usuarios']);
          }
        },
        error => {
          alert("Error al registrar");
          console.log(error);
        }
      );
      this.usuario = new Usuario(); 
    }

    verContrasenaEncriptada() {
      this.mostrarContrasena = !this.mostrarContrasena;
  }

  obtenerRandomPassword(){
    this.usuarioService.getRandomPassword().subscribe(
      respond =>{
        this.randomPassword = respond.password;
      },
      error =>{
        console.log(error);
      }
    )
  }

    cargarUsuario(id: string){
      this.usuarioService.getUsuario(id).subscribe(
        respond => {
         Object.assign(this.usuario, respond);
        }
      )
    }

    atras():void{
      this.router.navigate(['crud-usuarios']);
    }

    modificarUsuario(){
      this.usuarioService.putUsuario(this.usuario).subscribe(
        respond => {
          if(respond.status == 1){
            alert("El Usuario se actualizo correctamente");
            this.router.navigate(['crud-usuarios']);
          }
        },
        error => {
          console.log(error);
          alert("El usuario no se actualizo correctamente");
        }
      )
    }

    cambiarActivo(event: any) {
      this.usuario.activo = event.target.checked;
    }

}
