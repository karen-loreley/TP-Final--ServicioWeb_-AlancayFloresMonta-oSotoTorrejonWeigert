import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Propietario } from '../../../models/propietario';
import { PropietarioService } from '../../../services/propietario.service';

@Component({
  selector: 'app-propietario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.css'
})
export class PropietarioComponent {

  listaPropietarios!: Array<Propietario>;

  constructor(private propietarioService: PropietarioService, private router: Router)
  {
    this.obtenerPropietarios();
  }

  obtenerPropietarios() 
  {
    this.propietarioService.getPropietarios().subscribe
    (
      data => 
        {
          this.listaPropietarios = data;
          console.log(this.listaPropietarios);
        },
        error => 
        {
          console.log(error);
        }
    )
  }

  eliminarPropietario(_id: string)
  {
    this.propietarioService.deletePropietario(_id).subscribe
    (
      data => 
        {
          if (data.status == 1)
            {
              alert("Propietario eliminado")
              this.obtenerPropietarios();
            }
        },
        error => 
        {
          console.log(error);
        }
    )
  }

  agregarPropietario()
  {
    this.router.navigate(['propietario-form', 0]);
  }

  modificarPropietario(id: string | undefined)
  {
    console.log(id);
    if (id)
      {
        this.router.navigate(['propietario-form', id]);
      }
      else
      {
        console.error('Propietario ID is undefined or null');
      }
  }
}
