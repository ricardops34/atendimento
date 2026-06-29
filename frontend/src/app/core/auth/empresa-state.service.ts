import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaStateService {
  public empresaId = signal<number | null>(null);
  public profileId = signal<number | null>(null);
  public modules = signal<string[]>([]);
  public user = signal<any>(null);

  setSession(data: any) {
    this.user.set(data.user);
    this.empresaId.set(data.user.empresaId || data.user.empresa?.id || null);
    this.profileId.set(data.user.profileId || null);
    this.modules.set(data.user.modules || []);
  }

  clearSession() {
    this.user.set(null);
    this.empresaId.set(null);
    this.profileId.set(null);
    this.modules.set([]);
  }

  hasModule(moduleKey: string): boolean {
    return this.modules().includes(moduleKey);
  }
}
