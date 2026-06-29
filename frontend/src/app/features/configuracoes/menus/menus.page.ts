import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoDialogService, PoButtonModule, PoComboOption, PoDisclaimer, PoDisclaimerGroup, PoFieldModule, PoModalComponent, PoModalModule, PoNotificationService, PoPageModule, PoSearchModule, PoTableAction, PoTableColumn, PoTableColumnSort, PoTableModule } from '@po-ui/ng-components';
import { MenuSearchParams, MenuService } from '../../../core/services/menu.service';
import { RoutineService } from '../../../core/services/routine.service';
import { SystemModuleService } from '../../../core/services/system-module.service';

@Component({
  selector: 'app-menus-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './menus.page.html',
})
export class MenusPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  private service = inject(MenuService);
  private poDialog = inject(PoDialogService);
  private moduleService = inject(SystemModuleService);
  private routineService = inject(RoutineService);
  private poNotification = inject(PoNotificationService);

  items: any[] = [];
  moduleOptions: PoComboOption[] = [];
  routineOptions: PoComboOption[] = [];
  parentOptions: PoComboOption[] = [];
  loading = false;
  loadingShowMore = false;
  saving = false;
  isEdit = false;
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  sortProperty = 'label';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { moduleId?: number; routineId?: number; label?: string; link?: string; isActive?: string } = {};
  activeOptions: PoComboOption[] = [{ label: 'Ativo', value: 'true' }, { label: 'Inativo', value: 'false' }];
  formData: any = { moduleId: null, routineId: null, parentId: null, label: '', shortLabel: '', icon: '', link: '', sortOrder: 0, isActive: true };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'label', label: 'Menu', sortable: true },
    { property: 'module.name', label: 'Modulo', sortable: true },
    { property: 'routine.name', label: 'Rotina', sortable: true },
    { property: 'link', label: 'Link', sortable: true },
    { property: 'isActiveLabel', label: 'Status', sortable: true },
  ];

  disclaimerGroup: PoDisclaimerGroup = { title: 'Filtros aplicados', disclaimers: [], remove: (d: PoDisclaimer) => this.removeDisclaimer(d), removeAll: () => this.clearFilters() };
  actions: PoTableAction[] = [{ label: 'Editar', icon: 'an an-pencil-simple', action: (row: any) => this.openEdit(row) }, { label: 'Excluir', icon: 'an an-trash', action: (row: any) => this.remove(row) }];

  ngOnInit() { this.loadDependencies(); this.loadData(true); }
  loadDependencies() {
    this.moduleService.findAll().subscribe((data) => { this.moduleOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); });
    this.routineService.findAll().subscribe((data) => { this.routineOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); });
    this.service.findAll().subscribe((data) => { this.parentOptions = (data || []).map((item) => ({ label: item.label, value: item.id })); });
  }
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
  onSortChange(sort: PoTableColumnSort) { this.sortProperty = sort.column?.property || 'label'; this.sortDirection = sort.type === 'descending' ? 'descending' : 'ascending'; this.loadData(true); }
  openAdvancedFilters() { this.advancedFilterModal.open(); }
  applyAdvancedFilters() { this.advancedFilterModal.close(); this.loadData(true); }
  clearFilters() { this.quickSearch = ''; this.filters = {}; this.syncDisclaimers(); this.loadData(true); }
  removeDisclaimer(disclaimer: PoDisclaimer) { const property = disclaimer.property as keyof typeof this.filters | 'search'; if (property === 'search') this.quickSearch = ''; else this.filters[property] = undefined; this.syncDisclaimers(); this.loadData(true); }
  openCreate() { this.isEdit = false; this.formData = { moduleId: null, routineId: null, parentId: null, label: '', shortLabel: '', icon: '', link: '', sortOrder: 0, isActive: true }; this.modal.open(); }
  openEdit(row: any) { this.isEdit = true; this.formData = { id: row.id, moduleId: row.moduleId, routineId: row.routineId, parentId: row.parentId, label: row.label, shortLabel: row.shortLabel, icon: row.icon, link: row.link, sortOrder: row.sortOrder, isActive: row.isActive }; this.modal.open(); }
  save() {
    if (!this.formData.label?.trim()) { this.poNotification.warning('Preencha o nome do menu.'); return; }
    this.saving = true;
    const payload = { ...this.formData };
    const request$ = this.isEdit ? this.service.update(this.formData.id, payload) : this.service.create(payload);
    request$.subscribe({ next: () => { this.poNotification.success(this.isEdit ? 'Menu atualizado com sucesso.' : 'Menu criado com sucesso.'); this.saving = false; this.loadData(true); this.loadDependencies(); this.modal.close(); }, error: () => { this.poNotification.error('Erro ao salvar menu.'); this.saving = false; } });
  }
  remove(row: any) {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este registro?',
      confirm: () => {
        this.service.remove(row.id).subscribe({ next: () => { this.poNotification.success('Menu excluido com sucesso.'); this.loadData(true); this.loadDependencies(); }, error: () => this.poNotification.error('Erro ao excluir menu.') });
      }
    });
  }
  private buildSearchParams(): MenuSearchParams { return { page: this.page, pageSize: this.pageSize, search: this.quickSearch || undefined, moduleId: this.filters.moduleId, routineId: this.filters.routineId, label: this.filters.label, link: this.filters.link, isActive: this.filters.isActive === undefined ? undefined : this.filters.isActive === 'true', sortProperty: this.sortProperty, sortDirection: this.sortDirection }; }
  private syncDisclaimers() { const disclaimers: PoDisclaimer[] = []; if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch }); if (this.filters.moduleId) disclaimers.push({ property: 'moduleId', label: 'Modulo', value: this.moduleOptions.find((item) => item.value === this.filters.moduleId)?.label || this.filters.moduleId }); if (this.filters.routineId) disclaimers.push({ property: 'routineId', label: 'Rotina', value: this.routineOptions.find((item) => item.value === this.filters.routineId)?.label || this.filters.routineId }); if (this.filters.label) disclaimers.push({ property: 'label', label: 'Menu', value: this.filters.label }); if (this.filters.link) disclaimers.push({ property: 'link', label: 'Link', value: this.filters.link }); if (this.filters.isActive !== undefined) disclaimers.push({ property: 'isActive', label: 'Status', value: this.filters.isActive === 'true' ? 'Ativo' : 'Inativo' }); this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers }; }
}
