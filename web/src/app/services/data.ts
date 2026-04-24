import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtém os headers necessários para o contexto Multi-tenant
   */
  private getHeaders() {
    const tenantId = localStorage.getItem('tenantId') || '';
    const token = localStorage.getItem('token') || '';
    
    return new HttpHeaders({
      'x-tenant-id': tenantId,
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Busca a estrutura de menu dinâmica do usuário
   */
  getMenu(): Observable<any> {
    return this.http.get(`${this.apiUrl}/menu`, { headers: this.getHeaders() });
  }

  /**
   * Busca os metadados de uma entidade específica
   */
  getMetadata(entity: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/metadata/${entity}`, { headers: this.getHeaders() });
  }
}
