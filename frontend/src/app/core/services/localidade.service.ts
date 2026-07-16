import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  erro?: boolean;
}

export interface BrasilApiCnpjResponse {
  razao_social: string;
  nome_fantasia: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  ddd_telefone_1: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class LocalidadeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/localidades`;

  findEstados(): Observable<{ id: number; nome: string; sigla: string }[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estados`);
  }

  findMunicipios(ufOuEstadoId: number | string, search?: string): Observable<{ id: number; nome: string }[]> {
    const params: any = {};
    if (typeof ufOuEstadoId === 'number') {
      params['estadoId'] = ufOuEstadoId.toString();
    } else {
      params['sigla'] = ufOuEstadoId;
    }
    if (search) params['search'] = search;
    return this.http.get<any[]>(`${this.apiUrl}/municipios`, { params });
  }

  buscarCep(cep: string): Observable<ViaCepResponse> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  }

  buscarCnpj(cnpj: string): Observable<BrasilApiCnpjResponse> {
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    return this.http.get<BrasilApiCnpjResponse>(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
  }
}
