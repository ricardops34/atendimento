import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AtributoSearchResult {
  items: any[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AtributoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/atributos`;

  findAll(cadastro?: string, ativo?: boolean) {
    let params = new HttpParams();
    if (cadastro) params = params.set('cadastro', cadastro);
    if (ativo !== undefined) params = params.set('ativo', String(ativo));
    return this.http.get<AtributoSearchResult>(this.apiUrl, { params }).pipe(map((res) => res.items));
  }
}
