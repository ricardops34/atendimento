import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface ProfileSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  tenantId?: number;
  name?: string;
  sortProperty?: string;
  sortDirection?: 'ascending' | 'descending';
}

export interface ProfileSearchResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/profiles`;

  findAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  search(params: ProfileSearchParams) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<ProfileSearchResult>(`${this.apiUrl}/search`, { params: httpParams });
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
