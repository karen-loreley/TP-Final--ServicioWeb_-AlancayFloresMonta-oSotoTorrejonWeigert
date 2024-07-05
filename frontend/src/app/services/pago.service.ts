import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  constructor(private _http: HttpClient) { }


  listaPago!: Array<Pago>;

  addPago(pago: Pago): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    let body: any = JSON.stringify(pago);

    return this._http.post("http://localhost:3000/api/pago", body, httpOption);
  }
  getPagos(): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get("http://localhost:3000/api/pago", httpOption);
    
  }
  
/*
  deletePago(id: string): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }

    return this._http.delete(this.urlBase + id, httpOption);
  }

  putPago(pago: Pago): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(pago);
    return this._http.put(this.urlBase + pago._id, body, httpOption);
  }

  getPago(_id: string): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    return this._http.get(this.urlBase + _id, httpOption);
  }
*/
  }
