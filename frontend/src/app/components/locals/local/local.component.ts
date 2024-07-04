import { Component } from '@angular/core';
import { Local } from '../../../models/local';
import { LocalService } from '../../../services/local.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css'
})
export class LocalComponent {

  listaLocales!: Array<Local>;

  constructor(private localService: LocalService, private router: Router)
  {
    this.obtenerLocales();
  }

  obtenerLocales() 
  {
    this.localService.getLocales().subscribe
    (
      data => 
        {
          this.listaLocales = data;
          console.log(this.listaLocales);
        },
        error => 
        {
          console.log(error);
        }
    )
  }

  eliminarLocal(_id: string)
  {
    this.localService.deleteLocal(_id).subscribe
    (
      data => 
        {
          if (data.status == 1)
            {
              alert("Local eliminado")
              this.obtenerLocales();
            }
        },
        error => 
        {
          console.log(error);
        }
    )
  }

  agregarLocal()
  {
    this.router.navigate(['local-form', 0]);
  }

  modificarLocal(id: string | undefined)
  {
    console.log(id);
    if (id)
      {
        this.router.navigate(['local-form', id]);
      }
      else
      {
        console.error('Ticket ID is undefined or null');
      }
  }
}
