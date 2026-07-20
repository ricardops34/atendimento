import { Component, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField, PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { buildEditDeleteActions } from '../../../core/table-row-actions.util';

@Component({
  selector: 'app-config-empresas-page',
  standalone: true,
  imports: [PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      #dynamicTable
      p-title="Empresas"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-table-custom-actions]="tableCustomActions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class ConfigEmpresasPage {
  @ViewChild('dynamicTable', { static: true }) dynamicTable!: PoPageDynamicTableComponent;

  private router = inject(Router);
  private http = inject(HttpClient);
  private dialog = inject(PoDialogService);
  private notification = inject(PoNotificationService);

  readonly apiUrl = `${environment.apiUrl}/empresas`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'name', label: 'Empresa', visible: true, filter: true },
    { property: 'slug', label: 'Slug', visible: true, filter: true },
    { property: 'cnpj', label: 'CNPJ', visible: true, filter: true }
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/empresas/novo',
  };

  readonly tableCustomActions = buildEditDeleteActions({
    router: this.router,
    http: this.http,
    dialog: this.dialog,
    notification: this.notification,
    apiUrl: this.apiUrl,
    entityLabel: 'Empresa',
    editPath: (resource) => ['/configuracoes/empresas', resource.id, 'editar'],
    confirmLabel: (resource) => resource.name,
    refresh: () => this.dynamicTable.updateDataTable(),
  });
}
