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

@Injectable({ providedIn: 'root' })
export class LocalidadeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/localidades`;

  findEstados(): Observable<{ id: number; nome: string; sigla: string }[]> {
    return this.http.get<any[]>(`${this.apiUrl}/estados`);
  }

  findMunicipios(siglaUf: string, search?: string): Observable<{ id: number; nome: string }[]> {
    const params: any = { sigla: siglaUf };
    if (search) params['search'] = search;
    return this.http.get<any[]>(`${this.apiUrl}/municipios`, { params });
  }

  buscarCep(cep: string): Observable<ViaCepResponse> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  }
}
