import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PoModule, 
  PoTableColumn, 
  PoPageAction 
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';

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
    { label: 'Nova Entidade (Usuário)', action: () => this.createNewEntity(), icon: 'an an-plus' }
  ];

  columns: Array<PoTableColumn> = [
    { property: 'label', label: 'Nome da Entidade' },
    { property: 'name', label: 'Slug / API' },
    { 
      property: 'type', 
      label: 'Tipo', 
      type: 'label',
      labels: [
        { value: 'SISTEMA', label: 'Sistema', color: 'color-07' },
        { value: 'USUARIO', label: 'Usuário', color: 'color-10' }
      ]
    },
    // Colunas de Ação com Ícones
    { property: 'view', label: ' ', type: 'icon', icon: 'an an-list', action: (row: any) => this.viewMetadata(row), color: 'color-08', tooltip: 'Visualizar' },
    { property: 'edit', label: ' ', type: 'icon', icon: 'an an-pencil-simple', action: (row: any) => this.editMetadata(row), color: 'color-07', tooltip: 'Editar Arquitetura' },
    { 
      property: 'delete', 
      label: ' ', 
      type: 'icon', 
      icon: 'an an-trash', 
      action: (row: any) => this.deleteEntity(row), 
      color: 'color-01', 
      tooltip: 'Excluir',
      disabled: (row: any) => row.type === 'SISTEMA' 
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

  viewMetadata(row: any) { }
  createNewEntity() { }
  deleteEntity(row: any) { }
}
