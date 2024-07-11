import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  graficoPagosMensualesVisible: boolean = false;
  localVisible: boolean = false;


  totalPorMes: number[] = new Array(12).fill(0);
  nombresLocales: string[] = [];

  conteoPagosPorLocal: { [nombre: string]: number } = {};

  currentPage: number = 1;

  constructor(private pagoService: PagoService,
    private localService: LocalService,
    private router: Router) {
    this.obtenerLocales(this.currentPage);

    this.obtenerPagos();
  }
  preferenceId: string="";
  mercadoPago(t: Pago) {
    this.pagoService.cargarAlquilerEnPreferencia(t.local.costomes,t.local.nombre).subscribe(resp=>{
      this.preferenceId = resp.id.init_point;
      console.log(this.preferenceId);
      window.location.href = this.preferenceId;
    })
  }
  obtenerPagos() {

    this.pagoService.getPagos().subscribe(
      data => {
        this.listaPagos = data;
        console.log(this.listaPagos);

        this.listaPagos.forEach(pago => {
          const mes = new Date(pago.mes).getMonth();
          this.totalPorMes[mes] += pago.local.costomes;
        });

        // Inicializar conteo para cada local
        this.listaLocal.forEach(local => {
          this.conteoPagosPorLocal[local.nombre] = 0;
        });

        // Contar los pagos por local
        this.listaPagos.forEach(pago => {
          const nombreLocal = pago.local.nombre;
          if (this.conteoPagosPorLocal.hasOwnProperty(nombreLocal)) {
            this.conteoPagosPorLocal[nombreLocal] += pago.local.costomes;
          }
        });

        console.log('Conteo de pagos por local:', this.conteoPagosPorLocal);

      },
      error => {
        console.log(error);
      }

    )

  }
  obtenerLocales(page: number) {
    this.localService.getLocales(page, 6).subscribe(
      data => {
        this.listaLocal = data.locales;


        this.listaLocal.forEach(local => {
          this.nombresLocales.push(local.nombre);
        });

        console.log(this.nombresLocales);

      },
      error => {
        console.log(error);
      }

    )
  }


  dibujarGrafico() {


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
          data: this.totalPorMes,
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
        labels: this.nombresLocales,
        datasets: [{
          label: 'Total recaudado por Local',
          data: this.conteoPagosPorLocal,
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
