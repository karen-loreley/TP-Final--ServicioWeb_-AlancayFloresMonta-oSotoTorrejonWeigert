import { Injectable } from '@angular/core';
import { Promocion } from '../models/promocion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  promocion!:Array<Promocion>;

  constructor(private _http: HttpClient){
    
  }

   getPromocion():Observable<any>{
   let httpOption = {
    headers: new HttpHeaders({
      'content-Type': 'application/json'
    })
   }
   return this._http.get('http://localhost:3000/api/promocion',httpOption);
  }

  add(promocion:Promocion):Observable<any>{
    //console.log(expediente);
    let httpOption = {
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
     }
     let body:any = JSON.stringify(promocion);
     return this._http.post('http://localhost:3000/api/promocion',body ,httpOption);
  }

  update(promocion:Promocion):Observable<any>{
    console.log(promocion);
    let httpOption = {
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
     }
     let body:any = JSON.stringify(promocion);
     return this._http.put('http://localhost:3000/api/promocion/'+promocion._id,body, httpOption);
  }

  getPromocionById(_id:string):Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
     }
     return this._http.get('http://localhost:3000/api/promocion/'+_id,httpOption);
  }

  deletePromocion(id:string):Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
     }
     return this._http.delete('http://localhost:3000/api/promocion/'+id,httpOption);
  }

}