import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PoPageDynamicTableModule, 
  PoPageDynamicTableField, 
  PoPageDynamicTableActions 
} from '@po-ui/ng-templates';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-menu-management',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Gestão SaaS: Menus do Sistema"
      [p-breadcrumb]="breadcrumb"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class MenuManagementComponent {
  private coreService = inject(CoreService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/menu`;

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Gestão SaaS' },
      { label: 'Menus' }
    ]
  };

  readonly actions: PoPageDynamicTableActions = {
    new: '/saas/menu/new',
    edit: '/saas/menu/edit/:id',
    remove: true,
    removeAll: true
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'module', label: 'Módulo', filter: true, gridColumns: 3 },
    { 
      property: 'type', 
      label: 'Tipo', 
      type: 'label',
      gridColumns: 3,
      options: [
        { value: 'SIDEBAR', label: 'Lateral', color: 'color-07' },
        { value: 'TOOLBAR', label: 'Cabeçalho', color: 'color-11' }
      ]
    },
    { property: 'group', label: 'Grupo', filter: true, gridColumns: 3 },
    { property: 'subGroup', label: 'Subgrupo', visible: false },
    { property: 'name', label: 'Nome (Label)', filter: true, gridColumns: 3 },
    { property: 'link', label: 'Link / Rota', gridColumns: 4 },
    { property: 'icon', label: 'Ícone', gridColumns: 4 },
    { property: 'order', label: 'Ordem', type: 'number', gridColumns: 2 },
    { property: 'active', label: 'Ativo', type: 'boolean', gridColumns: 2 },
    { property: 'roles', label: 'Papéis (Acesso)', visible: false }
  ];
}
