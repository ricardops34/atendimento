import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantStateService {
  public tenantId = signal<number | null>(null);
  public profileId = signal<number | null>(null);
  public modules = signal<string[]>([]);
  public user = signal<any>(null);

  setSession(data: any) {
    this.user.set(data.user);
    this.tenantId.set(data.user.tenant?.id || null);
    this.profileId.set(data.user.profile?.id || null); // Note: API might not return profile.id directly, but returns modules
    this.modules.set(data.user.modules || []);
  }

  clearSession() {
    this.user.set(null);
    this.tenantId.set(null);
    this.profileId.set(null);
    this.modules.set([]);
  }

  hasModule(moduleKey: string): boolean {
    return this.modules().includes(moduleKey);
  }
}
