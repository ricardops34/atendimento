import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  PoModule, 
  PoNotificationService, 
  PoTableColumn,
  PoSelectOption
} from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-metadata-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, PoModule],
  template: `
    <po-page-default p-title="Editor de Metadados e Segurança">
      
      <div class="po-row">
        <po-select
          name="entity"
          class="po-md-6"
          p-label="Selecione a Entidade para Configurar"
          [p-options]="entityOptions"
          [(ngModel)]="selectedEntity"
          (p-change)="loadMetadata()">
        </po-select>
      </div>

      <div class="po-row" *ngIf="selectedEntity">
        <po-table
          class="po-md-12"
          [p-columns]="columns"
          [p-items]="fields"
          p-hide-columns-manager>
        </po-table>
      </div>

      <div class="po-row po-mt-2" *ngIf="selectedEntity">
        <po-button
          p-label="Salvar Configuração e Níveis"
          p-kind="primary"
          [p-loading]="loading"
          (p-click)="saveMetadata()">
        </po-button>
      </div>

    </po-page-default>
  `
})
export class MetadataEditorComponent implements OnInit {
  private http = inject(HttpClient);
  private coreService = inject(CoreService);
  private poNotification = inject(PoNotificationService);

  loading: boolean = false;
  selectedEntity: string = '';
  fields: Array<any> = [];

  entityOptions: Array<PoSelectOption> = [
    { label: 'Empresas (Tenants)', value: 'tenants' },
    { label: 'Usuários', value: 'users' },
    { label: 'Planos', value: 'plans' },
    { label: 'Veículos (Dinâmico)', value: 'veiculos' }
  ];

  columns: Array<PoTableColumn> = [
    { property: 'property', label: 'Campo' },
    { property: 'label', label: 'Rótulo' },
    { property: 'minLevel', label: 'Nível Mínimo (1-9)', type: 'number' },
    { property: 'gridColumns', label: 'Largura', type: 'number' },
    { property: 'required', label: 'Obrigatório', type: 'boolean' },
    { property: 'defaultValue', label: 'Valor Padrão' },
    { property: 'visible', label: 'Visível', type: 'boolean' }
  ];

  ngOnInit() {}

  loadMetadata() {
    this.loading = true;
    this.http.get(`${this.coreService.apiUrl}/metadata/${this.selectedEntity}`).subscribe({
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

  saveMetadata() {
    this.loading = true;
    const payload = { fields: this.fields };
    
    this.http.post(`${this.coreService.apiUrl}/metadata/${this.selectedEntity}`, payload).subscribe({
      next: () => {
        this.poNotification.success('Segurança de campos salva com sucesso!');
        this.loading = false;
      },
      error: () => {
        this.poNotification.error('Erro ao salvar metadados');
        this.loading = false;
      }
    });
  }
}
