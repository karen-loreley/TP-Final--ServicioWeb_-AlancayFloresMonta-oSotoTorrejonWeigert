import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Novedades } from '../../../models/novedades';
import { NovedadesService } from '../../../services/novedades.service';

@Component({
  selector: 'app-novedad',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './novedad.component.html',
  styleUrl: './novedad.component.css'
})
export class NovedadComponent {

  listaNovedades!: Array<Novedades>;
  estado!: string;

  constructor(private novedadesService: NovedadesService, private router: Router)
  {
    this.obtenerNovedades();
  }

  obtenerNovedades() 
  {
    this.novedadesService.getNovedades().subscribe
    (
      data => 
        {
          this.listaNovedades = data;
          console.log(this.listaNovedades);
        },
        error => 
        {
          console.log(error);
        }
    )
  }

  obtenerNovedadesByEstado()
  {
    if(this.estado === "todos")
    {
      this.obtenerNovedades();
    }

    else
    {
      this.novedadesService.getNovedadesByEstado(this.estado).subscribe
      (
        data => 
          {
            this.listaNovedades = data;
            console.log(this.listaNovedades);
          },
          error => 
          {
            console.log(error);
          }
      )
    }

  }

  eliminarNovedad(_id: string)
  {
    this.novedadesService.deleteNovedad(_id).subscribe
    (
      data => 
        {
          if (data.status == 1)
            {
              alert("Local eliminado")
              this.obtenerNovedades();
            }
        },
        error => 
        {
          console.log(error);
        }
    )
  }

  agregarNovedad()
  {
    this.router.navigate(['novedad-form', 0]);
  }

  modificarNovedad(id: string | undefined)
  {
    console.log(id);
    if (id)
      {
        this.router.navigate(['novedad-form', id]);
      }
      else
      {
        console.error('Novedad ID is undefined or null');
      }
  }


  //Ventana emergente para modificar/borrar
  isModalOpen = false;
  modalMessage = '';
  modalAction: 'delete' | 'modify' = 'delete';
  currentId: string | null = null;

  openConfirmModal(action: 'delete' | 'modify', id: string): void 
  {
    this.isModalOpen = true;
    this.modalAction = action;
    this.currentId = id;
    this.modalMessage = action === 'delete' 
      ? '¿Seguro que quiere eliminar la novedad?' 
      : '¿Seguro que quiere modificar la novedad?';
  }

  closeModal(event?: MouseEvent): void 
  {
    if (event && event.target === event.currentTarget) 
    {
      this.isModalOpen = false;
    } 
    else if (!event) 
    {
      this.isModalOpen = false;
    }
  }

  confirmAction(): void 
  {
    if (this.modalAction === 'delete' && this.currentId) 
    {
      this.eliminarNovedad(this.currentId);
    } 
    else if (this.modalAction === 'modify' && this.currentId) 
    {
      this.modificarNovedad(this.currentId);
    }
    this.isModalOpen = false;
  }
}
