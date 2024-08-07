import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Propietario } from '../../../models/propietario';
import { ActivatedRoute, Router } from '@angular/router';
import { PropietarioService } from '../../../services/propietario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-propietario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './propietario-form.component.html',
  styleUrl: './propietario-form.component.css'
})
export class PropietarioFormComponent {

  propietario: Propietario = new Propietario();
  listaPropietarios!: Array<Propietario>; 
  accion: string = "new";

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
        if (params['id'] == "0")
          {
            this.accion = "new"; 
            this.iniciarVariable();
          }
        else
        {
          this.accion = "update"; 
          this.cargarPropietario(params['id']);
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

  actualizarPropietario():void
  {
    console.log(this.propietario);
    this.propietarioService.updatePropietario(this.propietario).subscribe
    (
      (result) => 
      {
        if(result.status == 1)
          {
            alert("Local actualizado");
            this.router.navigate(['home']);
          }
        
      },
      (error: any) => 
      {
        console.log(error);
      }
    ); 
  }

  iniciarVariable(): void
  {
    this.propietario = new Propietario(); 
  }

  cancelar()
  {
    this.router.navigate(['home']);
  }
}