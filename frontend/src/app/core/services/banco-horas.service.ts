import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface BancoHorasItem {
  id: number;
  contratoId: number;
  contratoDescricao: string;
  profissionalId: number;
  profissionalNome: string;
  maxHorasMes: number | null;
  modoExcedente: string | null;
  saldoBancoHoras: number;
}

export interface BancoHorasMovimento {
  id: number;
  contratoProfissionalId: number;
  tipo: 'CREDITO' | 'DEBITO';
  horas: number;
  data: string;
  descricao?: string | null;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class BancoHorasService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/banco-horas`;

  findAll() {
    return this.http.get<{ items: BancoHorasItem[] }>(this.apiUrl);
  }

  findOne(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  extrato(id: number) {
    return this.http.get<BancoHorasMovimento[]>(`${this.apiUrl}/${id}/movimentos`);
  }

  lancarDebito(id: number, data: { data: string; horas: number; descricao?: string }) {
    return this.http.post<BancoHorasMovimento>(`${this.apiUrl}/${id}/debito`, data);
  }
}
