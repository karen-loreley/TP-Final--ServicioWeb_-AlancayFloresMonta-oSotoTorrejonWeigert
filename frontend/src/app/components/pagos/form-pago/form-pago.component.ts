import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../../../services/local.service';
import { Local } from '../../../models/local';

@Component({
  selector: 'app-form-pago',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form-pago.component.html',
  styleUrl: './form-pago.component.css'
})
export class FormPagoComponent {
  pago: Pago = new Pago();
  local: Local = new Local();

  pagos!: Array<Pago>;
  accion: string = "new"; //accion tendra los valores de new y update

  listaLocales!: Array<Local>;
  currentPage: number = 1;
  
  constructor(private pagoService: PagoService, private localService: LocalService,private router: Router, private activatedRoute: ActivatedRoute){
    this.pagos = new Array<Pago>();
    this.iniciarVariable();
    this.cargarLocales(this.currentPage);

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0"){
      this.accion = "new";
      this.iniciarVariable();
      }else{
      this.accion = "update";
      this.cargarLocal(params['id']);
  //  this.cargarPago(params['id']);
  this.iniciarVariable();
        
      }
      });
    }

    cargarLocal(id: string):void {
      
    this.localService.getLocalById(id).subscribe
    (
      (result) => 
      {
        this.local = result;
        this.pago.local = this.local ;
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
    }

    iniciarVariable(){
      this.pago = new Pago();
      /*  this.localService.getLocalesByPago().subscribe(
          data => {
            this.listaLocales = data;
            console.log(this.listaLocales);


          },
          error => {
            console.log(error);
          }
    
        )*/
    
    }

    registrarPago():void{
      this.pagoService.addPago(this.pago).subscribe(
        respond => {
          if(respond.status == 1){
            alert("El pago se agrego correctamente");
            this.router.navigate(['pago']);
          }
        },
        error => {
          alert("Error al registrar");
          console.log(error);
        }
      );
      this.pago = new Pago(); 
    }

/*
    cargarPago(id: string){
      this.pagoService.getPago(id).subscribe(
        respond => {
         Object.assign(this.pago, respond);
        }
      )
    }
*/
    atras():void{
      this.router.navigate(['pago']);
    }
/*
    modificarPago(){
      this.pagoService.putPago(this.pago).subscribe(
        respond => {
          if(respond.status == 1){
            alert("El Pago se actualizo correctamente");
            this.router.navigate(['pago']);
          }
        },
        error => {
          console.log(error);
          alert("El pago no se actualizo correctamente");
        }
      )
    }

*/
cargarLocales(page: number): void 
  {
    
    this.localService.getLocales(page, 6).subscribe
    (
      (result) => 
      {
        console.log('Locales:', result);
        this.listaLocales = result.locales;
      },
      (error: any) => 
      {
        console.log(error);
      }
    );
  }
}
