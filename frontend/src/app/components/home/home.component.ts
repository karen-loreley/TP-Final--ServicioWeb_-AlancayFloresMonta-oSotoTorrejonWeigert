import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Local } from '../../models/local';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { LocalComponent } from '../locals/local/local.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,LocalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  locales: Array<Local>;

  constructor(private localService: LocalService, loginService:LoginService, private router:Router){
    this.locales = new Array<Local>();
    this.getLocalesNoAlquilados();
  }


  getLocalesNoAlquilados(){
    this.localService.getLocalesNoAlquilados().subscribe(
      result =>{
        let vlocal: Local = new Local();
        result.forEach((element:any) =>{
          Object.assign(vlocal, element);
          this.locales.push(vlocal);
          vlocal = new Local();
        });
      }
    )
  }

}
