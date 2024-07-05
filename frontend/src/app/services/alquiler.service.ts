import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alquiler } from '../models/alquiler';
import { Observable } from 'rxjs';

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
  }
}
