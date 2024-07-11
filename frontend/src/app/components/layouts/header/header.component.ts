import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  usuario: any;

  constructor(private router: Router,public loginService:LoginService) {}

  ngOnInit(): void {
    this.usuario = this.loginService.userLogged();
    console.log('Usuario en el componente:', this.usuario); // Verifica el valor
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  public isAdmin(): boolean {
    const perfil = sessionStorage.getItem("perfil");
    return perfil === 'Administrativo'; // Asegúrate de que el perfil se almacene correctamente
  }
  
  public isPropi(): boolean {
    const perfil = sessionStorage.getItem("perfil");
    return perfil === 'Propietario'; // Asegúrate de que el perfil se almacene correctamente
  }
  
  public isDuenio(): boolean {
    const perfil = sessionStorage.getItem("perfil");
    return perfil === 'Dueño'; // Asegúrate de que el perfil se almacene correctamente
  }
  
  agregarAlquiler()
  {
    this.router.navigate(['alquiler-form', 0]);
  }

  agregarNovedad()
  {
    this.router.navigate(['novedad-form', 0]);
  }


}
