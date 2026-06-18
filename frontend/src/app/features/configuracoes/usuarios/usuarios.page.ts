import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoButtonModule, PoComboOption, PoDisclaimer, PoDisclaimerGroup, PoFieldModule, PoModalComponent, PoModalModule, PoNotificationService, PoPageModule, PoSearchModule, PoTableAction, PoTableColumn, PoTableColumnSort, PoTableModule } from '@po-ui/ng-components';
import { ProfileService } from '../../../core/services/profile.service';
import { TenantService } from '../../../core/services/tenant.service';
import { UserSearchParams, UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './usuarios.page.html',
})
export class UsuariosPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  private service = inject(UserService);
  private tenantService = inject(TenantService);
  private profileService = inject(ProfileService);
  private poNotification = inject(PoNotificationService);

  items: any[] = [];
  tenantOptions: PoComboOption[] = [];
  profileOptions: PoComboOption[] = [];
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
  filters: { tenantId?: number; profileId?: number; name?: string; email?: string; isActive?: string } = {};
  activeOptions: PoComboOption[] = [{ label: 'Ativo', value: 'true' }, { label: 'Inativo', value: 'false' }];
  formData: any = { tenantId: null, profileId: null, name: '', email: '', password: '', isActive: true };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'tenant.name', label: 'Tenant', sortable: true },
    { property: 'profile.name', label: 'Perfil', sortable: true },
    { property: 'name', label: 'Usuario', sortable: true },
    { property: 'email', label: 'Email', sortable: true },
    { property: 'isActiveLabel', label: 'Status', sortable: true },
  ];

  disclaimerGroup: PoDisclaimerGroup = { title: 'Filtros aplicados', disclaimers: [], remove: (d: PoDisclaimer) => this.removeDisclaimer(d), removeAll: () => this.clearFilters() };
  actions: PoTableAction[] = [{ label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.openEdit(row) }, { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.remove(row) }];

  ngOnInit() { this.loadDependencies(); this.loadData(true); }
  loadDependencies() {
    this.tenantService.findAll().subscribe((data) => { this.tenantOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); });
    this.profileService.findAll().subscribe((data) => { this.profileOptions = (data || []).map((item) => ({ label: `${item.name} (${item.tenant?.name || 'Sem tenant'})`, value: item.id })); });
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
  onSortChange(sort: PoTableColumnSort) { this.sortProperty = sort.column?.property || 'name'; this.sortDirection = sort.type === 'descending' ? 'descending' : 'ascending'; this.loadData(true); }
  openAdvancedFilters() { this.advancedFilterModal.open(); }
  applyAdvancedFilters() { this.advancedFilterModal.close(); this.loadData(true); }
  clearFilters() { this.quickSearch = ''; this.filters = {}; this.syncDisclaimers(); this.loadData(true); }
  removeDisclaimer(disclaimer: PoDisclaimer) { const property = disclaimer.property as keyof typeof this.filters | 'search'; if (property === 'search') this.quickSearch = ''; else this.filters[property] = undefined; this.syncDisclaimers(); this.loadData(true); }
  openCreate() { this.isEdit = false; this.formData = { tenantId: this.tenantOptions[0]?.value ?? null, profileId: this.profileOptions[0]?.value ?? null, name: '', email: '', password: '', isActive: true }; this.modal.open(); }
  openEdit(row: any) { this.isEdit = true; this.formData = { id: row.id, tenantId: row.tenantId, profileId: row.profileId, name: row.name, email: row.email, password: '', isActive: row.isActive }; this.modal.open(); }
  save() {
    if (!this.formData.tenantId || !this.formData.profileId || !this.formData.name?.trim() || !this.formData.email?.trim()) { this.poNotification.warning('Preencha tenant, perfil, nome e email.'); return; }
    if (!this.isEdit && !this.formData.password?.trim()) { this.poNotification.warning('Informe a senha do usuario.'); return; }
    this.saving = true;
    const payload: any = { tenantId: Number(this.formData.tenantId), profileId: Number(this.formData.profileId), name: this.formData.name.trim(), email: this.formData.email.trim(), isActive: !!this.formData.isActive };
    if (this.formData.password?.trim()) payload.password = this.formData.password.trim();
    const request$ = this.isEdit ? this.service.update(this.formData.id, payload) : this.service.create(payload);
    request$.subscribe({ next: () => { this.poNotification.success(this.isEdit ? 'Usuario atualizado com sucesso.' : 'Usuario criado com sucesso.'); this.saving = false; this.loadData(true); this.modal.close(); }, error: () => { this.poNotification.error('Erro ao salvar usuario.'); this.saving = false; } });
  }
  remove(row: any) { this.service.remove(row.id).subscribe({ next: () => { this.poNotification.success('Usuario excluido com sucesso.'); this.loadData(true); }, error: () => this.poNotification.error('Erro ao excluir usuario.') }); }
  private buildSearchParams(): UserSearchParams { return { page: this.page, pageSize: this.pageSize, search: this.quickSearch || undefined, tenantId: this.filters.tenantId, profileId: this.filters.profileId, name: this.filters.name, email: this.filters.email, isActive: this.filters.isActive === undefined ? undefined : this.filters.isActive === 'true', sortProperty: this.sortProperty, sortDirection: this.sortDirection }; }
  private syncDisclaimers() { const disclaimers: PoDisclaimer[] = []; if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch }); if (this.filters.tenantId) disclaimers.push({ property: 'tenantId', label: 'Tenant', value: this.tenantOptions.find((item) => item.value === this.filters.tenantId)?.label || this.filters.tenantId }); if (this.filters.profileId) disclaimers.push({ property: 'profileId', label: 'Perfil', value: this.profileOptions.find((item) => item.value === this.filters.profileId)?.label || this.filters.profileId }); if (this.filters.name) disclaimers.push({ property: 'name', label: 'Usuario', value: this.filters.name }); if (this.filters.email) disclaimers.push({ property: 'email', label: 'Email', value: this.filters.email }); if (this.filters.isActive !== undefined) disclaimers.push({ property: 'isActive', label: 'Status', value: this.filters.isActive === 'true' ? 'Ativo' : 'Inativo' }); this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers }; }
}
