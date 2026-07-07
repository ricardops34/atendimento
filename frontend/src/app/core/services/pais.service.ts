import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/paises`;

  findAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  search(page: number, pageSize: number, search?: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
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

  delete(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
