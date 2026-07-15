import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface MenuSearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
  moduleId?: number;
  routineId?: number;
  parentId?: number;
  label?: string;
  link?: string;
  isActive?: boolean;
  sortProperty?: string;
  sortDirection?: 'ascending' | 'descending';
}

export interface MenuSearchResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/menus`;

  findAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  search(params: MenuSearchParams) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<MenuSearchResult>(`${this.apiUrl}/search`, { params: httpParams });
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

  findRoutineLink(menuId: number) {
    return this.http.get<any>(`${this.apiUrl}/routine-links/${menuId}`);
  }

  createRoutineLink(data: { menuId: number; routineId: number; sortOrder?: number; isActive?: boolean }) {
    return this.http.post<any>(`${this.apiUrl}/routine-links`, data);
  }

  updateRoutineLink(id: number, data: { menuId: number; routineId: number; sortOrder?: number; isActive?: boolean }) {
    return this.http.patch<any>(`${this.apiUrl}/routine-links/${id}`, data);
  }
}
