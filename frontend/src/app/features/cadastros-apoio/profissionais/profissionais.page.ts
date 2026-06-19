import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
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
} from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { ProfissionalSearchParams, ProfissionalService } from '../../../core/services/profissional.service';

@Component({
  selector: 'app-profissionais-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './profissionais.page.html',
})
export class ProfissionaisPage implements OnInit {
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private profissionalService = inject(ProfissionalService);
  private poNotification = inject(PoNotificationService);
  readonly router = inject(Router);

  profissionais: any[] = [];
  loading = false;
  loadingShowMore = false;
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  sortProperty = 'nome';
  sortDirection: 'ascending' | 'descending' = 'ascending';
  filters: { id?: number; nome?: string } = {};

  columns: PoTableColumn[] = [
    { property: 'id', label: 'ID', sortable: true, width: '70px' },
    { property: 'nome', label: 'Profissional', sortable: true },
    { property: 'user.name', label: 'Usuário do Sistema', sortable: false },
  ];

  disclaimerGroup: PoDisclaimerGroup = {
    title: 'Filtros aplicados',
    disclaimers: [],
    remove: (disclaimer: PoDisclaimer) => this.removeDisclaimer(disclaimer),
    removeAll: () => this.clearFilters(),
  };

  actions: PoTableAction[] = [
    { label: 'Visualizar', icon: 'po-icon-eye', action: (row: any) => this.navigateTo(['/profissionais', row.id]) },
    { label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.navigateTo(['/profissionais', row.id, 'editar']) },
    { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.navigateTo(['/profissionais', row.id, 'excluir']) },
  ];

  ngOnInit() {
    this.loadData(true);
  }

  loadData(reset = false) {
    if (reset) {
      this.page = 1;
      this.profissionais = [];
    }

    if (this.page === 1) {
      this.loading = true;
    } else {
      this.loadingShowMore = true;
    }

    this.profissionalService.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        this.profissionais = this.page === 1 ? result.items : [...this.profissionais, ...result.items];
        this.total = result.total;
        this.hasNext = result.hasNext;
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => {
        this.profissionais = [];
        this.loading = false;
        this.loadingShowMore = false;
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
    this.sortProperty = sort.column?.property || 'nome';
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
    if (property === 'search') {
      this.quickSearch = '';
    } else {
      this.filters[property] = undefined;
    }
    this.syncDisclaimers();
    this.loadData(true);
  }

  navigateTo(commands: any[]) {
    this.router.navigate(commands);
  }

  private buildSearchParams(): ProfissionalSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      id: this.filters.id,
      nome: this.filters.nome,
      sortProperty: this.sortProperty,
      sortDirection: this.sortDirection,
    };
  }

  private syncDisclaimers() {
    const disclaimers: PoDisclaimer[] = [];

    if (this.quickSearch) {
      disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    }
    if (this.filters.id) {
      disclaimers.push({ property: 'id', label: 'ID', value: this.filters.id });
    }
    if (this.filters.nome) {
      disclaimers.push({ property: 'nome', label: 'Profissional', value: this.filters.nome });
    }

    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }
}
