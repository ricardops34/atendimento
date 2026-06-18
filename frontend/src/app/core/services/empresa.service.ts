import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface EmpresaSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  id?: number;
  nome?: string;
  sortProperty?: string;
  sortDirection?: 'ascending' | 'descending';
}

export interface EmpresaSearchResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/empresas`;

  findAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  search(params: EmpresaSearchParams) {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.http.get<EmpresaSearchResult>(`${this.apiUrl}/search`, { params: httpParams });
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
