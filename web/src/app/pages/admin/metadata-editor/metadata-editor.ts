import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PoModule,
  PoNotificationService,
  PoTableColumn
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-metadata-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule],
  template: `
    <po-page-default [p-title]="'Configurando: ' + entity">
      
      <div class="po-row">
        <po-info class="po-md-12" p-label="Gestão de Campos e Ordem de Exibição" 
          p-value="Gerencie as propriedades da entidade">
        </po-info>
      </div>

      <div class="po-row po-mt-1">
        <po-table
          class="po-md-12"
          [p-columns]="columns"
          [p-items]="fields"
          p-container="shadow">
        </po-table>
      </div>

      <div class="po-row po-mt-2">
        <po-button
          class="po-md-3"
          p-label="Salvar"
          p-kind="primary"
          p-icon="po-icon-ok"
          [p-loading]="loading"
          (p-click)="saveMetadata()">
        </po-button>

        <po-button
          class="po-md-2"
          p-label="Voltar"
          (p-click)="goBack()">
        </po-button>
      </div>

    </po-page-default>
  `
})
export class MetadataEditorComponent implements OnInit {
  private http = inject(HttpClient);
  private coreService = inject(CoreService);
  private poNotification = inject(PoNotificationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  entity: string = '';
  loading: boolean = false;
  fields: Array<any> = [];

  columns: Array<PoTableColumn> = [
    { property: 'order', label: 'Pos', width: '3%' },
    { property: 'label', label: 'Rótulo (Tela)', width: '20%' },
    { property: 'property', label: 'Campo (API)', width: '15%' },
    { property: 'type', label: 'Tipo', width: '10%' },
    { property: 'visible', label: 'Visível', type: 'boolean', width: '5%' },
    { property: 'required', label: 'Obrigatório', type: 'boolean', width: '5%' },

    // Colunas de Ação
    { property: 'up', label: ' ', type: 'icon', icon: 'an an-caret-circle-up', action: (row: any) => this.moveUp(row), color: 'color-08', tooltip: 'Subir' },
    { property: 'down', label: ' ', type: 'icon', icon: 'an an-caret-circle-down', action: (row: any) => this.moveDown(row), color: 'color-08', tooltip: 'Descer' },
    { property: 'edit', label: ' ', type: 'icon', icon: 'an an-pencil-simple', action: (row: any) => this.editField(row), color: 'color-07', tooltip: 'Editar Campo' },
    { property: 'delete', label: ' ', type: 'icon', icon: 'an an-trash', action: (row: any) => this.removeField(row), color: 'color-01', tooltip: 'Remover' }
  ];

  ngOnInit() {
    this.entity = this.route.snapshot.params['entity'];
    if (this.entity) {
      this.loadMetadata();
    }
  }

  loadMetadata() {
    this.loading = true;
    this.http.get(`${this.coreService.apiUrl}/metadata/${this.entity}`).subscribe({
      next: (res: any) => {
        this.fields = res.fields || [];
        this.loading = false;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar metadados');
        this.loading = false;
      }
    });
  }

  moveUp(row: any) {
    const index = this.fields.indexOf(row);
    if (index > 0) {
      [this.fields[index], this.fields[index - 1]] = [this.fields[index - 1], this.fields[index]];
      this.reorderFields();
    }
  }

  moveDown(row: any) {
    const index = this.fields.indexOf(row);
    if (index < this.fields.length - 1) {
      [this.fields[index], this.fields[index + 1]] = [this.fields[index + 1], this.fields[index]];
      this.reorderFields();
    }
  }

  reorderFields() {
    this.fields = this.fields.map((f, i) => ({ ...f, order: i }));
  }

  saveMetadata() {
    this.loading = true;
    this.http.post(`${this.coreService.apiUrl}/metadata/${this.entity}`, { fields: this.fields }).subscribe({
      next: () => {
        this.poNotification.success('Arquitetura salva com sucesso!');
        this.loading = false;
      },
      error: () => {
        this.poNotification.error('Erro ao salvar metadados');
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/metadata-editor']);
  }

  editField(row: any) { }
  removeField(row: any) { }
}
