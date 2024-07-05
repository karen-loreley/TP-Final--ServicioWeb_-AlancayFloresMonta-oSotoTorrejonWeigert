import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagoService } from '../../../services/pago.service';
import { Router } from '@angular/router';
import { Pago } from '../../../models/pago';
import { Chart, registerables } from 'chart.js';
import { LocalService } from '../../../services/local.service';
import { Local } from '../../../models/local';
Chart.register(...registerables);




@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {

  listaPagos!: Array<Pago>;
  listaLocal!: Array<Local>;


  enero: number = 0;
  febrero: number = 0;
  marzo: number = 0;
  abril: number = 0;
  mayo: number = 0;
  junio: number = 0;
  julio: number = 0;
  agosto: number = 0;
  septiembre: number = 0;
  octubre: number = 0;
  noviembre: number = 0;
  diciembre: number = 0;

  local1: number = 0;
  local2: number = 0;


  constructor(private pagoService: PagoService,
    private localService: LocalService,
    private router: Router) {
    this.obtenerPagos();
    this.obtenerLocales();
  }

  obtenerPagos() {
    this.pagoService.getPagos().subscribe(
      data => {
        this.listaPagos = data;
        console.log(this.listaPagos);

        const meses = this.listaPagos.map(pago => new Date(pago.mes).getMonth());

        console.log(meses);

        this.listaPagos.forEach(pago => {
          const mes = new Date(pago.mes).getMonth();
          if (mes == 0) {
            this.enero++;
          }
          if (mes == 1) {
            this.febrero++;
          }
          if (mes == 2) {
            this.marzo++;
          }
          if (mes == 3) {
            this.abril++;
          }
          if (mes == 4) {
            this.mayo++;
          }
          if (mes == 5) {
            this.junio++;
          }
          if (mes == 6) {
            this.julio++;
          }
          if (mes == 7) {
            this.agosto++;
          }
          if (mes == 8) {
            this.septiembre++;
          }
          if (mes == 9) {
            this.octubre++;
          }
          if (mes == 10) {
            this.noviembre++;
          }
          if (mes == 11) {
            this.diciembre++;
          }

        });
        
      },
      error => {
        console.log(error);
      }

    )

  }
  obtenerLocales(){
    this.pagoService.getPagos().subscribe(
      data => {
        this.listaPagos = data;
        console.log(this.listaPagos);


        this.listaPagos.forEach(pago => {
          const nombre = pago.local.nombre.toString();
          if (nombre === "Local 1") {
            this.local1++;
          }
          if (nombre === "Local 2") {
            this.local2++;
          }
        });
        
      },
      error => {
        console.log(error);
      }

    )
  }
  dibujarGrafico() {
    const meses = this.listaPagos.map((pago) => { pago.mes });



    const ctx = document.getElementById('graficoPagosMensuales') as HTMLCanvasElement;
    if (!ctx) {
      console.error('No se encontró el elemento canvas con id "graficoPagosMensuales"');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        datasets: [{
          label: 'Pagos realizados',
          data: [this.enero, this.febrero, this.marzo, this.abril, this.mayo, this.junio, this.julio, this.agosto, this.septiembre, this.octubre, this.noviembre, this.diciembre],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',    // Color para la primera barra
            'rgba(255, 99, 132, 0.2)',    // Color para la segunda barra
            'rgba(255, 206, 86, 0.2)',    // Color para la tercera barra
            'rgba(54, 162, 235, 0.2)',    // Color para la cuarta barra
            'rgba(153, 102, 255, 0.2)',   // Color para la quinta barra
            'rgba(255, 159, 64, 0.2)',    // Color para la sexta barra
            'rgba(201, 203, 207, 0.2)',   // Color para la séptima barra
            'rgba(255, 205, 86, 0.2)',    // Color para la octava barra
            'rgba(75, 192, 192, 0.2)',    // Color para la novena barra
            'rgba(54, 162, 235, 0.2)',    // Color para la décima barra
            'rgba(153, 102, 255, 0.2)',   // Color para la undécima barra
            'rgba(255, 159, 64, 0.2)',    // Color para la duodécima barra
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 7 // Establece el valor máximo

          }
        }
      }
    });
  }
  filtrarLocal() {


    const ctx = document.getElementById('local') as HTMLCanvasElement;
    if (!ctx) {
      console.error('No se encontró el elemento canvas con id "graficoPagosMensuales"');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['local 1', 'local2'],
        datasets: [{
          label: 'Pagos realizados por Local',
          data: [this.local1, this.local2],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',    // Color para la primera barra
            'rgba(255, 99, 132, 0.2)',    // Color para la segunda barra
            'rgba(255, 206, 86, 0.2)',    // Color para la tercera barra
            'rgba(54, 162, 235, 0.2)',    // Color para la cuarta barra
            'rgba(153, 102, 255, 0.2)',   // Color para la quinta barra
            'rgba(255, 159, 64, 0.2)',    // Color para la sexta barra
            'rgba(201, 203, 207, 0.2)',   // Color para la séptima barra
            'rgba(255, 205, 86, 0.2)',    // Color para la octava barra
            'rgba(75, 192, 192, 0.2)',    // Color para la novena barra
            'rgba(54, 162, 235, 0.2)',    // Color para la décima barra
            'rgba(153, 102, 255, 0.2)',   // Color para la undécima barra
            'rgba(255, 159, 64, 0.2)',    // Color para la duodécima barra
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 7 // Establece el valor máximo

          }
        }
      }
    });
  }









  eliminarPago(_id: string) {
    /* this.pagoService.(_id).subscribe(
       data => {
         if (data.status == 1) {
           alert("Ticket eliminado")
           this.obtenerTickets();
         }
       },
       error => {
         console.log(error);
       }
     )*/
  }

  agregarTicket() {
    this.router.navigate(['pago-form', 0]);
  }
  /*
    modificarTicket(id: string | undefined) {
      console.log(id);
      if (id) {
        this.router.navigate(['ticket-form', id]);
      }
      else {
        console.error('Ticket ID is undefined or null');
      }
    }
      */
}
