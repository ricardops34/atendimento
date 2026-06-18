import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoButtonModule, PoComboOption, PoDisclaimer, PoDisclaimerGroup, PoFieldModule, PoModalComponent, PoModalModule, PoNotificationService, PoPageModule, PoSearchModule, PoTableAction, PoTableColumn, PoTableColumnSort, PoTableModule } from '@po-ui/ng-components';
import { ProfileSearchParams, ProfileService } from '../../../core/services/profile.service';
import { SystemModuleService } from '../../../core/services/system-module.service';
import { TenantService } from '../../../core/services/tenant.service';

@Component({
  selector: 'app-perfis-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './perfis.page.html',
})
export class PerfisPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  private service = inject(ProfileService);
  private tenantService = inject(TenantService);
  private moduleService = inject(SystemModuleService);
  private poNotification = inject(PoNotificationService);

  items: any[] = [];
  tenantOptions: PoComboOption[] = [];
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
  filters: { tenantId?: number; name?: string } = {};
  formData: any = { tenantId: null, name: '', moduleIds: [] as Array<number | string> };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'tenant.name', label: 'Tenant', sortable: true },
    { property: 'name', label: 'Perfil', sortable: true },
    { property: 'modulesLabel', label: 'Modulos', sortable: false },
  ];

  disclaimerGroup: PoDisclaimerGroup = { title: 'Filtros aplicados', disclaimers: [], remove: (d: PoDisclaimer) => this.removeDisclaimer(d), removeAll: () => this.clearFilters() };
  actions: PoTableAction[] = [{ label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.openEdit(row) }, { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.remove(row) }];

  ngOnInit() { this.loadDependencies(); this.loadData(true); }
  loadDependencies() {
    this.tenantService.findAll().subscribe((data) => { this.tenantOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); });
    this.moduleService.findAll().subscribe((data) => { this.moduleOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); });
  }
  loadData(reset = false) {
    if (reset) { this.page = 1; this.items = []; }
    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);
    this.service.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        const mapped = result.items.map((item) => ({
          ...item,
          modulesLabel: (item.profileModules || []).map((pm: any) => pm.module?.name).filter(Boolean).join(', '),
        }));
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
  openCreate() { this.isEdit = false; this.formData = { tenantId: this.tenantOptions[0]?.value ?? null, name: '', moduleIds: [] }; this.modal.open(); }
  openEdit(row: any) { this.isEdit = true; this.formData = { id: row.id, tenantId: row.tenantId, name: row.name, moduleIds: (row.profileModules || []).map((pm: any) => pm.moduleId) }; this.modal.open(); }
  save() {
    if (!this.formData.tenantId || !this.formData.name?.trim()) { this.poNotification.warning('Preencha tenant e nome.'); return; }
    this.saving = true;
    const payload = { tenantId: Number(this.formData.tenantId), name: this.formData.name.trim(), moduleIds: (this.formData.moduleIds || []).map((value: number | string) => Number(value)) };
    const request$ = this.isEdit ? this.service.update(this.formData.id, payload) : this.service.create(payload);
    request$.subscribe({ next: () => { this.poNotification.success(this.isEdit ? 'Perfil atualizado com sucesso.' : 'Perfil criado com sucesso.'); this.saving = false; this.loadData(true); this.modal.close(); }, error: () => { this.poNotification.error('Erro ao salvar perfil.'); this.saving = false; } });
  }
  remove(row: any) { this.service.remove(row.id).subscribe({ next: () => { this.poNotification.success('Perfil excluido com sucesso.'); this.loadData(true); }, error: () => this.poNotification.error('Erro ao excluir perfil.') }); }
  private buildSearchParams(): ProfileSearchParams { return { page: this.page, pageSize: this.pageSize, search: this.quickSearch || undefined, tenantId: this.filters.tenantId, name: this.filters.name, sortProperty: this.sortProperty, sortDirection: this.sortDirection }; }
  private syncDisclaimers() { const disclaimers: PoDisclaimer[] = []; if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch }); if (this.filters.tenantId) disclaimers.push({ property: 'tenantId', label: 'Tenant', value: this.tenantOptions.find((item) => item.value === this.filters.tenantId)?.label || this.filters.tenantId }); if (this.filters.name) disclaimers.push({ property: 'name', label: 'Perfil', value: this.filters.name }); this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers }; }
}
