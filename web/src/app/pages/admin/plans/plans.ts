import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Gestão de Planos do SaaS"
      p-service-api="http://localhost:3000/plans"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class PlansComponent {
  // Definição dos campos para o CRUD Automático
  readonly fields = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome do Plano', filter: true, gridColumns: 6, required: true },
    { property: 'description', label: 'Descrição', gridColumns: 6 },
    { property: 'maxUsers', label: 'Limite Usuários', type: 'number', gridColumns: 2, required: true },
    { property: 'maxBranches', label: 'Limite Filiais', type: 'number', gridColumns: 2, required: true },
    { property: 'maxRecords', label: 'Limite Registros', type: 'number', gridColumns: 2, required: true },
    { property: 'features', label: 'Features (Array JSON)', gridColumns: 6, required: true },
    { property: 'createdAt', label: 'Criado em', type: 'date', visible: false },
  ];
}
