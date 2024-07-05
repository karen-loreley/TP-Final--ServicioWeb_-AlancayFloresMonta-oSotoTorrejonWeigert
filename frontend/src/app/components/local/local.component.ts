import { Component } from '@angular/core';
import { Local } from '../../../models/local';
import { LocalService } from '../../../services/local.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlquilerService } from '../../../services/alquiler.service';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css'
})
export class LocalComponent {

  listaLocales!: Array<Local>;
  totalPages: number = 1;
  currentPage: number = 1;

  constructor(private localService: LocalService, private alquilerService: AlquilerService, private router: Router)
  {
    this.obtenerLocales(this.currentPage);
  }

  obtenerLocales(page: number) 
  {
    this.localService.getLocales(page, 6).subscribe
    (
      data => 
        {
          this.listaLocales = data.locales;
          this.totalPages = data.totalPages;
          this.currentPage = data.currentPage;
          console.log(this.listaLocales);
        },
        error => 
        {
          console.log(error);
        }
    )
  }

  obtenerAlquilados() 
  {
    this.localService.getLocalesAlquilados().subscribe
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

  obtenerNoAlquilados() 
  {
    this.localService.getLocalesNoAlquilados().subscribe
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
              // Si la página actual tiene solo un elemento, decrementar la página
              if (this.listaLocales.length === 1 && this.currentPage > 1) 
                {
                  this.currentPage--;
                }

              this.obtenerLocales(this.currentPage);
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
        console.error('Local ID is undefined or null');
      }
  }

  cambiarPagina(pagina: number) 
  {
    if (pagina >= 1 && pagina <= this.totalPages) 
    {
      this.obtenerLocales(pagina);
    }
  }

  obtenerInfo(id: string | undefined)
  {
    console.log(id);
    if (id)  
      {
        this.router.navigate(['alquiler', id]);
      }
    else
      {
        console.error('Local ID is undefined or null');
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
        ? '¿Seguro que quiere eliminar el objeto?' 
        : '¿Seguro que quiere modificar el objeto?';
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
        this.eliminarLocal(this.currentId);
      } 
      else if (this.modalAction === 'modify' && this.currentId) 
      {
        this.modificarLocal(this.currentId);
      }
      this.isModalOpen = false;
    }

}