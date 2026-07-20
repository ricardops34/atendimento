import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
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
  PoTableModule,
} from '@po-ui/ng-components';
import { PortalClienteListaParams, PortalClienteService } from '../../../core/services/portal-cliente.service';

// Somente leitura: sem ações de criar/editar/confirmar/cancelar, sem exportação em lote.
// Filtro de "Contrato" é derivado dos próprios resultados (não usa /contratos, que não é
// escopado por cliente e vazaria contratos de outros clientes da mesma empresa — RF-06).
// Referência visual: frontend/src/app/features/agendamentos/lista (não alterado, não importado).
@Component({
  selector: 'app-portal-cliente-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PoPageModule,
    PoTableModule,
    PoFieldModule,
    PoSearchModule,
    PoModalModule,
  ],
  templateUrl: './lista.html',
})
export class PortalClienteLista implements OnInit {
  @ViewChild('detalheModal', { static: true }) detalheModal!: PoModalComponent;

  private portalClienteService = inject(PortalClienteService);
  private poNotification = inject(PoNotificationService);

  detalheSelecionado: any = null;

  agendamentos: any[] = [];
  loading = false;
  loadingShowMore = false;
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  quickSearch = '';

  contratos: PoComboOption[] = [];

  readonly statusOptions: PoComboOption[] = [
    { label: 'Agendada', value: 'A' },
    { label: 'Realizada', value: 'R' },
    { label: 'Cancelada', value: 'C' },
    { label: 'Feriado', value: 'F' },
  ];

  readonly modalidadeOptions: PoComboOption[] = [
    { label: 'Presencial', value: 'P' },
    { label: 'Remoto', value: 'R' },
    { label: 'Falta', value: 'F' },
  ];

  filters: {
    tipo?: string;
    local?: string;
    contratoId?: number;
    dataInicial?: string;
    dataFinal?: string;
  } = {};

  disclaimerGroup: PoDisclaimerGroup = {
    title: 'Filtros aplicados',
    disclaimers: [],
    remove: (disclaimer: PoDisclaimer) => this.removeDisclaimer(disclaimer),
    removeAll: () => this.clearFilters(),
  };

  columns: PoTableColumn[] = [
    { property: 'dataAgenda', label: 'Data', type: 'date', sortable: true },
    { property: 'contrato.descricao', label: 'Contrato', sortable: true },
    { property: 'profissional.nome', label: 'Profissional', sortable: true },
    { property: 'localFormatado', label: 'Modalidade', sortable: true },
    { property: 'duracaoFormatada', label: 'Duração Total', sortable: true },
    {
      property: 'tipoFormatado',
      label: 'Status',
      type: 'label',
      sortable: true,
      labels: [
        { value: 'Agendada', color: 'color-01', label: 'Agendada' },
        { value: 'Realizada', color: 'color-10', label: 'Realizada' },
        { value: 'Cancelada', color: 'color-07', label: 'Cancelada' },
        { value: 'Feriado', color: 'color-08', label: 'Feriado' },
      ],
    },
  ];

  actions: PoTableAction[] = [
    {
      label: 'Visualizar',
      icon: 'po-icon-eye',
      action: this.onVisualizar.bind(this),
    },
  ];

  ngOnInit() {
    this.loadData(true);
  }

  onVisualizar(row: any) {
    this.detalheSelecionado = row;
    this.detalheModal.open();
  }

  loadData(reset = false) {
    if (reset) {
      this.page = 1;
      this.agendamentos = [];
    }
    this.loading = this.page === 1;
    this.loadingShowMore = this.page !== 1;

    this.portalClienteService.lista(this.buildParams()).subscribe({
      next: (result) => {
        const items = result.items.map((item: any) => this.mapAgendamento(item));
        this.agendamentos = this.page === 1 ? items : [...this.agendamentos, ...items];
        this.total = result.total;
        this.hasNext = result.hasNext;
        this.syncContratoOptions();
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => {
        this.loading = false;
        this.loadingShowMore = false;
        this.poNotification.error('Erro ao carregar atendimentos.');
      },
    });
  }

  onShowMore() {
    if (!this.hasNext || this.loadingShowMore) return;
    this.page += 1;
    this.loadData();
  }

  onQuickSearch(filter: string) {
    this.quickSearch = filter;
    this.syncDisclaimers();
    this.loadData(true);
  }

  applyFilters() {
    this.syncDisclaimers();
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
      delete this.filters[property];
    }
    setTimeout(() => {
      this.syncDisclaimers();
      this.loadData(true);
    });
  }

  private buildParams(): PortalClienteListaParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      tipo: this.filters.tipo,
      local: this.filters.local,
      contratoId: this.filters.contratoId,
      dataInicial: this.filters.dataInicial,
      dataFinal: this.filters.dataFinal,
    };
  }

  private syncContratoOptions() {
    const vistos = new Map<number, string>();
    for (const a of this.agendamentos) {
      if (a.contrato?.id && !vistos.has(a.contrato.id)) {
        vistos.set(a.contrato.id, a.contrato.descricao);
      }
    }
    this.contratos = Array.from(vistos.entries()).map(([value, label]) => ({ label, value }));
  }

  private syncDisclaimers() {
    const disclaimers: PoDisclaimer[] = [];
    if (this.quickSearch) disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    if (this.filters.tipo) disclaimers.push({ property: 'tipo', label: 'Status', value: this.formatTipo(this.filters.tipo) });
    if (this.filters.local) disclaimers.push({ property: 'local', label: 'Modalidade', value: this.formatLocal(this.filters.local) });
    if (this.filters.contratoId) {
      disclaimers.push({
        property: 'contratoId',
        label: 'Contrato',
        value: this.contratos.find((c) => c.value === this.filters.contratoId)?.label || String(this.filters.contratoId),
      });
    }
    if (this.filters.dataInicial) disclaimers.push({ property: 'dataInicial', label: 'Data inicial', value: this.filters.dataInicial });
    if (this.filters.dataFinal) disclaimers.push({ property: 'dataFinal', label: 'Data final', value: this.filters.dataFinal });

    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }

  private mapAgendamento(a: any) {
    const localDate = a.dataAgenda ? a.dataAgenda.split('T')[0] + 'T12:00:00' : null;
    return {
      ...a,
      dataAgenda: localDate,
      localFormatado: this.formatLocal(a.local),
      duracaoFormatada: this.formatMinutesToHours(a.duracaoMinutos),
      tipoFormatado: this.formatTipo(a.tipo),
    };
  }

  private formatLocal(local: string) {
    const map: Record<string, string> = { P: 'Presencial', R: 'Remoto', F: 'Falta' };
    return map[local] || local;
  }

  private formatTipo(tipo: string) {
    const map: Record<string, string> = { A: 'Agendada', R: 'Realizada', C: 'Cancelada', F: 'Feriado' };
    return map[tipo] || tipo;
  }

  private formatMinutesToHours(minutes: number) {
    if (!minutes) return '00:00';
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }
}
