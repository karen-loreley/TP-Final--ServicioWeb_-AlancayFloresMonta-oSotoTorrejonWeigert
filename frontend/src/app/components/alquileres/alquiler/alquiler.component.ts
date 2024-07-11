import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlquilerService } from '../../../services/alquiler.service';
import { Alquiler } from '../../../models/alquiler';
import { NovedadComponent } from '../../novedades/novedad/novedad.component';
import { NovedadesService } from '../../../services/novedades.service';
import { Novedades } from '../../../models/novedades';
import { Local } from '../../../models/local';
import { LocalService } from '../../../services/local.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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

  listaAlquileres!: Array<Alquiler>;
  listaLocal!: Array<Local>;

  totalPorMes: number[] = new Array(12).fill(0);
  nombresLocales: string[] = [];

  conteoPagosPorLocal: { [nombre: string]: number } = {};

  currentPage: number = 1;



  constructor(private route: ActivatedRoute,
    private localService: LocalService,
    private alquilerService: AlquilerService,
    private router: Router) {

    this.obtenerLocales(this.currentPage);

    this.obtenerAlquileres();
  }

  ngOnInit(): void {

  }

  obtenerAlquileres() {

    this.alquilerService.getAlquileres().subscribe(
      data => {
        this.listaAlquileres = data;
        console.log(this.listaAlquileres);

        this.listaAlquileres.forEach(pago => {
          const mes = new Date(pago.fechaAlquiler).getMonth();
          this.totalPorMes[mes] += pago.local.costomes;
        });
        
        // Inicializar conteo para cada local
        this.listaLocal.forEach(local => {
          this.conteoPagosPorLocal[local.nombre] = 0;
        });

        // Contar los pagos por local
        this.listaAlquileres.forEach(pago => {
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

  regresar() {
    this.router.navigate(['home']);
  }

  agregarAlquiler() {
    this.router.navigate(['alquiler-form', 0]);
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
}
