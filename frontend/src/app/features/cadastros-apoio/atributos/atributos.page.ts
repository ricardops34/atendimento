import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PoPageDynamicTableComponent, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-atributos-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      #dynamicTable
      p-title="Atributos"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
      [p-table-custom-actions]="tableCustomActions"
    >
    </po-page-dynamic-table>
  `,
  styles: [`
    :host ::ng-deep .an-trash {
      color: var(--color-feedback-negative-base, #dc3545);
    }
  `],
})
export class AtributosPage {
  @ViewChild('dynamicTable', { static: true }) dynamicTable!: PoPageDynamicTableComponent;

  private http = inject(HttpClient);
  private router = inject(Router);
  private poDialog = inject(PoDialogService);
  private poNotification = inject(PoNotificationService);

  readonly apiUrl = `${environment.apiUrl}/atributos`;

  readonly fields: Array<any> = [
    { property: 'id', label: 'ID', key: true, width: '10%', filter: true },
    { property: 'sequencia', label: 'Sequência', width: '10%' },
    { property: 'titulo', label: 'Título', filter: true },
    { property: 'tipo', label: 'Tipo', width: '12%', filter: true },
    { property: 'cadastro', label: 'Cadastro', width: '12%', filter: true },
    { property: 'obrigatorio', label: 'Obrigatório', type: 'boolean', width: '10%', filter: true },
    { property: 'ativo', label: 'Ativo', type: 'boolean', width: '10%', filter: true },
    { property: 'emUso', label: 'Em Uso', type: 'boolean', width: '10%' },
  ];

  readonly actions = {
    new: '/atributos/novo',
    remove: false,
  };

  readonly tableCustomActions = [
    {
      label: 'Editar',
      icon: 'an an-pencil-simple',
      visible: () => true,
      action: (resource: any) => this.router.navigate(['/atributos', resource.id, 'editar']),
    },
    {
      label: 'Excluir',
      icon: 'an an-trash',
      visible: (resource: any) => !resource.emUso,
      action: (resource: any) => this.confirmarExclusao(resource),
    },
  ];

  private confirmarExclusao(resource: any) {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: `Confirma a exclusão do atributo "${resource.titulo}"?`,
      confirm: () => this.excluir(resource.id),
    });
  }

  private excluir(id: number) {
    this.http.delete(`${environment.apiUrl}/atributos/${id}`).subscribe({
      next: () => {
        this.poNotification.success('Atributo excluído com sucesso.');
        this.dynamicTable.updateDataTable();
      },
      error: () => {
        this.poNotification.error('Erro ao excluir atributo.');
      },
    });
  }
}
