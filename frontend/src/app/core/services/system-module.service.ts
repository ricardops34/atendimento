import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface SystemModuleSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  name?: string;
  key?: string;
  sortProperty?: string;
  sortDirection?: 'ascending' | 'descending';
}

export interface SystemModuleSearchResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

@Injectable({ providedIn: 'root' })
export class SystemModuleService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/modules`;

  findAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  search(params: SystemModuleSearchParams) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<SystemModuleSearchResult>(`${this.apiUrl}/search`, { params: httpParams });
  }

  findOne(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
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
