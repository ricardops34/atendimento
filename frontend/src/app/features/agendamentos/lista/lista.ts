import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  PoButtonModule,
  PoComboOption,
  PoDisclaimer,
  PoDisclaimerGroup,
  PoDropdownAction,
  PoDropdownModule,
  PoFieldModule,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
  PoPageModule,
  PoSearchModule,
  PoTableAction,
  PoTableColumn,
  PoTableModule
} from '@po-ui/ng-components';
import { AgendamentoSearchParams, AgendamentoService, ExportFormat } from '../../../core/services/agendamento.service';
import { FormSidebar } from '../components/form-sidebar/form-sidebar';
import { ContratoService } from '../../../core/services/contrato.service';
import { ProfissionalService } from '../../../core/services/profissional.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PoPageModule,
    PoTableModule,
    PoButtonModule,
    PoDropdownModule,
    PoModalModule,
    PoFieldModule,
    PoSearchModule,
    FormSidebar
  ],
  templateUrl: './lista.html',
  providers: [DatePipe]
})
export class Lista implements OnInit {
  @ViewChild(FormSidebar) formSidebar!: FormSidebar;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;
  @ViewChild('extratoModal', { static: true }) extratoModal!: PoModalComponent;

  private agendamentoService = inject(AgendamentoService);
  private contratoService = inject(ContratoService);
  private profissionalService = inject(ProfissionalService);
  private poNotification = inject(PoNotificationService);

  agendamentos: any[] = [];
  loading = false;
  loadingShowMore = false;
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  quickSearch = '';

  contratos: PoComboOption[] = [];
  profissionais: PoComboOption[] = [];

  exportActions: PoDropdownAction[] = [
    { label: 'CSV', action: () => this.onExport('csv') },
    { label: 'XLS', action: () => this.onExport('xls') },
    { label: 'PDF', action: () => this.onExport('pdf') },
    { label: 'XML', action: () => this.onExport('xml') }
  ];

  extratoActions: PoDropdownAction[] = [
    { label: 'Extrato (XLS)', action: () => this.openExtratoModal('xls') },
    { label: 'Extrato (PDF)', action: () => this.openExtratoModal('pdf') }
  ];

  readonly statusOptions: PoComboOption[] = [
    { label: 'Agendada', value: 'A' },
    { label: 'Realizada', value: 'R' },
    { label: 'Cancelada', value: 'C' },
    { label: 'Feriado', value: 'F' }
  ];

  readonly modalidadeOptions: PoComboOption[] = [
    { label: 'Presencial', value: 'P' },
    { label: 'Remoto', value: 'R' },
    { label: 'Falta', value: 'F' }
  ];

  filters: {
    tipo?: string;
    local?: string;
    contratoId?: number;
    profissionalId?: number;
    dataInicial?: string;
    dataFinal?: string;
  } = {};

  extratoFilters: {
    dataInicial?: string;
    dataFinal?: string;
    contratoId?: number;
    profissionalId?: number;
  } = {};

  extratoFormat: 'xls' | 'pdf' = 'xls';

  disclaimerGroup: PoDisclaimerGroup = {
    title: 'Filtros aplicados',
    disclaimers: [],
    remove: (disclaimer: PoDisclaimer) => this.removeDisclaimer(disclaimer),
    removeAll: () => this.clearFilters()
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
        { value: 'Feriado', color: 'color-08', label: 'Feriado' }
      ]
    }
  ];

  actions: PoTableAction[] = [
    {
      label: 'Editar',
      icon: 'po-icon-edit',
      action: this.onEdit.bind(this)
    },
    {
      label: 'Confirmar',
      icon: 'po-icon-ok',
      action: this.onConfirm.bind(this),
      disabled: (row: any) => row.tipo !== 'A'
    },
    {
      label: 'Ordem de Serviço',
      icon: 'po-icon-document',
      action: () => {},
      disabled: () => true
    }
  ];

  private readonly STORAGE_KEY_FILTERS = 'agendamentos_lista_filters';
  private readonly STORAGE_KEY_EXTRATO = 'agendamentos_extrato_filters';

  ngOnInit() {
    this.loadDependencies();
    this.restoreParams();
    this.loadData(true);
  }

  private restoreParams() {
    try {
      const savedFilters = localStorage.getItem(this.STORAGE_KEY_FILTERS);
      if (savedFilters) {
        const parsed = JSON.parse(savedFilters);
        this.filters = parsed.filters || {};
        this.quickSearch = parsed.quickSearch || '';
        this.syncDisclaimers();
      }
      
      const savedExtrato = localStorage.getItem(this.STORAGE_KEY_EXTRATO);
      if (savedExtrato) {
        this.extratoFilters = JSON.parse(savedExtrato);
      }
    } catch (e) {
      console.error('Erro ao restaurar filtros salvos:', e);
    }
  }

  private saveParams(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadDependencies() {
    this.contratoService.findAll().subscribe((data) => {
      this.contratos = data.map((c) => ({ label: c.descricao, value: c.id }));
    });
    this.profissionalService.findAll().subscribe((data) => {
      this.profissionais = data.map((p) => ({ label: p.nome, value: p.id }));
    });
  }

  loadData(reset = false) {
    if (reset) {
      this.page = 1;
      this.agendamentos = [];
    }

    if (this.page === 1) {
      this.loading = true;
    } else {
      this.loadingShowMore = true;
    }

    this.agendamentoService.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        const items = result.items.map((item: any) => this.mapAgendamento(item));
        this.agendamentos = this.page === 1 ? items : [...this.agendamentos, ...items];
        this.total = result.total;
        this.hasNext = result.hasNext;
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => {
        this.loading = false;
        this.loadingShowMore = false;
        this.poNotification.error('Erro ao carregar agendamentos.');
      }
    });
  }

  onShowMore() {
    if (!this.hasNext || this.loadingShowMore) return;
    this.page += 1;
    this.loadData();
  }

  onQuickSearch(filter: string) {
    this.quickSearch = filter;
    this.saveParams(this.STORAGE_KEY_FILTERS, { filters: this.filters, quickSearch: this.quickSearch });
    this.syncDisclaimers();
    this.loadData(true);
  }

  openAdvancedFilters() {
    this.advancedFilterModal.open();
  }

  applyAdvancedFilters() {
    this.saveParams(this.STORAGE_KEY_FILTERS, { filters: this.filters, quickSearch: this.quickSearch });
    this.advancedFilterModal.close();
    this.loadData(true);
  }

  clearFilters() {
    this.quickSearch = '';
    this.filters = {};
    localStorage.removeItem(this.STORAGE_KEY_FILTERS);
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

  onNew() {
    this.formSidebar.open();
  }

  onEdit(row: any) {
    this.formSidebar.open(row);
  }

  onConfirm(row: any) {
    if (row.tipo !== 'A') return;
    this.agendamentoService.confirmar(row.id).subscribe({
      next: () => {
        this.poNotification.success('Atendimento confirmado como Realizado.');
        this.loadData();
      },
      error: () => this.poNotification.error('Erro ao confirmar atendimento.')
    });
  }

  onExport(format: ExportFormat) {
    this.agendamentoService.export(this.buildSearchParams(), format).subscribe({
      next: (blob) => {
        const extMap: Record<ExportFormat, string> = { csv: 'csv', xls: 'xlsx', pdf: 'pdf', xml: 'xml' };
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `atendimentos.${extMap[format]}`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: async (err) => {
        let message = 'Erro ao exportar atendimentos.';
        if (err.error instanceof Blob) {
          try {
            const text = await err.error.text();
            const json = JSON.parse(text);
            message = json.message || message;
          } catch {}
        }
        this.poNotification.error(message);
      }
    });
  }

  openExtratoModal(format: 'xls' | 'pdf') {
    this.extratoFormat = format;
    
    // Se não tiver nenhum dado de data inicial salvo, podemos puxar da busca avançada
    if (!this.extratoFilters.dataInicial && !this.extratoFilters.dataFinal) {
      this.extratoFilters = {
        dataInicial: this.filters.dataInicial,
        dataFinal: this.filters.dataFinal,
        contratoId: this.filters.contratoId,
        profissionalId: this.filters.profissionalId
      };
    }
    this.extratoModal.open();
  }

  generateExtrato() {
    this.saveParams(this.STORAGE_KEY_EXTRATO, this.extratoFilters);
    this.extratoModal.close();
    
    const params: AgendamentoSearchParams = {
      page: 1,
      pageSize: 2000,
      dataInicial: this.extratoFilters.dataInicial,
      dataFinal: this.extratoFilters.dataFinal,
      contratoId: this.extratoFilters.contratoId,
      profissionalId: this.extratoFilters.profissionalId
    };

    this.agendamentoService.exportExtrato(params, this.extratoFormat).subscribe({
      next: (blob) => {
        const extMap: Record<'xls'|'pdf', string> = { xls: 'xlsx', pdf: 'pdf' };
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extrato_faturamento.${extMap[this.extratoFormat]}`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: async (err) => {
        let message = 'Erro ao exportar extrato.';
        if (err.error instanceof Blob) {
          try {
            const text = await err.error.text();
            const json = JSON.parse(text);
            message = json.message || message;
          } catch {}
        }
        this.poNotification.error(message);
      }
    });
  }

  onFecharLote() {
    const ids = this.agendamentos.filter((a) => a.tipo === 'A').map((a) => a.id);
    if (ids.length === 0) {
      this.poNotification.warning('Nenhum agendamento pendente para fechar lote.');
      return;
    }
    this.agendamentoService.fecharLote(ids).subscribe({
      next: (res: any) => {
        this.poNotification.success(`Fechamento concluído. ${res.registrosProcessados} registros atualizados.`);
        this.loadData();
      },
      error: () => this.poNotification.error('Erro no fechamento de lote.')
    });
  }

  private buildSearchParams(): AgendamentoSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      tipo: this.filters.tipo,
      local: this.filters.local,
      contratoId: this.filters.contratoId,
      profissionalId: this.filters.profissionalId,
      dataInicial: this.filters.dataInicial,
      dataFinal: this.filters.dataFinal
    };
  }

  private syncDisclaimers() {
    const disclaimers: PoDisclaimer[] = [];

    if (this.quickSearch) {
      disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    }
    if (this.filters.tipo) {
      disclaimers.push({ property: 'tipo', label: 'Status', value: this.formatTipo(this.filters.tipo) });
    }
    if (this.filters.local) {
      disclaimers.push({ property: 'local', label: 'Modalidade', value: this.formatLocal(this.filters.local) });
    }
    if (this.filters.contratoId) {
      disclaimers.push({
        property: 'contratoId',
        label: 'Contrato',
        value: this.contratos.find((item) => item.value === this.filters.contratoId)?.label || this.filters.contratoId
      });
    }
    if (this.filters.profissionalId) {
      disclaimers.push({
        property: 'profissionalId',
        label: 'Profissional',
        value: this.profissionais.find((item) => item.value === this.filters.profissionalId)?.label || this.filters.profissionalId
      });
    }
    if (this.filters.dataInicial) {
      disclaimers.push({ property: 'dataInicial', label: 'Data inicial', value: this.filters.dataInicial });
    }
    if (this.filters.dataFinal) {
      disclaimers.push({ property: 'dataFinal', label: 'Data final', value: this.filters.dataFinal });
    }

    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }

  private mapAgendamento(a: any) {
    return {
      ...a,
      localFormatado: this.formatLocal(a.local),
      duracaoFormatada: this.formatMinutesToHours(a.duracaoMinutos),
      tipoFormatado: this.formatTipo(a.tipo)
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
