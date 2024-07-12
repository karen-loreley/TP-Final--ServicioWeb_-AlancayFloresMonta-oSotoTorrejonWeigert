import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Promocion } from '../../../models/promocion';
import { Local } from '../../../models/local';
import { ActivatedRoute } from '@angular/router';
import { PromocionService } from '../../../services/promocion.service';
import { LocalService } from '../../../services/local.service';
import { FacebookModule, FacebookService, InitParams} from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';


@Component({
  selector: 'app-crud-promocino',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crud-promocino.component.html',
  styleUrl: './crud-promocino.component.css'
})
export class CrudPromocinoComponent implements OnInit{

  mensaje: string = "";
  promocion:Promocion = new Promocion();
  promociones!: Array<Promocion>;
  accion:string="new";
  form: boolean=true;
  locales: Local[] = [];
  promocionId: string | null = null;

  currentPage: number = 1;

  constructor(private activateRouter: ActivatedRoute,
              private promocionservice:PromocionService,
              private localService: LocalService,
              private fb: FacebookService,

  ){
   this.obtenerPromocion();
    this.iniciarvariable();
    this.obtenerLocales(this.currentPage); 
    this.iniciarFb();
  }

  ngOnInit():void{
    this.activateRouter.params.subscribe(
      params =>{
        this.promocionId = params['id'];
        if(this.promocionId){ 
          this.cargarpromocion(this.promocionId);
          this.accion="update";
        }else{
          this.accion = "new";
          this.obtenerPromocion();
        }
        });
  }
  
  iniciarvariable():void{
    this.promocion= new Promocion();
  }

  registrar():void{
    console.log('Datos enviados para registrar:', this.promocion); 
    this.promocionservice.add(this.promocion).subscribe(
      (result)=>{
        if(result.status == 1){
          alert("promocion guardado correctamente")
          this.form=true;
         this.obtenerPromocion();
        }
      },
      (error:any)=>{
        console.log('error al registrar romocion:', error);
      }
    );
    this.promocion = new Promocion();
  }
  
  cargarpromocion(_id:string):void{
   this.promocionservice.getPromocionById(_id).subscribe(
    (result)=>{
      this.promocion=result;
    },
    (error:any)=>{
      console.log(error);
    }
   );
  }
  
  actualizar():void{
    console.log('Datos enviados para actualizar:', this.promocion); 
    if (this.promocion) {
    this.promocionservice.update(this.promocion).subscribe(
      (result)=>{
        if(result.status == 1){
          alert("promocion actualizado correctamente")
        this.form=true;
        this.obtenerPromocion();
        }
      },
      (error:any)=>{
        console.log(error);
      }
     );} else{
     this.promocion=new Promocion();
     console.log("No hay ticket para actualizar");
    }
  }
  obtenerPromocion(): void {
    this.promocionservice.getPromocion().subscribe(
      data => {
        this.promociones = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerLocales(page: number): void {
    this.localService.getLocales(page, 6).subscribe(
      data => {
        this.locales = data.locales;
      },
      error => {
        console.log(error);
      }
    );
  }

  agregar(): void{
    this.form=false;
    this.iniciarvariable();
    this.accion="new";
   // this.router.navigate(['punto1form',0]);
  }

  modificar(_id:string): void{
    this.form=false;
    this.cargarpromocion(_id);
    this.accion="update";
    //this.router.navigate(['punto1form', _id]);
  }

  eliminar(id : string){
    this.promocionservice.deletePromocion(id).subscribe(
      result=>{
        if(result.status == 1){
          alert("productos eliminado correctamente")
          this.obtenerPromocion();
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
  postFb(descripcion: string){
    if(descripcion.trim()){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/308626842344467/feed', apiMethod,
      {
      "message": descripcion, //el token debe actualizarse cada media hora
      "access_token":"EAAXGSugihHIBO0ZBjgYRCqZCb8TpUXKArl5rMc94LpAFj44aJx51XmeLaca1ObXhhtbzcaiMvb01ZCzLH2Hk4rQnGdMPtZBC9O2rBIq5NOxyFihfdUCKmjVG0FVdY3xgWeP0sBnCkvWC5DZBhPtwYk9tBqLBwSCJrzX5Ngqw448fZAwz3sODpmzqXolsFVEljdvMsywFIVT06K42J8tdWNyrLrTAZDZD"

    }
    ).then((response: any) => {
      alert('Publicación exitosa en facebook');
      console.log('Publicación exitosa:', response);
    }).catch((error: any) => {
      console.error('Error al publicar en Facebook:', error);
    }); } else {
      console.error('La descripción está vacía.');
 }
  }

 iniciarFb(){
 let initParams: InitParams = {
 appId: '1625399908009074',
 autoLogAppEvents : true,
 xfbml : true,
 version : 'v20.0'
 };
 this.fb.init(initParams);
 }
}