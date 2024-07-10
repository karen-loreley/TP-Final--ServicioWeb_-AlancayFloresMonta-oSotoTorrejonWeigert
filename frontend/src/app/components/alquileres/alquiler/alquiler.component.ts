import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlquilerService } from '../../../services/alquiler.service';
import { Alquiler } from '../../../models/alquiler';
import { NovedadComponent } from '../../novedades/novedad/novedad.component';
import { NovedadesService } from '../../../services/novedades.service';
import { Novedades } from '../../../models/novedades';

@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NovedadComponent],
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.css'
})
export class AlquilerComponent {

  alquiler: Alquiler = new Alquiler();
  novedad: Novedades = new Novedades();

  constructor(private route: ActivatedRoute,
              private alquilerService: AlquilerService,
              private novedadService: NovedadesService,
              private router: Router) {}

  ngOnInit(): void {
    const localId = this.route.snapshot.paramMap.get('id');
    if (localId) 
      {
      this.alquilerService.getAlquilerByLocalId(localId).subscribe
      (
        (result:Alquiler) => 
        {
          this.alquiler = result;
          
          if (this.alquiler && this.alquiler._id) 
          {
            this.verNovedades(this.alquiler._id);
          }
          
        },
        (error: any) => 
        {
          console.error(error);
        }
      );
    }
  }

  verNovedades(alquilerId: string)
  {
      this.novedadService.getNovedadByAlquilerId(alquilerId).subscribe
      (
        (result) => 
        {
          this.novedad = result;
        },
        (error: any) => 
        {
          console.error(error);
        }
      );
  }

  editarNovedad(id: string | undefined)
  {
    console.log(id);
    if (id)
      {
        this.router.navigate(['novedad-form', id]);
      }
      else
      {
        console.error('Local ID is undefined or null');
      }
  }

  regresar()
  {
    this.router.navigate(['home']);
  }

  agregarAlquiler()
  {
    this.router.navigate(['alquiler-form', 0]);
  }
}
