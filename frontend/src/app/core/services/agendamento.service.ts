import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AgendamentoSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  tipo?: string;
  local?: string;
  contratoId?: number;
  profissionalId?: number;
  dataInicial?: string;
  dataFinal?: string;
}

export interface AgendamentoSearchResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

export type ExportFormat = 'csv' | 'xls' | 'pdf' | 'xml';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/agendamentos`;

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  search(params: AgendamentoSearchParams): Observable<AgendamentoSearchResult> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<AgendamentoSearchResult>(`${this.apiUrl}/search`, { params: httpParams });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  confirmar(id: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/confirmar`, {});
  }

  export(params: AgendamentoSearchParams, format: ExportFormat): Observable<Blob> {
    let httpParams = new HttpParams().set('format', format);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get(`${this.apiUrl}/export`, { params: httpParams, responseType: 'blob' });
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  fecharLote(agendamentoIds: number[]): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/realizados/fechar-lote`, { agendamentoIds });
  }
}
