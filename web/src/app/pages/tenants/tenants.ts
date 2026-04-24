import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule, PoTableColumn, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, PoModule],
  templateUrl: './tenants.html'
})
export class TenantsComponent {
  readonly columns: Array<PoTableColumn> = [
    { property: 'name', label: 'Nome do Cliente' },
    { property: 'domain', label: 'Domínio' },
    { property: 'plan', label: 'Plano', type: 'label', labels: [
      { value: 'STANDARD', color: 'color-01', label: 'Standard' },
      { value: 'PRO', color: 'color-07', label: 'Pro' },
      { value: 'ENTERPRISE', color: 'color-10', label: 'Enterprise' }
    ]},
    { property: 'isActive', label: 'Status', type: 'boolean' },
    { property: 'createdAt', label: 'Desde', type: 'date' }
  ];

  readonly actions: Array<PoPageAction> = [
    { label: 'Novo Cliente', action: () => alert('Abrir formulário de novo tenant'), icon: 'po-icon-plus' },
    { label: 'Exportar', action: () => {}, icon: 'po-icon-export' }
  ];

  items: Array<any> = [
    { name: 'Alvorada Veículos', domain: 'alvorada.com', plan: 'ENTERPRISE', isActive: true, createdAt: '2024-01-01' },
    { name: 'Oficina do João', domain: 'joao.com', plan: 'STANDARD', isActive: true, createdAt: '2024-03-15' },
    { name: 'Transportadora XYZ', domain: 'xyz.com', plan: 'PRO', isActive: false, createdAt: '2024-02-10' },
  ];
}
