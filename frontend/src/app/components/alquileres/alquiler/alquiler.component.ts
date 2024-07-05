import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Local } from '../../../models/local';
import { LocalService } from '../../../services/local.service';
import { Router } from '@angular/router';
import { Alquiler } from '../../../models/alquiler';
import { AlquilerService } from '../../../services/alquiler.service';

@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.css'
})
export class AlquilerComponent {
  alquileres: Alquiler[] = [];

  constructor(private alquilerService: AlquilerService) {}

  ngOnInit(): void {
    this.loadAlquileres();
  }

  loadAlquileres(): void {
    this.alquilerService.getAlquileres().subscribe(data => {
      this.alquileres = data;
    });
  }

  isAlquilerVencido(alquiler: Alquiler): boolean {
    const now = new Date();
    const alquilerFecha = new Date(alquiler.fechaAlquiler);
    alquilerFecha.setMonth(alquilerFecha.getMonth() + alquiler.plazomes);
    return now > alquilerFecha;
  }

  pagarAlquiler(alquiler: Alquiler): void {
    // Aquí puedes añadir la lógica para manejar el pago del alquiler
    console.log(`Pagando alquiler de ${alquiler.propietario}`);
  }
}
