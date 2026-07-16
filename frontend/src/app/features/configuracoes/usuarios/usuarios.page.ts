import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Usuário"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class UsuariosPage {
  readonly apiUrl = `${environment.apiUrl}/users`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'name', label: 'Usuario', visible: true, filter: true },
    { property: 'email', label: 'Email', visible: true, filter: true },
    { property: 'profile.name', label: 'Perfil', visible: true },
    { property: 'isActive', label: 'Ativo', visible: true, type: 'boolean' },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/usuarios/novo',
    edit: 'configuracoes/usuarios/:id/editar',
    remove: true,
  };
}
