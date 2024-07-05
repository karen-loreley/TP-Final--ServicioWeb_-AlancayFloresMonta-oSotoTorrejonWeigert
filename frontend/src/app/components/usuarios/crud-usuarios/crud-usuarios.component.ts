import { Component } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-usuarios.component.html',
  styleUrl: './crud-usuarios.component.css'
})
export class CrudUsuariosComponent {

  parametro: string = "";
  usuarios: Array<Usuario>;
  
  constructor(private usuarioService: UsuarioService, private router: Router){
    this.usuarios = new Array<Usuario>();
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.getTodosUsuarios().subscribe(
      respond => {
        this.usuarios = respond;
        console.log(this.usuarios);
        });
    }
    
    buscarNombreUsuarioOPerfil(){
        if (!this.parametro) {
          this.obtenerUsuarios(); // Restauramos la lista completa
      } else {
          this.usuarioService.getNombreUsuarioOPerfil(this.parametro).subscribe(
              respond => {
                  this.usuarios = respond; // Mostramos los resultados de búsqueda
              },
              error => {
                  console.log(error);
              }
          );
      }
    }

  agregarUsuario():void{
    //redireccionara a al formulario
    this.router.navigate(['usuario-form', 0]);
    }
    elegirUsuario(id: string){
    this.router.navigate(["usuario-form", id]);
    }
    borrarUsuario(id: string):void{
    this.usuarioService.deleteUsuario(id).subscribe(
      respond => {
        if(respond.status == 1){
          this.obtenerUsuarios();
          alert('Usuario eliminado!');
        }
        
      }
    );
    
    }

}
