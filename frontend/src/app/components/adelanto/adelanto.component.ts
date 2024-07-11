import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Adelanto } from '../../models/adelanto';
import { PagoService } from '../../services/pago.service';
import { AdelantoService } from '../../services/adelanto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adelanto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adelanto.component.html',
  styleUrl: './adelanto.component.css'
})
export class AdelantoComponent {

  listaAdelanto!: Array<Adelanto>;

  constructor(private pagoService: PagoService,
    private adelantoService: AdelantoService,
    private router: Router) {
    this.obtenerAdelantos();
  }

  obtenerAdelantos() {
    this.adelantoService.getAdelanto().subscribe(
      data => {
        this.listaAdelanto = data;
        console.log(this.listaAdelanto);
      },
      error => {
        console.log(error);
      }

    )

  }
  agregarAdelanto()
  {
    this.router.navigate(['adelanto-form', 0]);
  }
}
