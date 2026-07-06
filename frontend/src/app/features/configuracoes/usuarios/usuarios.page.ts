import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoDialogService, PoButtonModule,
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
  PoTableModule } from '@po-ui/ng-components';
import { ProfileService } from '../../../core/services/profile.service';
import { EmpresaAdminService } from '../../../core/services/empresa-admin.service';
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
  private poDialog = inject(PoDialogService);
  private empresaService = inject(EmpresaAdminService);
  private profileService = inject(ProfileService);
  private poNotification = inject(PoNotificationService);

  items: any[] = [];
  empresasOptions: PoComboOption[] = [];
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
  filters: { empresaId?: number; profileId?: number; name?: string; email?: string; isActive?: string } = {};
  activeOptions: PoComboOption[] = [{ label: 'Ativo', value: 'true' }, { label: 'Inativo', value: 'false' }];
  formData: any = this.createEmptyForm();

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'name', label: 'Usuario', sortable: true },
    { property: 'email', label: 'Email', sortable: true },
    { property: 'profileLabel', label: 'Perfil', sortable: false },
    { property: 'empresasLabel', label: 'Empresas', sortable: false },
    { property: 'isActiveLabel', label: 'Status', sortable: true },
  ];

  disclaimerGroup: PoDisclaimerGroup = {
    title: 'Filtros aplicados',
    disclaimers: [],
    remove: (d: PoDisclaimer) => this.removeDisclaimer(d),
    removeAll: () => this.clearFilters()
  };

  actions: PoTableAction[] = [
    { label: 'Editar', icon: 'an an-pencil-simple', action: (row: any) => this.openEdit(row) },
    { label: 'Excluir', icon: 'an an-trash', action: (row: any) => this.remove(row) }
  ];

  ngOnInit() {
    this.loadDependencies();
    this.loadData(true);
  }

  loadDependencies() {
    this.empresaService.findAll().subscribe((data) => {
      this.empresasOptions = (data || []).map((item) => ({ label: item.name, value: item.id }));
    });
    this.profileService.findAll().subscribe((data) => {
      this.profileOptions = (data || []).map((item) => ({ label: item.name, value: item.id }));
    });
  }

  loadData(reset = false) {
    if (reset) {
      this.page = 1;
      this.items = [];
    }

    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);
    this.service.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        const mapped = result.items.map((item) => ({
          ...item,
          isActiveLabel: item.isActive ? 'Ativo' : 'Inativo',
          profileLabel: item.profile?.name || '',
          empresasLabel: (item.userEmpresas || [])
            .map((link: any) => `${link.empresa?.name || 'Empresa'}${link.isDefault ? ' (Padrao)' : ''}`)
            .join(', ')
        }));
        this.items = this.page === 1 ? mapped : [...this.items, ...mapped];
        this.hasNext = result.hasNext;
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => {
        this.loading = false;
        this.loadingShowMore = false;
        this.items = [];
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
    this.sortProperty = sort.column?.property || 'name';
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
    if (property === 'search') this.quickSearch = '';
    else this.filters[property] = undefined;
    this.syncDisclaimers();
    this.loadData(true);
  }

  openCreate() {
    this.isEdit = false;
    this.formData = this.createEmptyForm();
    this.modal.open();
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.formData = {
      id: row.id,
      name: row.name,
      email: row.email,
      password: '',
      isActive: row.isActive,
      profileId: row.profileId,
      selectedEmpresaId: this.empresasOptions[0]?.value ?? null,
      empresaLinks: (row.userEmpresas || []).map((link: any) => ({
        empresaId: link.empresaId,
        isDefault: !!link.isDefault
      }))
    };
    this.modal.open();
  }

  addEmpresaLink() {
    if (!this.formData.selectedEmpresaId) {
      this.poNotification.warning('Selecione a empresa para adicionar o vinculo.');
      return;
    }

    const empresaId = Number(this.formData.selectedEmpresaId);
    const exists = (this.formData.empresaLinks || []).some((item: any) => Number(item.empresaId) === empresaId);
    if (exists) {
      this.poNotification.warning('Essa empresa ja esta vinculada ao usuario.');
      return;
    }

    this.formData.empresaLinks = [
      ...(this.formData.empresaLinks || []),
      {
        empresaId,
        isDefault: !(this.formData.empresaLinks || []).length
      }
    ];
  }

  removeEmpresaLink(index: number) {
    this.formData.empresaLinks = (this.formData.empresaLinks || []).filter((_: any, currentIndex: number) => currentIndex !== index);
    if (!this.formData.empresaLinks.some((item: any) => item.isDefault) && this.formData.empresaLinks[0]) {
      this.formData.empresaLinks[0].isDefault = true;
    }
  }

  setDefaultEmpresa(index: number) {
    this.formData.empresaLinks = (this.formData.empresaLinks || []).map((item: any, currentIndex: number) => ({
      ...item,
      isDefault: currentIndex === index
    }));
  }

  save() {
    if (!this.formData.name?.trim() || !this.formData.email?.trim()) {
      this.poNotification.warning('Preencha nome e email.');
      return;
    }
    if (!this.formData.profileId) {
      this.poNotification.warning('Selecione o perfil do usuario.');
      return;
    }
    if (!this.isEdit && !this.formData.password?.trim()) {
      this.poNotification.warning('Informe a senha do usuario.');
      return;
    }
    if (!(this.formData.empresaLinks || []).length) {
      this.poNotification.warning('Adicione ao menos um vinculo de empresa.');
      return;
    }

    this.saving = true;
    const payload: any = {
      name: this.formData.name.trim(),
      email: this.formData.email.trim(),
      profileId: Number(this.formData.profileId),
      isActive: !!this.formData.isActive,
      empresaLinks: (this.formData.empresaLinks || []).map((item: any) => ({
        empresaId: Number(item.empresaId),
        isDefault: !!item.isDefault
      }))
    };
    if (this.formData.password?.trim()) payload.password = this.formData.password.trim();

    const request$ = this.isEdit ? this.service.update(this.formData.id, payload) : this.service.create(payload);
    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Usuario atualizado com sucesso.' : 'Usuario criado com sucesso.');
        this.saving = false;
        this.loadData(true);
        this.modal.close();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar usuario.');
        this.saving = false;
      }
    });
  }

  remove(row: any) {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este registro?',
      confirm: () => {
        this.service.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Usuario excluido com sucesso.');
        this.loadData(true);
      },
      error: () => this.poNotification.error('Erro ao excluir usuario.')
    });
      }
    });
  }

  resolveEmpresaName(empresaId: number) {
    return this.empresasOptions.find((item) => Number(item.value) === Number(empresaId))?.label || String(empresaId);
  }

  resolveProfileName(profileId: number) {
    return this.profileOptions.find((item) => Number(item.value) === Number(profileId))?.label || String(profileId);
  }

  private createEmptyForm() {
    return {
      name: '',
      email: '',
      password: '',
      isActive: true,
      profileId: null,
      selectedEmpresaId: this.empresasOptions[0]?.value ?? null,
      empresaLinks: [] as any[]
    };
  }

  private buildSearchParams(): UserSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      empresaId: this.filters.empresaId,
      profileId: this.filters.profileId,
      name: this.filters.name,
      email: this.filters.email,
      isActive: this.filters.isActive === undefined ? undefined : this.filters.isActive === 'true',
      sortProperty: this.sortProperty,
      sortDirection: this.sortDirection
    };
  }

  private syncDisclaimers() {
    const disclaimers: PoDisclaimer[] = [];
    if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    if (this.filters.empresaId) disclaimers.push({ property: 'empresaId', label: 'Empresa', value: this.resolveEmpresaName(this.filters.empresaId) });
    if (this.filters.profileId) disclaimers.push({ property: 'profileId', label: 'Perfil', value: this.resolveProfileName(this.filters.profileId) });
    if (this.filters.name) disclaimers.push({ property: 'name', label: 'Usuario', value: this.filters.name });
    if (this.filters.email) disclaimers.push({ property: 'email', label: 'Email', value: this.filters.email });
    if (this.filters.isActive !== undefined) disclaimers.push({ property: 'isActive', label: 'Status', value: this.filters.isActive === 'true' ? 'Ativo' : 'Inativo' });
    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }
}
