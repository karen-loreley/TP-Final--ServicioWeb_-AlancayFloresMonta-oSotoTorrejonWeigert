import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Propietario } from '../../../models/propietario';
import { PropietarioService } from '../../../services/propietario.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-propietario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './propietario-form.component.html',
  styleUrl: './propietario-form.component.css'
})
export class PropietarioFormComponent {

  propietario: Propietario  = new Propietario();
  ;//para llamarlo desde el usuario-form
  listaPropietarios!: Array<Propietario>; 
  accion: string = "new";
  usuarioId?: string;

  constructor(private activatedRoute: ActivatedRoute, 
    private propietarioService: PropietarioService,
    private router: Router,
    private http: HttpClient) 
{

}

ngOnInit(): void
  {
    this.activatedRoute.params.subscribe(params => 
      {
        if (params['id']) { //si hay un id
          if (params['id'] === '0') { 
            this.accion = "new";
          } else {
            this.accion = "update";
            this.cargarPropietario(params['id']);
          }
        }
      });
  }

  cargarPropietario(id: string): void 
  {
    console.log(this.propietario);
    this.propietarioService.getPropietarioById(id).subscribe
    (
      (result) => 
      {
        this.propietario = result; 
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
  }
  
  agregarPropietario(): void
  {
    console.log("Datos enviados:", this.propietario);
    this.propietarioService.addPropietario(this.propietario).subscribe
    (
      (result) => 
      {
        if(result.status == 1)
          {
            alert("propietario guardado");
            this.router.navigate(['propietario']);
          }
        
      },
      (error: any) => 
      {
        console.log(error);
      }
    ); 
    this.propietario = new Propietario(); 
  }



  actualizarPropietario(): void {
    if (this.propietario && this.propietario._id) {
      this.propietarioService.updatePropietario(this.propietario._id, this.propietario).subscribe(
        (result) => {
          if (result.status === 1) {
            alert("Propietario actualizado correctamente");
            this.router.navigate(['home']);
          }
        },
        (error: any) => {
          console.error("Error al actualizar el propietario:", error);
          alert("Error al actualizar el propietario.");
        }
      );
    } else {
      console.error("ID del propietario no encontrado para la actualización.");
      alert("ID del propietario no encontrado para la actualización.");
    }
  }
  

  iniciarVariable(): void
  {
    this.propietario = new Propietario(); 
  }

  cancelar()
  {
    this.router.navigate(['propietario']);
  }
}
