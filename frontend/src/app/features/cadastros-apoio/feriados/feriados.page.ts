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
import { FeriadoSearchParams, FeriadoService } from '../../../core/services/feriado.service';

@Component({
  selector: 'app-feriados-page',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PoPageModule, 
    PoTableModule, 
    PoButtonModule, 
    PoModalModule, 
    PoFieldModule, 
    PoSearchModule
  ],
  templateUrl: './feriados.page.html',
})
export class FeriadosPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private feriadoService = inject(FeriadoService);
  private poNotification = inject(PoNotificationService);

  feriados: any[] = [];
  loading = false;
  loadingShowMore = false;
  saving = false;
  isEdit = false;
  
  formData: any = { 
    data: '', 
    descricao: '', 
    tipo: 'N', 
    fixo: true,
    municipio: '' 
  };
  
  tiposOptions = [
    { label: 'Nacional', value: 'N' },
    { label: 'Estadual', value: 'E' },
    { label: 'Municipal', value: 'M' },
    { label: 'Customizado', value: 'C' }
  ];

  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  sortProperty = 'data';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { id?: number; descricao?: string } = {};

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true, width: '70px' },
    { property: 'data', label: 'Data', type: 'date', sortable: true, width: '120px' },
    { property: 'descricao', label: 'Descrição', sortable: true },
    { property: 'tipo', label: 'Tipo', type: 'label', width: '120px', labels: [
      { value: 'N', color: 'color-10', label: 'Nacional' },
      { value: 'E', color: 'color-08', label: 'Estadual' },
      { value: 'M', color: 'color-07', label: 'Municipal' },
      { value: 'C', color: 'color-03', label: 'Custom' },
    ]},
    { property: 'fixo', label: 'Fixo', type: 'boolean', width: '80px' },
    { property: 'municipio', label: 'Município', sortable: false },
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
      this.feriados = [];
    }

    if (this.page === 1) {
      this.loading = true;
    } else {
      this.loadingShowMore = true;
    }

    this.feriadoService.search(this.buildSearchParams()).subscribe({
      next: (result: any) => {
        this.feriados = this.page === 1 ? result.items : [...this.feriados, ...result.items];
        this.total = result.total;
        this.hasNext = result.hasNext;
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => {
        this.feriados = [];
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
    this.sortProperty = sort.column?.property || 'data';
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
      data: '', 
      descricao: '', 
      tipo: 'N', 
      fixo: true,
      municipio: '' 
    };
    this.modal.open();
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.formData = {
      id: row.id,
      data: row.data ? row.data.split('T')[0] : '', // Extract YYYY-MM-DD
      descricao: row.descricao || '',
      tipo: row.tipo || 'N',
      fixo: row.fixo !== undefined ? row.fixo : true,
      municipio: row.municipio || '',
    };
    this.modal.open();
  }

  save() {
    if (!this.formData.data || !this.formData.descricao?.trim()) {
      this.poNotification.warning('Informe a data e a descrição do feriado.');
      return;
    }

    if (this.formData.tipo === 'M' && !this.formData.municipio?.trim()) {
      this.poNotification.warning('Informe o município para o feriado municipal.');
      return;
    }

    this.saving = true;
    const payload: any = { 
      data: this.formData.data,
      descricao: this.formData.descricao.trim(),
      tipo: this.formData.tipo,
      fixo: this.formData.fixo,
    };
    
    if (this.formData.tipo === 'M') {
      payload.municipio = this.formData.municipio.trim();
    }

    const request$ = this.isEdit
      ? this.feriadoService.update(this.formData.id, payload)
      : this.feriadoService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Feriado atualizado com sucesso.' : 'Feriado criado com sucesso.');
        this.saving = false;
        this.loadData(true);
        this.modal.close();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar feriado.');
        this.saving = false;
      },
    });
  }

  remove(row: any) {
    this.feriadoService.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Feriado excluído com sucesso.');
        this.loadData(true);
      },
      error: () => {
        this.poNotification.error('Erro ao excluir feriado.');
      },
    });
  }

  private buildSearchParams(): FeriadoSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      id: this.filters.id,
      descricao: this.filters.descricao,
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
    if (this.filters.descricao) {
      disclaimers.push({ property: 'descricao', label: 'Feriado', value: this.filters.descricao });
    }

    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }
}
