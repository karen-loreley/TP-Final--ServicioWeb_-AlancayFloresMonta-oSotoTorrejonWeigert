import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Local } from '../../models/local';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  locales: Array<Local>;
  constructor(private localService: LocalService, private router:Router){
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
