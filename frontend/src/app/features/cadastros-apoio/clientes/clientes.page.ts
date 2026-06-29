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
import { ClienteSearchParams, ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    PoPageModule, PoTableModule, PoButtonModule,
    PoModalModule, PoFieldModule, PoSearchModule,
  ],
  templateUrl: './clientes.page.html',
})
export class ClientesPage implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private clienteService = inject(ClienteService);
  private poNotification = inject(PoNotificationService);
  readonly router = inject(Router);

  clientes: any[] = [];
  loading = false;
  loadingShowMore = false;
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  sortProperty = 'nome';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { nome?: string; tipoPessoa?: string; municipio?: string } = {};

  readonly tipoPessoaOptions = [
    { label: 'Pessoa Jurídica', value: 'PJ' },
    { label: 'Pessoa Física',   value: 'PF' },
  ];

  columns: PoTableColumn[] = [
    { property: 'tipoPessoa', label: 'Tipo',      width: '80px', sortable: true },
    { property: 'nome',       label: 'Nome',       sortable: true },
    { property: 'cnpj',       label: 'CNPJ',       sortable: false },
    { property: 'cpf',        label: 'CPF',        sortable: false },
    { property: 'email',      label: 'E-mail',     sortable: true },
    { property: 'telefone',   label: 'Telefone',   sortable: false },
    { property: 'municipio',  label: 'Município',  sortable: true },
    { property: 'uf',         label: 'UF',         width: '60px', sortable: true },
  ];

  actions: PoTableAction[] = [
    { label: 'Visualizar', icon: 'an an-eye',           action: (r: any) => this.router.navigate(['/clientes', r.id]) },
    { label: 'Editar',     icon: 'an an-pencil-simple', action: (r: any) => this.router.navigate(['/clientes', r.id, 'editar']) },
    { label: 'Excluir',    icon: 'an an-trash',         action: (r: any) => this.router.navigate(['/clientes', r.id, 'excluir']) },
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
    if (reset) { this.page = 1; this.clientes = []; }
    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);

    this.clienteService.search(this.buildParams()).subscribe({
      next: (result) => {
        this.clientes  = this.page === 1 ? result.items : [...this.clientes, ...result.items];
        this.total     = result.total;
        this.hasNext   = result.hasNext;
        this.syncDisclaimers();
        this.loading = this.loadingShowMore = false;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar clientes.');
        this.loading = this.loadingShowMore = false;
      },
    });
  }

  onShowMore() { if (!this.hasNext || this.loadingShowMore) return; this.page++; this.loadData(); }

  onQuickSearch(value: string) { this.quickSearch = value?.trim() || ''; this.loadData(true); }

  onSortChange(sort: PoTableColumnSort) {
    this.sortProperty  = sort.column?.property || 'nome';
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

  private buildParams(): ClienteSearchParams {
    return {
      page:          this.page,
      pageSize:      this.pageSize,
      search:        this.quickSearch || undefined,
      nome:          this.filters.nome,
      tipoPessoa:    this.filters.tipoPessoa,
      municipio:     this.filters.municipio,
      sortProperty:  this.sortProperty,
      sortDirection: this.sortDirection,
    };
  }

  private syncDisclaimers() {
    const d: PoDisclaimer[] = [];
    if (this.quickSearch)        d.push({ property: 'search',     label: 'Busca',     value: this.quickSearch });
    if (this.filters.nome)       d.push({ property: 'nome',       label: 'Nome',      value: this.filters.nome });
    if (this.filters.tipoPessoa) d.push({ property: 'tipoPessoa', label: 'Tipo',      value: this.filters.tipoPessoa });
    if (this.filters.municipio)  d.push({ property: 'municipio',  label: 'Município', value: this.filters.municipio });
    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers: d };
  }
}
