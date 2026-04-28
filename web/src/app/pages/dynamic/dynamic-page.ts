import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PoPageDynamicTableModule, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-dynamic-page',
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
export class DynamicPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private coreService = inject(CoreService);

  entity: string = '';
  title: string = 'Carregando...';
  serviceApi: string = '';
  fields: Array<PoPageDynamicTableField> = [];
  loaded: boolean = false;

  ngOnInit() {
    // 1. Pega o nome da entidade da URL (ex: /app/dynamic/products)
    this.route.params.subscribe(params => {
      this.entity = params['entity'];
      this.loadMetadata();
    });
  }

  loadMetadata() {
    this.loaded = false;
    // 2. Busca no Backend como essa tela deve ser montada
    this.http.get(`${this.coreService.apiUrl}/metadata/${this.entity}`).subscribe({
      next: (meta: any) => {
        this.title = meta.title || this.entity.toUpperCase();
        this.fields = meta.fields;
        this.serviceApi = `${this.coreService.apiUrl}/dynamic/${this.entity}`;
        this.loaded = true;
      },
      error: () => {
        this.title = 'Erro ao carregar metadados';
      }
    });
  }
}
