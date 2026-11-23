import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

export interface BancoHorasExtratoLinha {
  id: number;
  data: string;
  tipo: 'CREDITO' | 'DEBITO';
  descricao?: string | null;
  agendamentoId?: number | null;
  credito: number;
  debito: number;
  saldo: number;
  valorCredito: number;
  valorDebito: number;
  valorSaldo: number;
}

export interface BancoHorasExtrato {
  contrato?: string;
  profissional?: string;
  dataInicial: string | null;
  dataFinal: string | null;
  valorHora: number;
  saldoAnterior: number;
  totalCreditos: number;
  totalDebitos: number;
  saldoFinal: number;
  valorSaldoAnterior: number;
  valorTotalCreditos: number;
  valorTotalDebitos: number;
  valorSaldoFinal: number;
  saldoAtual: number;
  movimentos: BancoHorasExtratoLinha[];
}

export interface BancoHorasPeriodo {
  dataInicial?: string | null;
  dataFinal?: string | null;
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

  extrato(id: number, periodo: BancoHorasPeriodo = {}) {
    return this.http.get<BancoHorasExtrato>(`${this.apiUrl}/${id}/movimentos`, {
      params: this.periodoParams(periodo),
    });
  }

  exportarExtrato(id: number, format: 'pdf' | 'xls', periodo: BancoHorasPeriodo = {}, ocultarValor = false) {
    const params = this.periodoParams(periodo).set('format', format).set('ocultarValor', String(ocultarValor));
    return this.http.get(`${this.apiUrl}/${id}/movimentos/export`, { params, responseType: 'blob' });
  }

  private periodoParams(periodo: BancoHorasPeriodo): HttpParams {
    let params = new HttpParams();
    if (periodo.dataInicial) params = params.set('dataInicial', periodo.dataInicial);
    if (periodo.dataFinal) params = params.set('dataFinal', periodo.dataFinal);
    return params;
  }

  lancarDebito(id: number, data: { data: string; horas: number; descricao?: string }) {
    return this.http.post<BancoHorasMovimento>(`${this.apiUrl}/${id}/debito`, data);
  }
}
