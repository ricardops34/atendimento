import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/municipios`;

  getMunicipios(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  getMunicipioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createMunicipio(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateMunicipio(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  deleteMunicipio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
