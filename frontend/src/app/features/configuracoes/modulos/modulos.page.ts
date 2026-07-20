import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField, PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { environment } from '../../../../environments/environment';
import { buildEditDeleteActions } from '../../../core/table-row-actions.util';

@Component({
  selector: 'app-modulos-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      #dynamicTable
      p-title="Modulos"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-table-custom-actions]="tableCustomActions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class ModulosPage {
  @ViewChild('dynamicTable', { static: true }) dynamicTable!: PoPageDynamicTableComponent;

  private router = inject(Router);
  private http = inject(HttpClient);
  private dialog = inject(PoDialogService);
  private notification = inject(PoNotificationService);

  readonly apiUrl = `${environment.apiUrl}/modules`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'name', label: 'Modulo', visible: true, filter: true },
    { property: 'key', label: 'Key', visible: true, filter: true },
    { property: 'icon', label: 'Icone', visible: true, filter: true },
    { property: 'sortOrder', label: 'Ordem', visible: true, type: 'number', filter: true },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/modulos/novo',
  };

  readonly tableCustomActions = buildEditDeleteActions({
    router: this.router,
    http: this.http,
    dialog: this.dialog,
    notification: this.notification,
    apiUrl: this.apiUrl,
    entityLabel: 'Módulo',
    editPath: (resource) => ['/configuracoes/modulos', resource.id, 'editar'],
    confirmLabel: (resource) => resource.name,
    refresh: () => this.dynamicTable.updateDataTable(),
  });
}
