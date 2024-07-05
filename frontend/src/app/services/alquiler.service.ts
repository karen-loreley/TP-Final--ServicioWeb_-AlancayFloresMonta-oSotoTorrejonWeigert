import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../models/alquiler';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private apiUrl ="http://localhost:3000/api/alquiler/"
  constructor(private http:HttpClient) { }
  getAlquileres(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.apiUrl);
  }

  getAlquiler(id: string): Observable<Alquiler> {
    return this.http.get<Alquiler>(`${this.apiUrl}/${id}`);
  }

  createAlquiler(alquiler: Alquiler): Observable<any> {
    return this.http.post<any>(this.apiUrl, alquiler, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateAlquiler(id: string, alquiler: Alquiler): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, alquiler, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteAlquiler(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getAlquileresPorAño(fechaAlquiler: string): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(`${this.apiUrl}/porAno/${fechaAlquiler}`);
  listaAlquileres!: Array<Alquiler>;

  constructor(private _http: HttpClient) { }

  addAlquiler(alquiler: Alquiler): Observable<any>
  {
    console.log(alquiler);
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    let body: any = JSON.stringify(alquiler);
    return this._http.post("http://localhost:3000/api/alquiler", body, httpOption);
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
    return this._http.get("http://localhost:3000/api/alquiler", httpOption);
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
    
    return this._http.get("http://localhost:3000/api/alquiler/" +_id, httpOption);
  }

  getAlquilerByLocalId(localId: string): Observable<any>
  {
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }
    
    return this._http.get("http://localhost:3000/api/alquiler/local/" +localId, httpOption);
  }

  updateAlquiler(alquiler: Alquiler): Observable<any> 
  { 
    let httpOption = 
    {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'
      })
    }

    let body: any = JSON.stringify(alquiler);
    return this._http.put("http://localhost:3000/api/alquiler/" + alquiler._id, body, httpOption);
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

    return this._http.delete(`http://localhost:3000/api/alquiler/${_id}`, httpOption);
  }
}
