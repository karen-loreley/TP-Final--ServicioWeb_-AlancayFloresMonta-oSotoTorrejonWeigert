import { Injectable } from '@angular/core';
import { Local } from '../models/local';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  listaLocales!: Array<Local>;

  constructor(private _http: HttpClient) { }

  addLocal(local: Local): Observable<any>
  {
    console.log(local);
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    let body: any = JSON.stringify(local);
    return this._http.post("http://localhost:3000/api/local", body, httpOption);
  }

  getLocales(): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get("http://localhost:3000/api/local", httpOption);
  }

  getLocalById(_id: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    
    return this._http.get("http://localhost:3000/api/local/" +_id, httpOption);
  }

  updateLocal(local: Local): Observable<any> 
  { 
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    let body: any = JSON.stringify(local);
    return this._http.put("http://localhost:3000/api/local/" + local._id, body, httpOption);
  }

  deleteLocal(_id: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    return this._http.delete(`http://localhost:3000/api/local/${_id}`, httpOption);
  }
  
}
