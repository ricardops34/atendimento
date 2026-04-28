import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      *ngIf="loaded"
      [p-title]="title"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class TenantsComponent implements OnInit {
  private coreService = inject(CoreService);
  private http = inject(HttpClient);
  
  readonly serviceApi = `${this.coreService.apiUrl}/tenants`;
  
  title: string = 'Carregando...';
  fields: Array<PoPageDynamicTableField> = [];
  loaded: boolean = false;

  ngOnInit() {
    this.loadMetadata();
  }

  loadMetadata() {
    // Agora não escrevemos campos aqui! 
    // Buscamos no banco a "vontade" do cliente ou o padrão do sistema.
    this.http.get(`${this.coreService.apiUrl}/metadata/tenants`).subscribe({
      next: (meta: any) => {
        this.title = meta.title || 'Empresas';
        this.fields = meta.fields;
        this.loaded = true;
      },
      error: () => {
        console.error('Falha ao carregar metadados de Empresas');
      }
    });
  }
}
