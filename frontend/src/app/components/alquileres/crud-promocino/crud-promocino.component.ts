import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Promocion } from '../../../models/promocion';
import { Local } from '../../../models/local';
import { ActivatedRoute } from '@angular/router';
import { PromocionService } from '../../../services/promocion.service';
import { LocalService } from '../../../services/local.service';
import { FacebookModule, FacebookService, InitParams } from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';


@Component({
  selector: 'app-crud-promocino',
  standalone: true,
  imports: [FormsModule, CommonModule, FacebookModule.forRoot()],
  templateUrl: './crud-promocino.component.html',
  styleUrl: './crud-promocino.component.css'
})
export class CrudPromocinoComponent implements OnInit{

  promocion!:Promocion;
  promociones!: Array<Promocion>;
  accion:string="new";
  form: boolean=true;
  locales!: Array<Local>;
  promocionId: string | null = null;
  mensaje: string='';

  constructor(private activateRouter: ActivatedRoute,
              private promocionservice:PromocionService,
              private localService: LocalService,
              private fb: FacebookService
  ){
   this.obtenerPromocion();
    this.iniciarvariable();
    this.obtenerLocales(); 
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
  
  obtenerPromocion(){
    this.promocionservice.getPromocion().subscribe(
      data=>{
        this.promociones= data;
      },
      error=>{
        console.log(error);
      }
    )
  }

  obtenerLocales(): void {
    this.localService.getLocales().subscribe(
      data => {
        this.locales = data;
      },
      error => {
        console.log(error);
      }
    )
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

  postFb(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/363849570145163/feed', apiMethod,
      {
      "message": this.mensaje,
      "access_token":"EAALOPZAFU72ABO5WD1qLgv1YAZA0kneCsqWZAbnLuLtCq2d0lPGJR1RNpChfxHa8TJSKy2KGuAERqsaE6ZAznlNtJVZASJOSfCzLc4ZB5VkEZB8hqAKaWIrXCXhRe2iVstTk1JKUKkMK0Xod45TYrwpNy0cw2el3bZCFu4Wz5svha6kKZBnH7eIwEOHxczoF1LnIHySzbq7lMZCBYaYIUHNA0ZD"
       
    }
    ).then((response: any) => {
      console.log('Publicación exitosa:', response);
    }).catch((error: any) => {
      console.error('Error al publicar en Facebook:', error);
    });
 }

 iniciarFb(){
 let initParams: InitParams = {
 appId: '789713780010848',
 autoLogAppEvents : true,
 xfbml : true,
 version : 'v20.0'
 };
 this.fb.init(initParams);
 }
}