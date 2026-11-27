import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfissionalFiscalService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/profissionais-fiscal`;

  findMe() {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  updateMe(data: any) {
    return this.http.put<any>(`${this.apiUrl}/me`, data);
  }

  uploadMeCertificado(file: File, senha: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('senha', senha);
    return this.http.post<any>(`${this.apiUrl}/me/certificado`, formData);
  }

  removeMeCertificado() {
    return this.http.delete<any>(`${this.apiUrl}/me/certificado`);
  }
}
