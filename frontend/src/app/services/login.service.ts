import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  hostBase: string;
  private isLoggedIn = false;


  constructor(private _http:HttpClient) {
    this.hostBase = "http://localhost:3000/api/usuario/";
  }

  public login(usuario: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify({ usuario: usuario, password: password });
    console.log(body);
    return this._http.post(this.hostBase + 'login', body, httpOption).pipe(
      tap((response: any) => {
        if (response && response.token) {
          sessionStorage.setItem("token", response.token);
          sessionStorage.setItem("user", JSON.stringify({
            usuario: response.usuario,
            perfil: response.perfil,
            userid: response.userid // Guarda userid en el JSON
          }));
          this.isLoggedIn = true;
        }
      })
    );
  }
  
    public userLoggedIn(): boolean {
      const user = sessionStorage.getItem("user");
      return this.isLoggedIn || user != null;
    }

  public userLogged(){
    const usuario = sessionStorage.getItem("user");
    if (usuario) {
    try {
      return JSON.parse(usuario);
    } catch (e) {
      console.error('Error al parsear el usuario:', e);
      sessionStorage.removeItem("user");
      return null; // Retorna null si el JSON no es válido
    }
  }
  return null;
  }

  public idLogged(){
      var id = sessionStorage.getItem("userid");
      return id;
    }
  
    
    public logout(): void {
      // reseteo las propiedades del service que indican que un usuario esta logueado y cual es el usuario logueado
      // borro el token almacenado mediante el storage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("userid");
      sessionStorage.removeItem("perfil");
      this.isLoggedIn = false;
    }
  getToken():string{
      if (sessionStorage.getItem("token")!= null){
      return sessionStorage.getItem("token")!;
    }else{
      return "";
    }
  }
  setLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }
}