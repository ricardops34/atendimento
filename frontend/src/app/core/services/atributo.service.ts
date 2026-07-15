import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
