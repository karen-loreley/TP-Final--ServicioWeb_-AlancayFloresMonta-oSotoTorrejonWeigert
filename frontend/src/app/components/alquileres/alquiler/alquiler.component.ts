import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Local } from '../../../models/local';
import { LocalService } from '../../../services/local.service';
import { Router } from '@angular/router';
import { Alquiler } from '../../../models/alquiler';
import { AlquilerService } from '../../../services/alquiler.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Alquiler } from '../../../models/alquiler';
import { AlquilerService } from '../../../services/alquiler.service';
import { LocalService } from '../../../services/local.service';

@Component({
  selector: 'app-alquiler',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.css'
})
export class AlquilerComponent {

  alquiler!: Alquiler;

  constructor(private route: ActivatedRoute,
              private alquilerService: AlquilerService,
              private localService: LocalService,
              private router: Router) {}

  ngOnInit(): void 
  {
    const localId = this.route.snapshot.paramMap.get('id');
    if (localId) 
      {
      this.alquilerService.getAlquilerByLocalId(localId).subscribe
      (
        (result) => 
        {
          this.alquiler = result;
        },
        (error: any) => 
        {
          console.error(error);
        }
      );
    }
    
  }

  regresar()
  {
    this.router.navigate(['home']);
  }

  agregarAlquiler()
  {
    this.router.navigate(['alquiler-form', 0]);
  }
}
