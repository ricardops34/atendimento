import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PoButtonModule,
  PoDisclaimer,
  PoDisclaimerGroup,
  PoFieldModule,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
  PoPageModule,
  PoSearchModule,
  PoTableAction,
  PoTableColumn,
  PoTableColumnSort,
  PoTableModule,
} from '@po-ui/ng-components';
import { EmpresaAdminSearchParams, EmpresaAdminService } from '../../../core/services/empresa-admin.service';

@Component({
  selector: 'app-empresas-admin-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    PoPageModule, PoTableModule, PoButtonModule,
    PoModalModule, PoFieldModule, PoSearchModule,
  ],
  templateUrl: './empresas.page.html',
})
export class EmpresasAdminPage implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private empresaService = inject(EmpresaAdminService);
  private poNotification = inject(PoNotificationService);
  readonly router = inject(Router);

  empresas: any[] = [];
  loading = false;
  loadingShowMore = false;
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  sortProperty = 'name';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { name?: string; slug?: string } = {};

  columns: PoTableColumn[] = [
    { property: 'name',        label: 'Nome Fantasia', sortable: true },
    { property: 'slug',        label: 'Slug',          sortable: true },
    { property: 'razaoSocial', label: 'Razão Social',  sortable: true },
    { property: 'cnpj',        label: 'CNPJ',          sortable: false },
    { property: 'email',       label: 'E-mail',        sortable: true },
    { property: 'telefone',    label: 'Telefone',      sortable: false },
  ];

  actions: PoTableAction[] = [
    { label: 'Editar',  icon: 'an an-pencil-simple', action: (r: any) => this.router.navigate(['/configuracoes/empresas', r.id, 'editar']) },
  ];

  disclaimerGroup: PoDisclaimerGroup = {
    title: 'Filtros aplicados',
    disclaimers: [],
    remove:    (d: PoDisclaimer) => this.removeDisclaimer(d),
    removeAll: () => this.clearFilters(),
  };

  ngOnInit() {
    this.loadData(true);
  }

  loadData(reset = false) {
    if (reset) { this.page = 1; this.empresas = []; }
    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);

    this.empresaService.search(this.buildParams()).subscribe({
      next: (result) => {
        this.empresas  = this.page === 1 ? result.items : [...this.empresas, ...result.items];
        this.total     = result.total;
        this.hasNext   = result.hasNext;
        this.syncDisclaimers();
        this.loading = this.loadingShowMore = false;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar empresas.');
        this.loading = this.loadingShowMore = false;
      },
    });
  }

  onShowMore() { if (!this.hasNext || this.loadingShowMore) return; this.page++; this.loadData(); }

  onQuickSearch(value: string) { this.quickSearch = value?.trim() || ''; this.loadData(true); }

  onSortChange(sort: PoTableColumnSort) {
    this.sortProperty  = sort.column?.property || 'name';
    this.sortDirection = sort.type === 'descending' ? 'descending' : 'ascending';
    this.loadData(true);
  }

  openFilters()  { this.advancedFilterModal.open(); }
  applyFilters() { this.advancedFilterModal.close(); this.loadData(true); }

  clearFilters() {
    this.quickSearch = '';
    this.filters = {};
    this.syncDisclaimers();
    this.loadData(true);
  }

  removeDisclaimer(d: PoDisclaimer) {
    const p = d.property as keyof typeof this.filters | 'search';
    if (p === 'search') this.quickSearch = '';
    else this.filters[p] = undefined;
    this.syncDisclaimers();
    this.loadData(true);
  }

  private buildParams(): EmpresaAdminSearchParams {
    return {
      page:          this.page,
      pageSize:      this.pageSize,
      search:        this.quickSearch || undefined,
      name:          this.filters.name,
      slug:          this.filters.slug,
      sortProperty:  this.sortProperty,
      sortDirection: this.sortDirection,
    };
  }

  private syncDisclaimers() {
    const d: PoDisclaimer[] = [];
    if (this.quickSearch)  d.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    if (this.filters.name) d.push({ property: 'name',   label: 'Nome',  value: this.filters.name });
    if (this.filters.slug) d.push({ property: 'slug',   label: 'Slug',  value: this.filters.slug });
    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers: d };
  }
}
