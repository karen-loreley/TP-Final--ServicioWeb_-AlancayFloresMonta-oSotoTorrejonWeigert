import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropietarioService } from '../../../services/propietario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
  usuario: Usuario = new Usuario();
  usuarios: Array<Usuario>;
  id: string | null = null;
  propietario: any = {
    apellido: '',
    nombres: '',
    dni: '',
    email: '',
    telefono: null
  };

  mostrarContrasena = false;
  randomPassword: string = "";
  
  accion: string = "new"; //accion tendra los valores de new y update

  constructor(private usuarioService: UsuarioService,private propietarioService: PropietarioService, private router: Router, private activatedRoute: ActivatedRoute){
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
            response => {
              if (response.status == 1) {
                if (this.usuario.perfil === 'Propietario') {
                  this.propietario.usuarioId = response.data._id; 
                  this.propietario.email = this.usuario.email; 
                  this.propietarioService.addPropietario(this.propietario).subscribe(() => {
                    alert("El usuario y propietario se agregaron correctamente");
                    this.router.navigate(['crud-usuarios']);
                  });
                } else {
                  alert("El usuario se agregó correctamente");
                  this.router.navigate(['crud-usuarios']);
                }
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

  cargarUsuario(id: string) {
    this.usuarioService.getUsuario(id).subscribe(
      respond => {
        Object.assign(this.usuario, respond);
        if (this.usuario.perfil === 'Propietario') {
          this.propietarioService.getPropietarioByUsuarioId(id).subscribe(prop => {
            this.propietario = prop;
          });
        }
      },
      error => {
        console.log("Error al cargar usuario:", error);
      }
    )
  }

    atras():void{
      this.router.navigate(['crud-usuarios']);
    }

    modificarUsuario() {
      this.usuarioService.putUsuario(this.usuario).subscribe(
        response => {
          if (response.status === 1) {
            if (this.usuario.perfil === 'Propietario') {
              if (this.propietario._id) {
                this.propietarioService.updatePropietario(this.propietario._id, this.propietario).subscribe(() => {
                  alert("El Usuario y propietario se actualizaron correctamente");
                  this.router.navigate(['crud-usuarios']);
                }, error => {
                  console.error("Error al actualizar propietario:", error);
                  alert("Error al actualizar propietario");
                });
              } else {
                console.error("ID del propietario no encontrado para la actualización");
                alert("ID del propietario no encontrado para la actualización");
              }
            } else {
              alert("El Usuario se actualizó correctamente");
              this.router.navigate(['crud-usuarios']);
            }
          }
        },
        error => {
          console.error("Error al actualizar usuario:", error);
          alert("Error al actualizar usuario");
        }
      );
    }

    cambiarActivo(event: any) {
      this.usuario.activo = event.target.checked;
    }

}
