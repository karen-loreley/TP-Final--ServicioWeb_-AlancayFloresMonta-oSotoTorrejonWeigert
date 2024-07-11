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
  local: Local = new Local();

  accion: string = "new";

  currentPage: number = 1;

  constructor(private activatedRoute: ActivatedRoute,
    private alquilerService: AlquilerService,
    private localService: LocalService,
    private router: Router) {
    //this.iniciarVariable();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.iniciarVariable();
      }
      else {
        this.accion = "update";
      this.cargarLocal(params['id']);
      }
    });
  }
  cargarLocal(id: string):void {
      
    this.localService.getLocalById(id).subscribe
    (
      (result) => 
      {
        this.local = result;
        this.alquiler.local = this.local ;
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
    }

  cargarAlquiler(id: string): void {
    console.log(this.alquiler);
    this.alquilerService.getAlquilerById(id).subscribe
      (
        (result) => {
          this.alquiler = result;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  agregarAlquiler(): void {
    this.alquilerService.addAlquiler(this.alquiler).subscribe
      (
        (result) => {
          if (result.status == 1) {
            alert("Alquiler guardado");
            this.router.navigate(['local']);
          }

        },
        (error: any) => {
          console.log(error);
        }
      );
    this.alquiler = new Alquiler();
  }

  actualizarAlquiler(): void {
    this.alquilerService.updateAlquiler(this.alquiler).subscribe
      (
        (result) => {
          if (result.status == 1) {
            alert("Alquiler actualizado");
            this.router.navigate(['alquiler']);
          }

        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  iniciarVariable(): void {
    this.alquiler = new Alquiler();
  }


  cancelar() {
    this.router.navigate(['home']);
  }

}
