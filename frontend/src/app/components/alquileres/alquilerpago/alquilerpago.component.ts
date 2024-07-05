import { Component } from '@angular/core';
import { Alquiler } from '../../../models/alquiler';
import { AlquilerService } from '../../../services/alquiler.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alquilerpago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alquilerpago.component.html',
  styleUrl: './alquilerpago.component.css'
})
export class AlquilerpagoComponent {
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
