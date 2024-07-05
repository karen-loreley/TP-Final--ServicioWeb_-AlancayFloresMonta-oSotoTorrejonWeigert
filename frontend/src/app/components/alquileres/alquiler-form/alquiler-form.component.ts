import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Alquiler } from '../../../models/alquiler';
import { Local } from '../../../models/local';
import { AlquilerService } from '../../../services/alquiler.service';
import { LocalService } from '../../../services/local.service';
import { Propietario } from '../../../models/propietario';
import { PropietarioService } from '../../../services/propietario.service';

@Component({
  selector: 'app-alquiler-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './alquiler-form.component.html',
  styleUrl: './alquiler-form.component.css'
})
export class AlquilerFormComponent {

  alquiler: Alquiler = new Alquiler();
  listaLocales: Local[] = [];
  listaPropietarios: Propietario[] = [];
  accion: string = "new";

  currentPage: number = 1;

  constructor(private activatedRoute: ActivatedRoute,
    private alquilerService: AlquilerService,
    private localService: LocalService,
    private propietarioService: PropietarioService,
    private router: Router)
  {
    //this.iniciarVariable();
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
          this.cargarAlquiler(params['id']);
        }
      });
  }

  cargarAlquiler(id: string): void 
  {
    console.log(this.alquiler);
    this.alquilerService.getAlquilerById(id).subscribe
    (
      (result) => 
      {
        this.alquiler = result; 
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
  }

  agregarAlquiler(): void
  {
    this.alquilerService.addAlquiler(this.alquiler).subscribe
    (
      (result) => 
      {
        if(result.status == 1)
          {
            alert("Alquiler guardado");
            this.router.navigate(['local']);
          }
        
      },
      (error: any) => 
      {
        console.log(error);
      }
    ); 
    this.alquiler = new Alquiler(); 
  }

  actualizarAlquiler():void
  {
    this.alquilerService.updateAlquiler(this.alquiler).subscribe
    (
      (result) => 
      {
        if(result.status == 1)
          {
            alert("Alquiler actualizado");
            this.router.navigate(['alquiler']);
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
    this.alquiler = new Alquiler(); 
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

}
