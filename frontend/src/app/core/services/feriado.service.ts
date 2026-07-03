import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface FeriadoSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  id?: number;
  descricao?: string;
  sortProperty?: string;
  sortDirection?: 'ascending' | 'descending';
}

@Injectable({ providedIn: 'root' })
export class FeriadoService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/feriados`;

  search(params: FeriadoSearchParams) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value.toString());
      }
    });
    return this.http.get<any>(`${this.url}/search`, { params: httpParams });
  }

  findAll() {
    return this.http.get<any[]>(this.url);
  }

  findOne(id: number) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  create(payload: any) {
    return this.http.post<any>(this.url, payload);
  }

  update(id: number, payload: any) {
    return this.http.patch<any>(`${this.url}/${id}`, payload);
  }

  remove(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  gerarNacionais(ano: number) {
    return this.http.post<any>(`${this.url}/gerar-nacionais`, { ano });
  }
}
