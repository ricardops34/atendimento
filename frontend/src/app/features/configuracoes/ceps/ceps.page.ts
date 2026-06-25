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
import { CepService } from '../../../core/services/cep.service';

@Component({
  selector: 'app-ceps-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './ceps.page.html',
})
export class CepsPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  private service = inject(CepService);
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
  sortProperty = 'cep';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  
  // Fields for search by exact CEP to test ViaCEP Integration
  searchCepStr = '';

  formData: any = { cep: '', logradouro: '', bairro: '', municipioId: null, estadoId: null };

  columns: PoTableColumn[] = [
    { property: 'cep', label: 'CEP', sortable: true },
    { property: 'logradouro', label: 'Logradouro', sortable: true },
    { property: 'bairro', label: 'Bairro', sortable: true },
    { property: 'municipio.nome', label: 'Município' },
    { property: 'estado.sigla', label: 'UF' },
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
    this.loadData(true); 
  }

  loadData(reset = false) {
    if (reset) { this.page = 1; this.items = []; }
    this.page === 1 ? (this.loading = true) : (this.loadingShowMore = true);
    this.service.getCeps(this.buildSearchParams()).subscribe({
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
  onSortChange(sort: PoTableColumnSort) { this.sortProperty = sort.column?.property || 'cep'; this.sortDirection = sort.type === 'descending' ? 'descending' : 'ascending'; this.loadData(true); }
  clearFilters() { this.quickSearch = ''; this.syncDisclaimers(); this.loadData(true); }
  removeDisclaimer(disclaimer: PoDisclaimer) { const property = disclaimer.property as 'search'; if (property === 'search') this.quickSearch = ''; this.syncDisclaimers(); this.loadData(true); }
  
  openCreate() { this.isEdit = false; this.formData = { cep: '', logradouro: '', bairro: '', municipioId: null, estadoId: null }; this.modal.open(); }
  openEdit(row: any) { this.isEdit = true; this.formData = { cep: row.cep, logradouro: row.logradouro, bairro: row.bairro, municipioId: row.municipioId, estadoId: row.estadoId }; this.modal.open(); }

  save() {
    if (!this.formData.cep?.trim() || !this.formData.logradouro?.trim()) { this.poNotification.warning('Preencha CEP e Logradouro.'); return; }
    this.saving = true;
    const payload = { cep: this.formData.cep, logradouro: this.formData.logradouro, bairro: this.formData.bairro, municipioId: Number(this.formData.municipioId), estadoId: Number(this.formData.estadoId) };
    const request$ = this.isEdit ? this.service.updateCep(this.formData.cep, payload) : this.service.createCep(payload);
    request$.subscribe({
      next: () => { this.poNotification.success(this.isEdit ? 'CEP atualizado.' : 'CEP criado.'); this.saving = false; this.loadData(true); this.modal.close(); },
      error: () => { this.poNotification.error('Erro ao salvar CEP.'); this.saving = false; },
    });
  }

  remove(row: any) { this.service.deleteCep(row.cep).subscribe({ next: () => { this.poNotification.success('CEP excluido.'); this.loadData(true); }, error: () => this.poNotification.error('Erro ao excluir CEP.') }); }
  
  searchViaCep() {
    if (!this.searchCepStr || this.searchCepStr.length < 8) {
      this.poNotification.warning('Digite um CEP válido para buscar no ViaCEP');
      return;
    }
    this.loading = true;
    this.service.getCepById(this.searchCepStr).subscribe({
      next: (cep) => {
        this.poNotification.success(`CEP ${cep.cep} encontrado e cadastrado localmente!`);
        this.loadData(true);
      },
      error: () => {
        this.poNotification.error('CEP não encontrado ou inválido');
        this.loading = false;
      }
    });
  }

  private buildSearchParams() { return { page: this.page, limit: this.pageSize, search: this.quickSearch || undefined, sortProperty: this.sortProperty, sortDirection: this.sortDirection }; }
  private syncDisclaimers() { 
    const disclaimers: PoDisclaimer[] = []; 
    if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch }); 
    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers }; 
  }
}
