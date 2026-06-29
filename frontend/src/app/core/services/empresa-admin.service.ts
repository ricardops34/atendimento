import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface EmpresaAdminSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  name?: string;
  slug?: string;
  sortProperty?: string;
  sortDirection?: 'ascending' | 'descending';
}

export interface EmpresaAdminSearchResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}


@Injectable({ providedIn: 'root' })
export class EmpresaAdminService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/empresas`;

  findAll() {
    return this.http.get<any>(`${this.apiUrl}?pageSize=1000`).pipe(
      map((res: any) => (res?.items ? res.items : res) as any[])
    );
  }

  findOne(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  search(params: EmpresaAdminSearchParams) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<EmpresaAdminSearchResult>(`${this.apiUrl}/search`, { params: httpParams });
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

