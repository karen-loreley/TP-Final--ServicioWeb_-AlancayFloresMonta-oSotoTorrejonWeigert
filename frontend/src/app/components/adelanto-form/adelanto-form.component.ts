import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Adelanto } from '../../models/adelanto';
import { AdelantoService } from '../../services/adelanto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adelanto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adelanto-form.component.html',
  styleUrl: './adelanto-form.component.css'
})
export class AdelantoFormComponent {

  adelanto: Adelanto = new Adelanto();

  adelantos!: Array<Adelanto>;
  accion: string = "new"; //accion tendra los valores de new y update


  constructor(private adelantoService: AdelantoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.adelantos = new Array<Adelanto>();
    this.iniciarVariable();

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.iniciarVariable();
      } else {
        this.accion = "update";
        this.iniciarVariable();

      }
    });
  }

  

  iniciarVariable() {
    this.adelanto = new Adelanto();
    /*  this.localService.getLocalesByPago().subscribe(
        data => {
          this.listaLocales = data;
          console.log(this.listaLocales);


        },
        error => {
          console.log(error);
        }
  
      )*/

  }

  registrarAdelanto(): void {
    this.adelantoService.addAdelanto(this.adelanto).subscribe(
      respond => {
        if (respond.status == 1) {
          alert("El Adelanto se agrego correctamente");
        }
      },
      error => {
        alert("Error al registrar");
        console.log(error);
      }
    );
    this.adelanto = new Adelanto();
  }

}
