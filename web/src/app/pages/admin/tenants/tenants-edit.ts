import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicEditModule, PoPageDynamicEditField } from '@po-ui/ng-templates';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-tenants-edit',
  standalone: true,
  imports: [CommonModule, PoPageDynamicEditModule],
  template: `
    <po-page-dynamic-edit
      *ngIf="loaded"
      [p-title]="title"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
    >
    </po-page-dynamic-edit>
  `
})
export class TenantsEditComponent implements OnInit {
  private coreService = inject(CoreService);
  private http = inject(HttpClient);
  
  readonly serviceApi = `${this.coreService.apiUrl}/tenants`;
  
  title: string = 'Carregando...';
  fields: Array<PoPageDynamicEditField> = [];
  loaded: boolean = false;

  ngOnInit() {
    this.loadMetadata();
  }

  loadMetadata() {
    this.http.get(`${this.coreService.apiUrl}/metadata/tenants`).subscribe({
      next: (meta: any) => {
        this.title = meta.title || 'Empresa';
        this.fields = meta.fields;
        this.loaded = true;
      },
      error: () => {
        console.error('Falha ao carregar metadados de Edição');
      }
    });
  }
}
