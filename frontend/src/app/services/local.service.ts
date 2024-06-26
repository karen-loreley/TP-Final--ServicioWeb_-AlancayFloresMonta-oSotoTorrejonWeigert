import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  urlBase: string = 'http://localhost:3000/api/local/';
  constructor(private _http: HttpClient) { }

  getLocalesNoAlquilados(): Observable<any>{
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }

    return this._http.get(this.urlBase + 'noAlquilados', httpOption);
  }
}
