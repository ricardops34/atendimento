import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  
  // URL base dinâmica: Detecta se está local ou em produção/VPN
  public readonly apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3000' 
    : '/api';

  constructor() { }
}
