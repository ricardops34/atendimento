import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Meus Usuários (Gestão do Cliente)"
      p-service-api="http://localhost:3000/users"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class UsersComponent {
  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: false },
    { property: 'name', label: 'Nome Completo', filter: true, gridColumns: 6 },
    { property: 'email', label: 'E-mail', filter: true, gridColumns: 6 },
    { 
      property: 'role', 
      label: 'Nível de Acesso', 
      type: 'label', 
      options: [
        { value: 'ADMIN', label: 'Administrador', color: 'color-10' },
        { value: 'USER', label: 'Operador', color: 'color-01' }
      ],
      filter: true
    },
    { property: 'isActive', label: 'Ativo', type: 'boolean', filter: true }
  ];
}
