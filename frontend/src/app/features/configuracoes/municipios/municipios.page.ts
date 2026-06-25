import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  PoComboOption
} from '@po-ui/ng-components';
import { MunicipioService } from '../../../core/services/municipio.service';
import { EstadoService } from '../../../core/services/estado.service';

@Component({
  selector: 'app-municipios-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './municipios.page.html',
})
export class MunicipiosPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  private service = inject(MunicipioService);
  private estadoService = inject(EstadoService);
  private poNotification = inject(PoNotificationService);

  items: any[] = [];
  estadosOptions: PoComboOption[] = [];
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
  filters: { nome?: string; estadoId?: number } = {};
  formData: any = { id: '', nome: '', estadoId: null };

  columns: PoTableColumn[] = [
    { property: 'id', label: 'Cód. IBGE', sortable: true },
    { property: 'nome', label: 'Município', sortable: true },
    { property: 'estado.sigla', label: 'Estado' },
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

  ngOnInit() { 
    this.loadEstados();
    this.loadData(true); 
  }

  loadEstados() {
    this.estadoService.getEstados({ limit: 100 }).subscribe(res => {
      this.estadosOptions = res.items.map((e: any) => ({ label: `${e.nome} (${e.sigla})`, value: e.id }));
    });
  }

  loadData(reset = false) {
    if (reset) { this.page = 1; this.items = []; }
    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);
    this.service.getMunicipios(this.buildSearchParams()).subscribe({
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
  openCreate() { this.isEdit = false; this.formData = { id: '', nome: '', estadoId: null }; this.modal.open(); }
  openEdit(row: any) { this.isEdit = true; this.formData = { id: row.id, nome: row.nome, estadoId: row.estadoId }; this.modal.open(); }

  save() {
    if (!this.formData.nome?.trim() || !this.formData.estadoId) { this.poNotification.warning('Preencha nome e estado.'); return; }
    this.saving = true;
    const payload = { id: Number(this.formData.id), nome: this.formData.nome.trim(), estadoId: Number(this.formData.estadoId) };
    const request$ = this.isEdit ? this.service.updateMunicipio(this.formData.id, payload) : this.service.createMunicipio(payload);
    request$.subscribe({
      next: () => { this.poNotification.success(this.isEdit ? 'Município atualizado.' : 'Município criado.'); this.saving = false; this.loadData(true); this.modal.close(); },
      error: () => { this.poNotification.error('Erro ao salvar município.'); this.saving = false; },
    });
  }

  remove(row: any) { this.service.deleteMunicipio(row.id).subscribe({ next: () => { this.poNotification.success('Município excluido.'); this.loadData(true); }, error: () => this.poNotification.error('Erro ao excluir município.') }); }
  private buildSearchParams() { return { page: this.page, limit: this.pageSize, search: this.quickSearch || undefined, estadoId: this.filters.estadoId, sortProperty: this.sortProperty, sortDirection: this.sortDirection }; }
  private syncDisclaimers() { 
    const disclaimers: PoDisclaimer[] = []; 
    if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch }); 
    if (this.filters.estadoId) {
      const est = this.estadosOptions.find(e => e.value === this.filters.estadoId);
      disclaimers.push({ property: 'estadoId', label: 'Estado', value: est ? est.label : this.filters.estadoId }); 
    }
    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers }; 
  }
}
