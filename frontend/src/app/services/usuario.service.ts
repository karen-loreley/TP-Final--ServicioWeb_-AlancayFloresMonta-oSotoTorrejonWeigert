import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase: string = 'http://localhost:3000/api/usuario/';
  constructor(private _http: HttpClient) { }

  getTodosUsuarios(): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }

    return this._http.get(this.urlBase, httpOption);
  }

  addUsuario(usuario: Usuario): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    let body: any = JSON.stringify(usuario);

    return this._http.post(this.urlBase, body,httpOption);
  }

  deleteUsuario(id: string): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }

    return this._http.delete(this.urlBase + id, httpOption);
  }

  putUsuario(usuario: Usuario): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(usuario);
    return this._http.put(this.urlBase + usuario._id, body, httpOption);
  }

  getUsuario(_id: string): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    return this._http.get(this.urlBase + _id, httpOption);
  }

  getNombreUsuarioOPerfil(parametro: string): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    return this._http.get(this.urlBase + 'buscar/' + parametro, httpOption);
  }

  getRandomPassword(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'X-RapidAPI-Host': 'password-generator24.p.rapidapi.com',
        'X-RapidAPI-Key': 'c6db663476msh598612b49b9b0e2p1f1ac6jsnd48dd6189f01'
      }),
    }
    return this._http.get("https://password-generator24.p.rapidapi.com/Password_Generator?length=8&use_lower=true&use_upper=true&use_digits=true&use_symbols=false", httpOptions);
  }
}
