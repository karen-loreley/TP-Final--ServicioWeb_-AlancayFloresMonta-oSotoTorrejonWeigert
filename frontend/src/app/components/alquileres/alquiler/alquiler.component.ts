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

}
