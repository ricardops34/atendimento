import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      id="saas-users-table"
      p-title="Gestão de Usuários do Sistema"
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

  // Rótulos e Opções em Português
  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome Completo', filter: true, gridColumns: 6, required: true },
    { property: 'email', label: 'E-mail de Acesso', filter: true, gridColumns: 6, required: true },
    { property: 'password', label: 'Senha Provisória', type: 'password', visible: false, allowEdit: true, required: true },
    { 
      property: 'role', 
      label: 'Nível de Permissão', 
      type: 'label', 
      options: [
        { value: 'SUPER_ADMIN', label: 'Administrador SaaS', color: 'color-07' },
        { value: 'ADMIN', label: 'Administrador de Empresa', color: 'color-10' },
        { value: 'USER', label: 'Usuário Operacional', color: 'color-01' }
      ],
      filter: true,
      gridColumns: 6,
      required: true
    },
    { property: 'status', label: 'Usuário Ativo', type: 'boolean', filter: true, gridColumns: 2 }
  ];
}
