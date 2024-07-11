import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adelanto } from '../models/adelanto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdelantoService {
  constructor(private _http: HttpClient) { }


  listaPago!: Array<Adelanto>;

  addAdelanto(adelanto: Adelanto): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    let body: any = JSON.stringify(adelanto);

    return this._http.post("http://localhost:3000/api/adelanto", body, httpOption);
  }
  getAdelanto(): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get("http://localhost:3000/api/adelanto", httpOption);
    
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
