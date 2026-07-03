import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoDialogService, PoButtonModule,
  PoDisclaimer,
  PoDisclaimerGroup,
  PoDisclaimerGroupModule,
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
import { TenantSearchParams, TenantService } from '../../../core/services/tenant.service';

@Component({
  selector: 'app-config-empresas-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule, PoDisclaimerGroupModule],
  templateUrl: './empresas.page.html',
})
export class ConfigEmpresasPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private service = inject(TenantService);
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
  filters: { name?: string; slug?: string } = {};
  formData: any = { name: '', slug: '' };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true },
    { property: 'name', label: 'Empresa', sortable: true },
    { property: 'slug', label: 'Slug', sortable: true },
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
      this.items = [];
    }
    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);
    this.service.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        this.items = this.page === 1 ? result.items : [...this.items, ...result.items];
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
    this.formData = { name: '', slug: '' };
    this.modal.open();
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.formData = { id: row.id, name: row.name, slug: row.slug };
    this.modal.open();
  }

  save() {
    if (!this.formData.name?.trim() || !this.formData.slug?.trim()) {
      this.poNotification.warning('Preencha nome e slug.');
      return;
    }
    this.saving = true;
    const payload = { name: this.formData.name.trim(), slug: this.formData.slug.trim() };
    const request$ = this.isEdit ? this.service.update(this.formData.id, payload) : this.service.create(payload);
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
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: 'Tem certeza que deseja excluir este registro?',
      confirm: () => {
        this.service.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Empresa excluida com sucesso.');
        this.loadData(true);
      },
      error: () => this.poNotification.error('Erro ao excluir empresa.'),
    });
      }
    });
  }

  private buildSearchParams(): TenantSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      name: this.filters.name,
      slug: this.filters.slug,
      sortProperty: this.sortProperty,
      sortDirection: this.sortDirection,
    };
  }

  private syncDisclaimers() {
    const disclaimers: PoDisclaimer[] = [];
    if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    if (this.filters.name) disclaimers.push({ property: 'name', label: 'Empresa', value: this.filters.name });
    if (this.filters.slug) disclaimers.push({ property: 'slug', label: 'Slug', value: this.filters.slug });
    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }
}
