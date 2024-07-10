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


import { OnInit } from '@angular/core';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales


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

  totalEnero: number = 0;
  totalFebrero: number = 0;
  totalMarzo: number = 0;
  totalAbril: number = 0;
  totalMayo: number = 0;
  totalJunio: number = 0;
  totalJulio: number = 0;
  totalAgosto: number = 0;
  totalSeptiembre: number = 0;
  totalOctubre: number = 0;
  totalNoviembre: number = 0;
  totalDiciembre: number = 0;




  local1: number = 0;
  local2: number = 0;


  constructor(private pagoService: PagoService,
    private localService: LocalService,
    private router: Router) {
    this.obtenerPagos();
    this.obtenerLocales();
  }

  ngOnInit(): void {
    initMercadoPago('APP_USR-3ce1d8d4-7bb5-436b-aa13-ea7e69546323', {
      locale: "es-AR"
    });
  }
  mercadoPago(t: Pago) {
    const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

    const preference = new Preference(client);

    preference.create({
      body: {
        items: [
          {
            id: t._id, // ID único del artículo
            title: t.local.nombre,
            description: 'Descripción del producto 1',
            unit_price: 1000, // Precio unitario en centavos
            quantity: parseInt(t._id),
            currency_id: 'ARS', // Moneda (por ejemplo, ARS para pesos argentinos)

          }
        ],
      }
    })
      .then(console.log)
      .catch(console.log);


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
            this.totalEnero += pago.local.costomes;
          }
          if (mes == 1) {
            this.febrero++;
            this.totalFebrero += pago.local.costomes;

          }
          if (mes == 2) {
            this.marzo++;
            this.totalMarzo += pago.local.costomes;

          }
          if (mes == 3) {
            this.abril++;
            this.totalAbril += pago.local.costomes;
            

          }
          if (mes == 4) {
            this.mayo++;
            this.totalMayo += pago.local.costomes;

          }
          if (mes == 5) {
            this.junio++;
            this.totalJunio += pago.local.costomes;

          }
          if (mes == 6) {
            this.julio++;
            this.totalJulio += pago.local.costomes;

          }
          if (mes == 7) {
            this.agosto++;
            this.totalAgosto += pago.local.costomes;

          }
          if (mes == 8) {
            this.septiembre++;
            this.totalSeptiembre += pago.local.costomes;

          }
          if (mes == 9) {
            this.octubre++;
            this.totalOctubre += pago.local.costomes;

          }
          if (mes == 10) {
            this.noviembre++;
            this.totalNoviembre += pago.local.costomes;

          }
          if (mes == 11) {
            this.diciembre++;
            this.totalDiciembre += pago.local.costomes;

          }

        });

      },
      error => {
        console.log(error);
      }

    )

  }
  obtenerLocales() {
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
          data: [this.totalEnero, this.totalFebrero, this.totalMarzo, this.totalAbril, this.totalMayo, this.totalJunio, this.totalJulio, this.totalAgosto, this.totalSeptiembre, this.totalOctubre, this.totalNoviembre, this.totalDiciembre],
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
            max: 1000, // Cambia el valor máximo a un número más grande
            ticks: {
              stepSize: 100 // Ajusta el tamaño del paso entre las marcas de graduación
            }

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
