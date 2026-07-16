import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField, PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { environment } from '../../../../environments/environment';
import { buildEditDeleteActions } from '../../../core/table-row-actions.util';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      #dynamicTable
      p-title="Usuário"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-table-custom-actions]="tableCustomActions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class UsuariosPage {
  @ViewChild('dynamicTable', { static: true }) dynamicTable!: PoPageDynamicTableComponent;

  private router = inject(Router);
  private http = inject(HttpClient);
  private dialog = inject(PoDialogService);
  private notification = inject(PoNotificationService);

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
  };

  readonly tableCustomActions = buildEditDeleteActions({
    router: this.router,
    http: this.http,
    dialog: this.dialog,
    notification: this.notification,
    apiUrl: this.apiUrl,
    entityLabel: 'Usuário',
    editPath: (resource) => ['/configuracoes/usuarios', resource.id, 'editar'],
    confirmLabel: (resource) => resource.name,
    refresh: () => this.dynamicTable.updateDataTable(),
  });
}
