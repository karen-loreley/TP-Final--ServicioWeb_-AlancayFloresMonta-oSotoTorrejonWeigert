import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Novedades } from '../../../models/novedades';
import { Alquiler } from '../../../models/alquiler';
import { AlquilerService } from '../../../services/alquiler.service';
import { NovedadesService } from '../../../services/novedades.service';
import { LocalService } from '../../../services/local.service';
import { PropietarioService } from '../../../services/propietario.service';
import { Propietario } from '../../../models/propietario';
import { Local } from '../../../models/local';

@Component({
  selector: 'app-novedad-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './novedad-form.component.html',
  styleUrl: './novedad-form.component.css'
})
export class NovedadFormComponent {

  novedad: Novedades = new Novedades();
  listaAlquileres: Alquiler[] = [];
  listaLocales: Local[] = [];
  listaPropietarios: Propietario[] = [];

  accion: string = "new";

  currentPage: number = 1;

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private novedadService: NovedadesService,
    private alquilerService: AlquilerService,
    private localService: LocalService,
    private propietarioService: PropietarioService,
    private router: Router
  )
  {
    //this.iniciarVariable();
    this.cargarAlquileres();
    this.cargarLocales(this.currentPage);
    this.cargarPropietarios();
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
          this.cargarNovedad(params['id']);
        }
      });
  }

  cargarNovedad(id: string): void 
  {
    console.log(this.novedad);
    this.novedadService.getNovedadById(id).subscribe
    (
      (result) => 
      {
        this.novedad = result; 
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
  }

  agregarNovedad(): void
  {
    console.log("Datos enviados:", this.novedad);
    this.novedadService.addNovedad(this.novedad).subscribe
    (
      (result) => 
      {
        if(result.status == 1)
          {
            alert("Novedad guardada");
            this.router.navigate(['novedad']);
          }
      },
      (error: any) => 
      {
        console.log(error);
      }
    ); 
    this.novedad = new Novedades(); 
  }

  actualizarNovedad():void
  {
    this.novedadService.updateNovedad(this.novedad).subscribe
    (
      (result) => 
      {
        if(result.status === 1)
          {
            alert("Novedad actualizada");
            this.router.navigate(['novedad']);
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
    this.novedad = new Novedades(); 
  }

  cargarAlquileres(): void
  {
    this.alquilerService.getAlquileres().subscribe
    (
      (result) => 
      {
        console.log('Alquileres:', result);
        this.listaAlquileres = result;
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
  }

  cargarLocales(page: number): void 
  {
    this.localService.getLocales(page, 6).subscribe
    (
      (result) => 
      {
        console.log('Locales:', result);
        this.listaLocales = result.locales;
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
  }

  cargarPropietarios(): void
  {
    this.propietarioService.getPropietarios().subscribe
    (
      (result) => 
      {
        console.log('Propietarios:', result);
        this.listaPropietarios = result;
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
  }

  cancelar()
  {
    this.router.navigate(['novedad']);
  }

}
