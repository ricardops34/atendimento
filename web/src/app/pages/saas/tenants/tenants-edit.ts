import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicEditModule, PoPageDynamicEditField } from '@po-ui/ng-templates';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-tenants-edit',
  standalone: true,
  imports: [CommonModule, PoPageDynamicEditModule],
  template: `
    <po-page-dynamic-edit
      [p-title]="'Gestão de Empresa (Grupo)'"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
    >
    </po-page-dynamic-edit>
  `
})
export class TenantsEditComponent implements OnInit {
  private coreService = inject(CoreService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/tenants`;
  
  // Objeto para armazenar valores padrão
  tenant: any = { 
    isActive: true,
    status: 'ACTIVE'
  };
  
  readonly fields: Array<PoPageDynamicEditField> = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome do Grupo / Holding', gridColumns: 6, required: true },
    { property: 'email', label: 'E-mail Principal', gridColumns: 6, required: true },
    { property: 'domain', label: 'Domínio / Slug', gridColumns: 6, required: true, help: 'Ex: cliente.suaplataforma.com.br' },
    { property: 'planId', label: 'Plano Contratado', gridColumns: 6, required: true, searchService: `${this.coreService.apiUrl}/plans`, columns: [{property: 'name'}] },
    { property: 'status', label: 'Status da Conta', gridColumns: 4, 
      options: [
        { label: 'Ativo', value: 'ACTIVE' },
        { label: 'Inadimplente', value: 'OVERDUE' },
        { label: 'Suspenso', value: 'SUSPENDED' },
        { label: 'Cancelado', value: 'CANCELLED' }
      ]
    },
    { property: 'isActive', label: 'Acesso Liberado', type: 'boolean', gridColumns: 2 },
    { property: 'logoUrl', label: 'URL da Logo Global', gridColumns: 6 }
  ];

  ngOnInit() {}
}
