import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { EmpresaSearchParams, EmpresaService } from '../../../core/services/empresa.service';

@Component({
  selector: 'app-empresas-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './empresas.page.html',
})
export class EmpresasPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private empresaService = inject(EmpresaService);
  private poNotification = inject(PoNotificationService);

  empresas: any[] = [];
  loading = false;
  loadingShowMore = false;
  saving = false;
  isEdit = false;
  formData: any = { nome: '' };
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  sortProperty = 'nome';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { id?: number; nome?: string } = {};

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'nome', label: 'Empresa', sortable: true },
  ];

  disclaimerGroup: PoDisclaimerGroup = {
    title: 'Filtros aplicados',
    disclaimers: [],
    remove: (disclaimer: PoDisclaimer) => this.removeDisclaimer(disclaimer),
    removeAll: () => this.clearFilters(),
  };

  actions: PoTableAction[] = [
    { label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.openEdit(row) },
    { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.remove(row) },
  ];

  ngOnInit() {
    this.loadData(true);
  }

  loadData(reset = false) {
    if (reset) {
      this.page = 1;
      this.empresas = [];
    }

    if (this.page === 1) {
      this.loading = true;
    } else {
      this.loadingShowMore = true;
    }

    this.empresaService.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        this.empresas = this.page === 1 ? result.items : [...this.empresas, ...result.items];
        this.total = result.total;
        this.hasNext = result.hasNext;
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => {
        this.empresas = [];
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
    this.sortProperty = sort.column?.property || 'nome';
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

  openCreate() {
    this.isEdit = false;
    this.formData = { nome: '' };
    this.modal.open();
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.formData = { id: row.id, nome: row.nome };
    this.modal.open();
  }

  save() {
    if (!this.formData.nome?.trim()) {
      this.poNotification.warning('Informe o nome da empresa.');
      return;
    }

    this.saving = true;
    const payload = { nome: this.formData.nome.trim() };
    const request$ = this.isEdit
      ? this.empresaService.update(this.formData.id, payload)
      : this.empresaService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Empresa atualizada com sucesso.' : 'Empresa criada com sucesso.');
        this.saving = false;
        this.loadData(true);
        this.modal.close();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar empresa.');
        this.saving = false;
      },
    });
  }

  remove(row: any) {
    this.empresaService.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Empresa excluida com sucesso.');
        this.loadData(true);
      },
      error: () => {
        this.poNotification.error('Erro ao excluir empresa.');
      },
    });
  }

  private buildSearchParams(): EmpresaSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      id: this.filters.id,
      nome: this.filters.nome,
      sortProperty: this.sortProperty,
      sortDirection: this.sortDirection,
    };
  }

  private syncDisclaimers() {
    const disclaimers: PoDisclaimer[] = [];

    if (this.quickSearch) {
      disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    }
    if (this.filters.id) {
      disclaimers.push({ property: 'id', label: 'ID', value: this.filters.id });
    }
    if (this.filters.nome) {
      disclaimers.push({ property: 'nome', label: 'Empresa', value: this.filters.nome });
    }

    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }
}
