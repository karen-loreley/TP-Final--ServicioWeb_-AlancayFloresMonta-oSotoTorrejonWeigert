import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-usuarios.component.html',
  styleUrl: './crud-usuarios.component.css'
})
export class CrudUsuariosComponent {

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
        }
        )
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
