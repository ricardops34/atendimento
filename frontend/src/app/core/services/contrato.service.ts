import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ContratoSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  descricao?: string;
  clienteId?: number;
  tipo?: string;
  dtInicio?: string;
  dtFim?: string;
  isFeriado?: boolean;
  sortProperty?: string;
  sortDirection?: 'ascending' | 'descending';
}

export interface ContratoSearchResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

@Injectable({ providedIn: 'root' })
export class ContratoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/contratos`;

  findAll(bloqueado?: boolean) {
    let params = new HttpParams();
    if (bloqueado !== undefined) {
      params = params.set('bloqueado', String(bloqueado));
    }
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  findOne(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  search(params: ContratoSearchParams) {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.http.get<ContratoSearchResult>(`${this.apiUrl}/search`, { params: httpParams });
  }

  create(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: number, data: any) {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  remove(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
