import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Promocion } from '../../../models/promocion';
import { Local } from '../../../models/local';
import { ActivatedRoute } from '@angular/router';
import { PromocionService } from '../../../services/promocion.service';
import { LocalService } from '../../../services/local.service';
import { FacebookModule, FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';


@Component({
  selector: 'app-crud-promocino',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crud-promocino.component.html',
  styleUrl: './crud-promocino.component.css'
})
export class CrudPromocinoComponent {

  mensaje: string = "";
  promocion!:Promocion;
  promociones!: Array<Promocion>;
  accion:string="new";
  form: boolean=true;
  locales!: Array<Local>;
  promocionId: string | null = null;

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
    this.localService.getLocales(1,6).subscribe(
      data => {
        this.locales = data;
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

  postFb(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('/102692548160135/feed', apiMethod,
    {
    "message": this.mensaje, //el token vence cada 1/2 hora
    "access_token":"EAAXGSugihHIBO46HHmJpFOUNGZB745xNNPZAmU2vhkOhICgkn9mnAStZC1KWPDXD3ghVBLHAoXQKEvO6Smh0ZBaKWoIatUaFQk8IDAtDlhJXwF2Gyl5y7NnEXgNp8oy1LZCwZA0zRvcDum196Lz5LzaFCOBgXGi4cMZB7zK4ocTgt44WXY2VbPHRwLlCKGoFBuqGZA3DMEHvxJhAZBE0B9rGQefiq"
  }).then((response: any) => {
    console.log('Publicación exitosa:', response);
  }).catch((error: any) => {
    console.error('Error al publicar en Facebook:', error);
  });;
}
iniciarFb(){
let initParams: InitParams = {
appId: '308626842344467',
autoLogAppEvents : true,
xfbml : true,
version : 'v20.0'
};
this.fb.init(initParams);
}
loginWithFacebook(): void {

  this.fb.login()
  .then((response: LoginResponse) =>
  {
  console.log(response);
 
  })
  .catch((error: any) => console.error(error));
  }
}