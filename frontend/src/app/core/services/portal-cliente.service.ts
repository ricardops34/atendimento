import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PortalClienteListaParams {
  page?: number;
  pageSize?: number;
  search?: string;
  tipo?: string;
  local?: string;
  contratoId?: number;
  dataInicial?: string;
  dataFinal?: string;
}

export interface PortalClienteListaResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

// Consome o portal de autoatendimento do Cliente (feature 003-acesso-cliente-atendimentos).
// Nunca envia clienteId/empresaId: ambos são resolvidos pelo backend a partir do JWT.
@Injectable({ providedIn: 'root' })
export class PortalClienteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/portal-cliente/agendamentos`;

  calendario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/calendario`);
  }

  lista(params: PortalClienteListaParams): Observable<PortalClienteListaResult> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<PortalClienteListaResult>(this.apiUrl, { params: httpParams });
  }

  extrato(
    dataInicial: string,
    dataFinal: string,
    tipoExtrato: 'sintetico' | 'analitico' | 'calendario',
    format: 'pdf' | 'xls',
  ): Observable<Blob> {
    const params = new HttpParams()
      .set('format', format)
      .set('tipoExtrato', tipoExtrato)
      .set('dataInicial', dataInicial)
      .set('dataFinal', dataFinal);
    return this.http.get(`${this.apiUrl}/extrato`, { params, responseType: 'blob' });
  }
}
