import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novedades } from '../models/novedades';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  constructor(private _http: HttpClient) { }

  addNovedad(novedades: Novedades): Observable<any>
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

  getNovedades(): Observable<any>
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

  getNovedadById(_id: string): Observable<any>
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

  getNovedadesByEstado(estado: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get("http://localhost:3000/api/novedades/estado/" +estado, httpOption);
  }

  getNovedadByAlquilerId(alquilerId: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get(`http://localhost:3000/api/novedades/alquiler/${alquilerId}`, httpOption);
  }

  updateNovedad(novedades: Novedades): Observable<any> 
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

  deleteNovedad(_id: string): Observable<any>
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
