import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoDialogService, PoButtonModule,
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
  PoTableModule, } from '@po-ui/ng-components';
import { EstadoService } from '../../../core/services/estado.service';

@Component({
  selector: 'app-estados-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './estados.page.html',
})
export class EstadosPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  private service = inject(EstadoService);
  private poDialog = inject(PoDialogService);
  private poNotification = inject(PoNotificationService);

  items: any[] = [];
  loading = false;
  loadingShowMore = false;
  saving = false;
  isEdit = false;
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  sortProperty = 'nome';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { nome?: string; sigla?: string } = {};
  formData: any = { id: '', nome: '', sigla: '' };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'Cód. IBGE', sortable: true },
    { property: 'nome', label: 'Estado', sortable: true },
    { property: 'sigla', label: 'Sigla', sortable: true },
  ];

  disclaimerGroup: PoDisclaimerGroup = {
    title: 'Filtros aplicados',
    disclaimers: [],
    remove: (d: PoDisclaimer) => this.removeDisclaimer(d),
    removeAll: () => this.clearFilters(),
  };

  actions: PoTableAction[] = [
    { label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.openEdit(row) },
    { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.remove(row) },
  ];

  ngOnInit() { this.loadData(true); }

  loadData(reset = false) {
    if (reset) { this.page = 1; this.items = []; }
    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);
    this.service.getEstados(this.buildSearchParams()).subscribe({
      next: (result) => {
        this.items = this.page === 1 ? result.items : [...this.items, ...result.items];
        this.hasNext = result.hasNext;
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => { this.loading = false; this.loadingShowMore = false; this.items = []; },
    });
  }

  onShowMore() { if (!this.hasNext || this.loadingShowMore) return; this.page += 1; this.loadData(); }
  onQuickSearch(value: string) { this.quickSearch = value?.trim() || ''; this.loadData(true); }
  onSortChange(sort: PoTableColumnSort) { this.sortProperty = sort.column?.property || 'nome'; this.sortDirection = sort.type === 'descending' ? 'descending' : 'ascending'; this.loadData(true); }
  openAdvancedFilters() { this.advancedFilterModal.open(); }
  applyAdvancedFilters() { this.advancedFilterModal.close(); this.loadData(true); }
  clearFilters() { this.quickSearch = ''; this.filters = {}; this.syncDisclaimers(); this.loadData(true); }
  removeDisclaimer(disclaimer: PoDisclaimer) { const property = disclaimer.property as keyof typeof this.filters | 'search'; if (property === 'search') this.quickSearch = ''; else this.filters[property] = undefined; this.syncDisclaimers(); this.loadData(true); }
  openCreate() { this.isEdit = false; this.formData = { id: '', nome: '', sigla: '' }; this.modal.open(); }
  openEdit(row: any) { this.isEdit = true; this.formData = { id: row.id, nome: row.nome, sigla: row.sigla }; this.modal.open(); }

  save() {
    if (!this.formData.nome?.trim() || !this.formData.sigla?.trim()) { this.poNotification.warning('Preencha nome e sigla.'); return; }
    this.saving = true;
    const payload = { id: Number(this.formData.id), nome: this.formData.nome.trim(), sigla: this.formData.sigla.trim() };
    const request$ = this.isEdit ? this.service.updateEstado(this.formData.id, payload) : this.service.createEstado(payload);
    request$.subscribe({
      next: () => { this.poNotification.success(this.isEdit ? 'Estado atualizado.' : 'Estado criado.'); this.saving = false; this.loadData(true); this.modal.close(); },
      error: () => { this.poNotification.error('Erro ao salvar estado.'); this.saving = false; },
    });
  }

  remove(row: any) {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este registro?',
      confirm: () => {
        this.service.deleteEstado(row.id).subscribe({ next: () => { this.poNotification.success('Estado excluido.'); this.loadData(true); }, error: () => this.poNotification.error('Erro ao excluir estado.') });
      }
    });
  }
  private buildSearchParams() { return { page: this.page, limit: this.pageSize, search: this.quickSearch || undefined, nome: this.filters.nome, sigla: this.filters.sigla, sortProperty: this.sortProperty, sortDirection: this.sortDirection }; }
  private syncDisclaimers() { const disclaimers: PoDisclaimer[] = []; if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch }); if (this.filters.nome) disclaimers.push({ property: 'nome', label: 'Nome', value: this.filters.nome }); if (this.filters.sigla) disclaimers.push({ property: 'sigla', label: 'Sigla', value: this.filters.sigla }); this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers }; }
}
