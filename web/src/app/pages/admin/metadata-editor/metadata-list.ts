import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PoModule, 
  PoTableColumn, 
  PoTableAction,
  PoPageAction 
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-metadata-list',
  standalone: true,
  imports: [CommonModule, PoModule],
  template: `
    <po-page-default 
      p-title="Arquitetura do Sistema e Metadados"
      [p-actions]="pageActions">
      
      <po-table 
        [p-columns]="columns" 
        [p-items]="entities"
        [p-actions]="tableActions"
        p-sort="true"
        p-container="shadow">
      </po-table>

    </po-page-default>
  `
})
export class MetadataListComponent implements OnInit {
  private http = inject(HttpClient);
  private coreService = inject(CoreService);
  private router = inject(Router);

  entities: Array<any> = [];

  pageActions: Array<PoPageAction> = [
    { label: 'Nova Entidade (Usuário)', action: () => this.createNewEntity(), icon: 'po-icon-plus' }
  ];

  columns: Array<PoTableColumn> = [
    { property: 'label', label: 'Nome da Entidade' },
    { property: 'name', label: 'Slug / API' },
    { 
      property: 'type', 
      label: 'Tipo', 
      type: 'label',
      labels: [
        { value: 'SISTEMA', label: 'Sistema', color: 'color-07', tooltip: 'Entidade nativa do core' },
        { value: 'USUARIO', label: 'Usuário', color: 'color-10', tooltip: 'Entidade dinâmica' }
      ]
    },
    { property: 'description', label: 'Descrição' }
  ];

  tableActions: Array<PoTableAction> = [
    { label: 'Configurar Campos', icon: 'po-icon-edit', action: (row: any) => this.editMetadata(row) },
    { label: 'Visualizar Estrutura', icon: 'po-icon-eye', action: (row: any) => this.viewMetadata(row) },
    { 
      label: 'Excluir Entidade', 
      icon: 'po-icon-delete', 
      type: 'danger', 
      visible: (row: any) => row.type === 'USUARIO',
      action: (row: any) => this.deleteEntity(row) 
    }
  ];

  ngOnInit() {
    this.loadEntities();
  }

  loadEntities() {
    this.http.get(`${this.coreService.apiUrl}/metadata/entities`).subscribe({
      next: (res: any) => this.entities = res,
      error: () => console.error('Falha ao listar entidades')
    });
  }

  editMetadata(row: any) {
    this.router.navigate([`/admin/metadata-editor/edit/${row.name}`]);
  }

  viewMetadata(row: any) {
    // Implementar preview se necessário
  }

  createNewEntity() {
    this.router.navigate(['/admin/metadata-editor/new']);
  }

  deleteEntity(row: any) {
    // Implementar exclusão
  }
}
