import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/agendamentos`;

  findAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: number, data: any) {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  confirmar(id: number) {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { tipo: 'R' });
  }

  fecharLote(agendamentoIds: number[]) {
    return this.http.post<any>(`${environment.apiUrl}/realizados/fechar-lote`, { agendamentoIds });
  }
}
