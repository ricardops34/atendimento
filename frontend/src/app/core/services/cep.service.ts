import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/ceps`;

  getCeps(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  getCepById(cep: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cep}`);
  }

  createCep(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateCep(cep: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${cep}`, data);
  }

  deleteCep(cep: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cep}`);
  }
}
