import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novedades } from '../models/novedades';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  listaNovedades!: Array<Novedades>;

  constructor(private _http: HttpClient) { }

  addNovedades(novedades: Novedades): Observable<any>
  {
    console.log(novedades);
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    let body: any = JSON.stringify(novedades);
    return this._http.post("http://localhost:3000/api/novedades", body, httpOption);
  }

  getAlquileres(): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get("http://localhost:3000/api/novedades", httpOption);
  }

  getAlquilerById(_id: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    
    return this._http.get("http://localhost:3000/api/novedades/" +_id, httpOption);
  }

  updateAlquiler(novedades: Novedades): Observable<any> 
  { 
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    let body: any = JSON.stringify(novedades);
    return this._http.put("http://localhost:3000/api/novedades/" + novedades._id, body, httpOption);
  }

  deleteAlquiler(_id: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    return this._http.delete(`http://localhost:3000/api/novedades/${_id}`, httpOption);
  }
}
