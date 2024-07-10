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

  perfil: string = "";
  perfiles:string[]=['administrativo','dueño']

  
  constructor(private usuarioService: UsuarioService, private router: Router){
    this.usuarios = new Array<Usuario>();
    this.obtenerUsuarios();
    this.perfil = '';
  }

  
  obtenerUsuarios() {
    this.usuarioService.getTodosUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;      
        console.log(this.usuarios);
        this.filtrarPorPefil(this.perfil)
      },
      error => {
        console.error('Error al obtener usuarios:', error);
      }
    );
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

    filtrarPorPefil(perfil:string){
      if(perfil === ""){
        this.usuarios = this.usuarios;
      }else{
        this.usuarios=this.usuarios.filter(usuario => usuario.perfil === perfil)
      }
    }

  agregarUsuario():void{
    //redireccionara a al formulario
    this.router.navigate(['usuario-form', 0]);
    }
    elegirUsuario(id: string){
    this.router.navigate(["usuario-form"]);
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

  cambiarPerfil(perfil:string){
    this.perfil = perfil;
    this.filtrarPorPefil(perfil);
  }
  
}

