import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/estados`;

  getEstados(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  getEstadoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEstado(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateEstado(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  deleteEstado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
