import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propietario } from '../models/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  listaPropietarios!: Array<Propietario>;

  constructor(private _http: HttpClient) { }

  addPropietario(propietario: Propietario): Observable<any>
  {
    console.log(propietario);
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    let body: any = JSON.stringify(propietario);
    return this._http.post("http://localhost:3000/api/propietario", body, httpOption);
  }

  getPropietarios(): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get("http://localhost:3000/api/propietario", httpOption);
  }

  getPropietarioById(_id: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    
    return this._http.get("http://localhost:3000/api/propietario/" +_id, httpOption);
  }

  updatePropietario(propietario: Propietario): Observable<any> 
  { 
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    let body: any = JSON.stringify(propietario);
    return this._http.put("http://localhost:3000/api/propietario/" + propietario._id, body, httpOption);
  }

  deletePropietario(_id: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    return this._http.delete(`http://localhost:3000/api/propietario/${_id}`, httpOption);
  }
}