import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PoPageDynamicTableModule, 
  PoPageDynamicTableField, 
  PoPageDynamicTableActions 
} from '@po-ui/ng-templates';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      *ngIf="loaded"
      [p-title]="title"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class RolesComponent implements OnInit {
  private coreService = inject(CoreService);
  private http = inject(HttpClient);
  
  readonly serviceApi = `${this.coreService.apiUrl}/roles`;
  
  readonly actions: PoPageDynamicTableActions = {
    new: '/admin/roles/new',
    edit: '/admin/roles/edit/:id',
    remove: true,
    removeAll: true
  };

  title: string = 'Carregando...';
  fields: Array<PoPageDynamicTableField> = [];
  loaded: boolean = false;

  ngOnInit() {
    this.loadMetadata();
  }

  loadMetadata() {
    this.http.get(`${this.coreService.apiUrl}/metadata/roles`).subscribe({
      next: (meta: any) => {
        this.title = meta.title || 'Perfis de Acesso';
        this.fields = meta.fields;
        this.loaded = true;
      },
      error: () => {
        console.error('Falha ao carregar metadados de Perfis');
      }
    });
  }
}
