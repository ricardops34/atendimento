import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { CoreService } from '../../core/services/core.service'; // Este estava certo

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      id="saas-users-table"
      p-title="Gestão de Usuários"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class UsersComponent {
  private coreService = inject(CoreService);

  get apiUrl() {
    return `${this.coreService.apiUrl}/users`;
  }

  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome Completo', filter: true, gridColumns: 6, required: true },
    { property: 'email', label: 'E-mail', filter: true, gridColumns: 6, required: true },
    { property: 'password', label: 'Senha', type: 'password', visible: false, allowEdit: true, required: true },
    { 
      property: 'role', 
      label: 'Nível de Acesso', 
      type: 'label', 
      options: [
        { value: 'SUPER_ADMIN', label: 'SaaS Master', color: 'color-07' },
        { value: 'ADMIN', label: 'Admin Cliente', color: 'color-10' },
        { value: 'USER', label: 'Operador', color: 'color-01' }
      ],
      filter: true,
      gridColumns: 6,
      required: true
    },
    { property: 'status', label: 'Status', type: 'boolean', filter: true, gridColumns: 2 }
  ];
}
