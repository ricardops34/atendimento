import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
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
import { EmpresaService } from '../../../core/services/empresa.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contratos-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './contratos.page.html',
})
export class ContratosPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private contratoService = inject(ContratoService);
  private empresaService = inject(EmpresaService);
  private poNotification = inject(PoNotificationService);

  contratos: any[] = [];
  empresas: PoComboOption[] = [];
  loading = false;
  loadingShowMore = false;
  saving = false;
  isEdit = false;
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  sortProperty = 'descricao';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { descricao?: string; empresaId?: number; isFeriado?: string } = {};
  readonly feriadoOptions: PoComboOption[] = [
    { label: 'Sim', value: 'true' },
    { label: 'Nao', value: 'false' },
  ];
  formData: any = {
    empresaId: null,
    descricao: '',
    cor: '#333333',
    isFeriado: false,
  };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'descricao', label: 'Contrato', sortable: true },
    { property: 'empresa.nome', label: 'Empresa', sortable: true },
    { property: 'cor', label: 'Cor', sortable: true },
    { property: 'isFeriadoLabel', label: 'Feriado', sortable: true },
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
    this.loadDependencies();
    this.loadData(true);
  }

  loadDependencies() {
    this.empresaService.findAll().subscribe({
      next: (data) => {
        this.empresas = (data || []).map((empresa) => ({ label: empresa.nome, value: empresa.id }));
      },
      error: () => {
        this.empresas = [];
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
        const items = result.items.map((item) => ({
          ...item,
          isFeriadoLabel: item.isFeriado ? 'Sim' : 'Nao',
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

  openCreate() {
    this.isEdit = false;
    this.formData = {
      empresaId: this.empresas[0]?.value ?? null,
      descricao: '',
      cor: '#333333',
      isFeriado: false,
    };
    this.modal.open();
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.formData = {
      id: row.id,
      empresaId: row.empresaId,
      descricao: row.descricao,
      cor: row.cor || '#333333',
      isFeriado: !!row.isFeriado,
    };
    this.modal.open();
  }

  save() {
    if (!this.formData.empresaId || !this.formData.descricao?.trim()) {
      this.poNotification.warning('Preencha empresa e descricao.');
      return;
    }

    this.saving = true;
    const payload = {
      empresaId: Number(this.formData.empresaId),
      descricao: this.formData.descricao.trim(),
      cor: this.formData.cor || '#333333',
      isFeriado: !!this.formData.isFeriado,
    };

    const request$ = this.isEdit
      ? this.contratoService.update(this.formData.id, payload)
      : this.contratoService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Contrato atualizado com sucesso.' : 'Contrato criado com sucesso.');
        this.saving = false;
        this.loadData(true);
        this.modal.close();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar contrato.');
        this.saving = false;
      },
    });
  }

  remove(row: any) {
    this.contratoService.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Contrato excluido com sucesso.');
        this.loadData(true);
      },
      error: () => {
        this.poNotification.error('Erro ao excluir contrato.');
      },
    });
  }

  private buildSearchParams(): ContratoSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      descricao: this.filters.descricao,
      empresaId: this.filters.empresaId,
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
    if (this.filters.empresaId) {
      disclaimers.push({
        property: 'empresaId',
        label: 'Empresa',
        value: this.empresas.find((item) => item.value === this.filters.empresaId)?.label || this.filters.empresaId,
      });
    }
    if (this.filters.isFeriado !== undefined) {
      disclaimers.push({
        property: 'isFeriado',
        label: 'Feriado',
        value: this.filters.isFeriado === 'true' ? 'Sim' : 'Nao',
      });
    }

    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }
}
