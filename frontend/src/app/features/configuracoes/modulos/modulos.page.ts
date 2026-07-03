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
import { SystemModuleSearchParams, SystemModuleService } from '../../../core/services/system-module.service';

@Component({
  selector: 'app-modulos-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './modulos.page.html',
})
export class ModulosPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  private service = inject(SystemModuleService);
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
  sortProperty = 'name';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { name?: string; key?: string } = {};
  formData: any = { name: '', key: '' };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'name', label: 'Modulo', sortable: true },
    { property: 'key', label: 'Key', sortable: true },
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
    this.service.search(this.buildSearchParams()).subscribe({
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
  onSortChange(sort: PoTableColumnSort) { this.sortProperty = sort.column?.property || 'name'; this.sortDirection = sort.type === 'descending' ? 'descending' : 'ascending'; this.loadData(true); }
  openAdvancedFilters() { this.advancedFilterModal.open(); }
  applyAdvancedFilters() { this.advancedFilterModal.close(); this.loadData(true); }
  clearFilters() { this.quickSearch = ''; this.filters = {}; this.syncDisclaimers(); this.loadData(true); }
  removeDisclaimer(disclaimer: PoDisclaimer) { const property = disclaimer.property as keyof typeof this.filters | 'search'; if (property === 'search') this.quickSearch = ''; else this.filters[property] = undefined; this.syncDisclaimers(); this.loadData(true); }
  openCreate() { this.isEdit = false; this.formData = { name: '', key: '' }; this.modal.open(); }
  openEdit(row: any) { this.isEdit = true; this.formData = { id: row.id, name: row.name, key: row.key }; this.modal.open(); }

  save() {
    if (!this.formData.name?.trim() || !this.formData.key?.trim()) { this.poNotification.warning('Preencha nome e key.'); return; }
    this.saving = true;
    const payload = { name: this.formData.name.trim(), key: this.formData.key.trim() };
    const request$ = this.isEdit ? this.service.update(this.formData.id, payload) : this.service.create(payload);
    request$.subscribe({
      next: () => { this.poNotification.success(this.isEdit ? 'Modulo atualizado com sucesso.' : 'Modulo criado com sucesso.'); this.saving = false; this.loadData(true); this.modal.close(); },
      error: () => { this.poNotification.error('Erro ao salvar modulo.'); this.saving = false; },
    });
  }

  remove(row: any) {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este registro?',
      confirm: () => {
        this.service.remove(row.id).subscribe({ next: () => { this.poNotification.success('Modulo excluido com sucesso.'); this.loadData(true); }, error: () => this.poNotification.error('Erro ao excluir modulo.') });
      }
    });
  }
  private buildSearchParams(): SystemModuleSearchParams { return { page: this.page, pageSize: this.pageSize, search: this.quickSearch || undefined, name: this.filters.name, key: this.filters.key, sortProperty: this.sortProperty, sortDirection: this.sortDirection }; }
  private syncDisclaimers() { const disclaimers: PoDisclaimer[] = []; if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch }); if (this.filters.name) disclaimers.push({ property: 'name', label: 'Modulo', value: this.filters.name }); if (this.filters.key) disclaimers.push({ property: 'key', label: 'Key', value: this.filters.key }); this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers }; }
}
