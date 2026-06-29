import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoDialogService, PoButtonModule, PoComboOption, PoDisclaimer, PoDisclaimerGroup, PoFieldModule, PoModalComponent, PoModalModule, PoNotificationService, PoPageModule, PoSearchModule, PoTableAction, PoTableColumn, PoTableColumnSort, PoTableModule } from '@po-ui/ng-components';
import { RoutineSearchParams, RoutineService } from '../../../core/services/routine.service';
import { SystemModuleService } from '../../../core/services/system-module.service';

@Component({
  selector: 'app-rotinas-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './rotinas.page.html',
})
export class RotinasPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  private service = inject(RoutineService);
  private poDialog = inject(PoDialogService);
  private moduleService = inject(SystemModuleService);
  private poNotification = inject(PoNotificationService);

  items: any[] = [];
  moduleOptions: PoComboOption[] = [];
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
  filters: { moduleId?: number; name?: string; key?: string; path?: string; isActive?: string } = {};
  activeOptions: PoComboOption[] = [{ label: 'Ativo', value: 'true' }, { label: 'Inativo', value: 'false' }];
  formData: any = { moduleId: null, name: '', key: '', path: '', icon: '', shortLabel: '', sortOrder: 0, isActive: true };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'module.name', label: 'Modulo', sortable: true },
    { property: 'name', label: 'Rotina', sortable: true },
    { property: 'key', label: 'Key', sortable: true },
    { property: 'path', label: 'Path', sortable: true },
    { property: 'isActiveLabel', label: 'Status', sortable: true },
  ];

  disclaimerGroup: PoDisclaimerGroup = { title: 'Filtros aplicados', disclaimers: [], remove: (d: PoDisclaimer) => this.removeDisclaimer(d), removeAll: () => this.clearFilters() };
  actions: PoTableAction[] = [{ label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.openEdit(row) }, { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.remove(row) }];

  ngOnInit() { this.loadDependencies(); this.loadData(true); }
  loadDependencies() { this.moduleService.findAll().subscribe((data) => { this.moduleOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); }); }
  loadData(reset = false) {
    if (reset) { this.page = 1; this.items = []; }
    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);
    this.service.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        const mapped = result.items.map((item) => ({ ...item, isActiveLabel: item.isActive ? 'Ativo' : 'Inativo' }));
        this.items = this.page === 1 ? mapped : [...this.items, ...mapped];
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
  openCreate() { this.isEdit = false; this.formData = { moduleId: this.moduleOptions[0]?.value ?? null, name: '', key: '', path: '', icon: '', shortLabel: '', sortOrder: 0, isActive: true }; this.modal.open(); }
  openEdit(row: any) { this.isEdit = true; this.formData = { id: row.id, moduleId: row.moduleId, name: row.name, key: row.key, path: row.path, icon: row.icon, shortLabel: row.shortLabel, sortOrder: row.sortOrder, isActive: row.isActive }; this.modal.open(); }
  save() {
    if (!this.formData.moduleId || !this.formData.name?.trim() || !this.formData.key?.trim() || !this.formData.path?.trim()) { this.poNotification.warning('Preencha modulo, nome, key e path.'); return; }
    this.saving = true;
    const payload = { ...this.formData };
    const request$ = this.isEdit ? this.service.update(this.formData.id, payload) : this.service.create(payload);
    request$.subscribe({ next: () => { this.poNotification.success(this.isEdit ? 'Rotina atualizada com sucesso.' : 'Rotina criada com sucesso.'); this.saving = false; this.loadData(true); this.modal.close(); }, error: () => { this.poNotification.error('Erro ao salvar rotina.'); this.saving = false; } });
  }
  remove(row: any) {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este registro?',
      confirm: () => {
        this.service.remove(row.id).subscribe({ next: () => { this.poNotification.success('Rotina excluida com sucesso.'); this.loadData(true); }, error: () => this.poNotification.error('Erro ao excluir rotina.') });
      }
    });
  }
  private buildSearchParams(): RoutineSearchParams { return { page: this.page, pageSize: this.pageSize, search: this.quickSearch || undefined, moduleId: this.filters.moduleId, name: this.filters.name, key: this.filters.key, path: this.filters.path, isActive: this.filters.isActive === undefined ? undefined : this.filters.isActive === 'true', sortProperty: this.sortProperty, sortDirection: this.sortDirection }; }
  private syncDisclaimers() { const disclaimers: PoDisclaimer[] = []; if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch }); if (this.filters.moduleId) disclaimers.push({ property: 'moduleId', label: 'Modulo', value: this.moduleOptions.find((item) => item.value === this.filters.moduleId)?.label || this.filters.moduleId }); if (this.filters.name) disclaimers.push({ property: 'name', label: 'Rotina', value: this.filters.name }); if (this.filters.key) disclaimers.push({ property: 'key', label: 'Key', value: this.filters.key }); if (this.filters.path) disclaimers.push({ property: 'path', label: 'Path', value: this.filters.path }); if (this.filters.isActive !== undefined) disclaimers.push({ property: 'isActive', label: 'Status', value: this.filters.isActive === 'true' ? 'Ativo' : 'Inativo' }); this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers }; }
}
