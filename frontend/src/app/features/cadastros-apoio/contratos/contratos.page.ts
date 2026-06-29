import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoButtonModule,
  PoComboOption,
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
import { ContratoSearchParams, ContratoService } from '../../../core/services/contrato.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { FormsModule } from '@angular/forms';

const TIPO_OPTIONS: PoComboOption[] = [
  { label: 'Fixo', value: 'F' },
  { label: 'Hora', value: 'H' },
];

@Component({
  selector: 'app-contratos-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './contratos.page.html',
})
export class ContratosPage implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private contratoService = inject(ContratoService);
  private empresaService = inject(ClienteService);
  private poNotification = inject(PoNotificationService);
  readonly router = inject(Router);

  contratos: any[] = [];
  clientes: PoComboOption[] = [];
  loading = false;
  loadingShowMore = false;
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  sortProperty = 'descricao';
  sortDirection: 'ascending' | 'descending' = 'ascending';

  readonly tipoOptions = TIPO_OPTIONS;

  filters: { descricao?: string; clienteId?: number; tipo?: string; dtInicio?: string; dtFim?: string; isFeriado?: string } = {};

  columns: PoTableColumn[] = [
    { property: 'cliente.nome', label: 'Cliente', sortable: true },
    { property: 'descricao', label: 'Descrição', sortable: true },
    { property: 'tipo', label: 'Tipo', sortable: true, width: '80px' },
    { property: 'dtInicioFmt', label: 'Início', sortable: false, width: '110px' },
    { property: 'dtFimFmt', label: 'Fim', sortable: false, width: '110px' },
  ];

  disclaimerGroup: PoDisclaimerGroup = {
    title: 'Filtros aplicados',
    disclaimers: [],
    remove: (disclaimer: PoDisclaimer) => this.removeDisclaimer(disclaimer),
    removeAll: () => this.clearFilters(),
  };

  actions: PoTableAction[] = [
    { label: 'Visualizar', icon: 'po-icon-eye', action: (row: any) => this.navigateTo(['/contratos', row.id]) },
    { label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.navigateTo(['/contratos', row.id, 'editar']) },
    { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.navigateTo(['/contratos', row.id, 'excluir']) },
  ];

  ngOnInit() {
    this.loadDependencies();
    this.loadData(true);
  }

  loadDependencies() {
    this.empresaService.findAll().subscribe({
      next: (data) => {
        this.clientes = (data || []).map((e: any) => ({ label: e.nome, value: e.id }));
      },
    });
  }

  loadData(reset = false) {
    if (reset) {
      this.page = 1;
      this.contratos = [];
    }

    if (this.page === 1) {
      this.loading = true;
    } else {
      this.loadingShowMore = true;
    }

    this.contratoService.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        const items = result.items.map((item: any) => ({
          ...item,
          dtInicioFmt: item.dtInicio ? new Date(item.dtInicio).toLocaleDateString('pt-BR') : '',
          dtFimFmt: item.dtFim ? new Date(item.dtFim).toLocaleDateString('pt-BR') : '',
        }));
        this.contratos = this.page === 1 ? items : [...this.contratos, ...items];
        this.total = result.total;
        this.hasNext = result.hasNext;
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => {
        this.contratos = [];
        this.loading = false;
        this.loadingShowMore = false;
      },
    });
  }

  onShowMore() {
    if (!this.hasNext || this.loadingShowMore) return;
    this.page += 1;
    this.loadData();
  }

  onQuickSearch(value: string) {
    this.quickSearch = value?.trim() || '';
    this.loadData(true);
  }

  onSortChange(sort: PoTableColumnSort) {
    this.sortProperty = sort.column?.property || 'descricao';
    this.sortDirection = sort.type === 'descending' ? 'descending' : 'ascending';
    this.loadData(true);
  }

  openAdvancedFilters() {
    this.advancedFilterModal.open();
  }

  applyAdvancedFilters() {
    this.advancedFilterModal.close();
    this.loadData(true);
  }

  clearFilters() {
    this.quickSearch = '';
    this.filters = {};
    this.syncDisclaimers();
    this.loadData(true);
  }

  removeDisclaimer(disclaimer: PoDisclaimer) {
    const property = disclaimer.property as keyof typeof this.filters | 'search';
    if (property === 'search') {
      this.quickSearch = '';
    } else {
      this.filters[property] = undefined;
    }
    this.syncDisclaimers();
    this.loadData(true);
  }

  navigateTo(commands: any[]) {
    this.router.navigate(commands);
  }

  private buildSearchParams(): ContratoSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      descricao: this.filters.descricao,
      clienteId: this.filters.clienteId,
      tipo: this.filters.tipo,
      dtInicio: this.filters.dtInicio,
      dtFim: this.filters.dtFim,
      isFeriado: this.filters.isFeriado === undefined ? undefined : this.filters.isFeriado === 'true',
      sortProperty: this.sortProperty,
      sortDirection: this.sortDirection,
    };
  }

  private syncDisclaimers() {
    const disclaimers: PoDisclaimer[] = [];

    if (this.quickSearch) {
      disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    }
    if (this.filters.descricao) {
      disclaimers.push({ property: 'descricao', label: 'Contrato', value: this.filters.descricao });
    }
    if (this.filters.clienteId) {
      disclaimers.push({
        property: 'clienteId',
        label: 'Empresa',
        value: this.clientes.find((e) => e.value === this.filters.clienteId)?.label || this.filters.clienteId,
      });
    }
    if (this.filters.tipo) {
      disclaimers.push({ property: 'tipo', label: 'Tipo', value: this.filters.tipo === 'F' ? 'Fixo' : 'Hora' });
    }
    if (this.filters.dtInicio) {
      disclaimers.push({ property: 'dtInicio', label: 'Data Início', value: this.filters.dtInicio });
    }
    if (this.filters.dtFim) {
      disclaimers.push({ property: 'dtFim', label: 'Data Fim', value: this.filters.dtFim });
    }

    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }
}
