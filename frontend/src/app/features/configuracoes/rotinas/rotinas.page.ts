import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField, PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { environment } from '../../../../environments/environment';
import { buildEditDeleteActions } from '../../../core/table-row-actions.util';

@Component({
  selector: 'app-rotinas-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      #dynamicTable
      p-title="Rotinas"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-table-custom-actions]="tableCustomActions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class RotinasPage {
  @ViewChild('dynamicTable', { static: true }) dynamicTable!: PoPageDynamicTableComponent;

  private router = inject(Router);
  private http = inject(HttpClient);
  private dialog = inject(PoDialogService);
  private notification = inject(PoNotificationService);

  readonly apiUrl = `${environment.apiUrl}/routines`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'module.name', label: 'Modulo', visible: true },
    { property: 'name', label: 'Rotina', visible: true, filter: true },
    { property: 'key', label: 'Key', visible: true, filter: true },
    { property: 'path', label: 'Path', visible: true, filter: true },
    { property: 'isActive', label: 'Ativa', visible: true, type: 'boolean' },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/rotinas/novo',
  };

  readonly tableCustomActions = buildEditDeleteActions({
    router: this.router,
    http: this.http,
    dialog: this.dialog,
    notification: this.notification,
    apiUrl: this.apiUrl,
    entityLabel: 'Rotina',
    editPath: (resource) => ['/configuracoes/rotinas', resource.id, 'editar'],
    confirmLabel: (resource) => resource.name,
    refresh: () => this.dynamicTable.updateDataTable(),
  });
}
