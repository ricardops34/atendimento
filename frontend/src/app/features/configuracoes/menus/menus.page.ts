import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PoPageDynamicTableModule, PoPageDynamicTableActions, PoPageDynamicTableField, PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { environment } from '../../../../environments/environment';
import { buildEditDeleteActions } from '../../../core/table-row-actions.util';

@Component({
  selector: 'app-menus-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      #dynamicTable
      p-title="Menus"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-table-custom-actions]="tableCustomActions"
      [p-hide-columns-manager]="true">
    </po-page-dynamic-table>
  `,
})
export class MenusPage {
  @ViewChild('dynamicTable', { static: true }) dynamicTable!: PoPageDynamicTableComponent;

  private router = inject(Router);
  private http = inject(HttpClient);
  private dialog = inject(PoDialogService);
  private notification = inject(PoNotificationService);

  readonly apiUrl = `${environment.apiUrl}/menus`;

  fields: PoPageDynamicTableField[] = [
    { property: 'id', label: 'ID', key: true, visible: true, filter: true },
    { property: 'title', label: 'Titulo', visible: true, filter: true },
    { property: 'isActive', label: 'Ativo', visible: true, type: 'boolean', filter: true },
  ];

  actions: PoPageDynamicTableActions = {
    new: 'configuracoes/menus/novo',
  };

  readonly tableCustomActions = buildEditDeleteActions({
    router: this.router,
    http: this.http,
    dialog: this.dialog,
    notification: this.notification,
    apiUrl: this.apiUrl,
    entityLabel: 'Menu',
    editPath: (resource) => ['/configuracoes/menus', resource.id, 'editar'],
    confirmLabel: (resource) => resource.title,
    refresh: () => this.dynamicTable.updateDataTable(),
  });
}
