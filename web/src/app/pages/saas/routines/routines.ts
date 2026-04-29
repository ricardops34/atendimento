import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PoPageDynamicTableModule, 
  PoPageDynamicTableField, 
  PoPageDynamicTableActions 
} from '@po-ui/ng-templates';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../core/services/core.service';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      [p-title]="'Catálogo Global de Rotinas'"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-quick-search-width]="400"
    >
    </po-page-dynamic-table>
  `
})
export class RoutinesComponent implements OnInit {
  private coreService = inject(CoreService);
  private http = inject(HttpClient);
  private notification = inject(PoNotificationService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/routines/catalog`;
  
  readonly actions: PoPageDynamicTableActions = {
    new: '/saas/routines/new',
    edit: '/saas/routines/edit/:id',
    remove: true,
    custom: [
      { 
        label: 'Sincronizar Sistema', 
        action: () => this.syncSystem(), 
        icon: 'po-icon-sync' 
      }
    ]
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'module', label: 'Módulo', gridColumns: 3, filter: true },
    { property: 'label', label: 'Nome da Rotina', gridColumns: 4, filter: true },
    { property: 'type', label: 'Tipo', type: 'label', gridColumns: 2, 
      labels: [
        { value: 'S', color: 'color-11', label: 'Sistema' },
        { value: 'U', color: 'color-01', label: 'Usuário' }
      ]
    },
    { property: 'link', label: 'Rota', gridColumns: 3 },
    { property: 'levelMin', label: 'Nível Min.', type: 'number', gridColumns: 2 }
  ];

  ngOnInit() {}

  syncSystem() {
    this.http.post(`${this.coreService.apiUrl}/routines/seed`, {}).subscribe({
      next: () => {
        this.notification.success('Rotinas do sistema sincronizadas com sucesso!');
        window.location.reload();
      },
      error: () => this.notification.error('Falha ao sincronizar rotinas.')
    });
  }
}
