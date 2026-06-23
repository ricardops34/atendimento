import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  PoButtonModule,
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
  PoTableModule,
} from '@po-ui/ng-components';
import { ContratoSearchParams, ContratoService } from '../../../core/services/contrato.service';
import { EmpresaService } from '../../../core/services/empresa.service';
import { ProfissionalService } from '../../../core/services/profissional.service';
import { FormsModule } from '@angular/forms';

const DIAS_SEMANA: PoComboOption[] = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda-Feira', value: 1 },
  { label: 'Terça-Feira', value: 2 },
  { label: 'Quarta-Feira', value: 3 },
  { label: 'Quinta-Feira', value: 4 },
  { label: 'Sexta-Feira', value: 5 },
  { label: 'Sábado', value: 6 },
];

const TIPO_OPTIONS: PoComboOption[] = [
  { label: 'Fixo', value: 'F' },
  { label: 'Hora', value: 'H' },
];

@Component({
  selector: 'app-contratos-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule, PoSearchModule],
  templateUrl: './contratos.page.html',
})
export class ContratosPage implements OnInit {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild('advancedFilterModal', { static: true }) advancedFilterModal!: PoModalComponent;

  private contratoService = inject(ContratoService);
  private empresaService = inject(EmpresaService);
  private profissionalService = inject(ProfissionalService);
  private poNotification = inject(PoNotificationService);

  contratos: any[] = [];
  empresas: PoComboOption[] = [];
  profissionais: PoComboOption[] = [];
  loading = false;
  loadingShowMore = false;
  saving = false;
  isEdit = false;
  quickSearch = '';
  page = 1;
  readonly pageSize = 20;
  hasNext = false;
  total = 0;
  sortProperty = 'descricao';
  sortDirection: 'ascending' | 'descending' = 'ascending';

  readonly tipoOptions = TIPO_OPTIONS;
  readonly diasSemana = DIAS_SEMANA;
  readonly feriadoOptions: PoComboOption[] = [
    { label: 'Sim', value: 'true' },
    { label: 'Não', value: 'false' },
  ];

  filters: { descricao?: string; empresaId?: number; tipo?: string; dtInicio?: string; dtFim?: string; isFeriado?: string } = {};

  formData: any = {
    empresaId: null,
    descricao: '',
    cor: '#333333',
    dtInicio: '',
    dtFim: '',
    tipo: 'F',
    valorHora: null,
    valorFixo: null,
    isFeriado: false,
    profissionalIds: [],
    escalas: [],
  };

  novaEscala: any = { diaSemana: null, profissionalId: null, horaInicio: '08:30', horaFim: '18:00', intervaloIni: '11:30', intervaloFim: '13:00' };

  columns: PoTableColumn[] = [
    { property: 'empresa.nome', label: 'Cliente', sortable: true },
    { property: 'descricao', label: 'Descrição', sortable: true },
    { property: 'tipo', label: 'Tipo', sortable: true, width: '80px' },
    { property: 'dtInicioFmt', label: 'Início', sortable: false, width: '110px' },
    { property: 'dtFimFmt', label: 'Fim', sortable: false, width: '110px' },
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
    this.loadDependencies();
    this.loadData(true);
  }

  loadDependencies() {
    this.empresaService.findAll().subscribe({
      next: (data) => {
        this.empresas = (data || []).map((e: any) => ({ label: e.nome, value: e.id }));
      },
    });
    this.profissionalService.findAll().subscribe({
      next: (data) => {
        this.profissionais = (data || []).map((p: any) => ({ label: p.nome, value: p.id }));
      },
    });
  }

  loadData(reset = false) {
    if (reset) {
      this.page = 1;
      this.contratos = [];
    }

    if (this.page === 1) {
      this.loading = true;
    } else {
      this.loadingShowMore = true;
    }

    this.contratoService.search(this.buildSearchParams()).subscribe({
      next: (result) => {
        const items = result.items.map((item: any) => ({
          ...item,
          dtInicioFmt: item.dtInicio ? new Date(item.dtInicio).toLocaleDateString('pt-BR') : '',
          dtFimFmt: item.dtFim ? new Date(item.dtFim).toLocaleDateString('pt-BR') : '',
        }));
        this.contratos = this.page === 1 ? items : [...this.contratos, ...items];
        this.total = result.total;
        this.hasNext = result.hasNext;
        this.syncDisclaimers();
        this.loading = false;
        this.loadingShowMore = false;
      },
      error: () => {
        this.contratos = [];
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
    this.sortProperty = sort.column?.property || 'descricao';
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

  openCreate() {
    this.isEdit = false;
    this.formData = {
      empresaId: this.empresas[0]?.value ?? null,
      descricao: '',
      cor: '#333333',
      dtInicio: '',
      dtFim: '',
      tipo: 'F',
      valorHora: null,
      valorFixo: null,
      isFeriado: false,
      profissionalIds: [],
      escalas: [],
    };
    this.resetNovaEscala();
    this.modal.open();
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.saving = true;
    this.contratoService.findOne(row.id).subscribe({
      next: (contrato: any) => {
        this.saving = false;
        this.formData = {
          id: contrato.id,
          empresaId: contrato.empresaId,
          descricao: contrato.descricao,
          cor: contrato.cor || '#333333',
          dtInicio: contrato.dtInicio ? contrato.dtInicio.substring(0, 10) : '',
          dtFim: contrato.dtFim ? contrato.dtFim.substring(0, 10) : '',
          tipo: contrato.tipo || 'F',
          valorHora: contrato.valorHora ?? null,
          valorFixo: contrato.valorFixo ?? null,
          isFeriado: !!contrato.isFeriado,
          profissionalIds: (contrato.profissionais || []).map((p: any) => p.profissionalId),
          escalas: (contrato.escalas || []).map((e: any) => ({
            diaSemana: e.diaSemana,
            profissionalId: e.profissionalId,
            horaInicio: e.horaInicio,
            horaFim: e.horaFim,
            intervaloIni: e.intervaloIni,
            intervaloFim: e.intervaloFim,
          })),
        };
        this.resetNovaEscala();
        this.modal.open();
      },
      error: () => {
        this.saving = false;
        this.poNotification.error('Erro ao carregar contrato.');
      },
    });
  }

  onDiaSemanaChange() {
    this.novaEscala.horaInicio = '08:30';
    this.novaEscala.intervaloIni = '11:30';
    this.novaEscala.intervaloFim = '13:00';
    this.novaEscala.horaFim = '18:00';
  }

  addEscala() {
    if (this.novaEscala.diaSemana === null || this.novaEscala.diaSemana === undefined || !this.novaEscala.profissionalId) {
      this.poNotification.warning('Selecione o dia da semana e o profissional.');
      return;
    }
    this.formData.escalas = [
      ...this.formData.escalas,
      { ...this.novaEscala, diaSemana: Number(this.novaEscala.diaSemana), profissionalId: Number(this.novaEscala.profissionalId) },
    ];
    this.resetNovaEscala();
  }

  removeEscala(index: number) {
    this.formData.escalas = this.formData.escalas.filter((_: any, i: number) => i !== index);
  }

  getDiaSemanaLabel(value: number): string {
    return DIAS_SEMANA.find((d) => d.value === value)?.label || String(value);
  }

  getProfissionalLabel(id: number): string {
    return this.profissionais.find((p) => p.value === id)?.label || String(id);
  }

  save() {
    if (!this.formData.empresaId || !this.formData.descricao?.trim()) {
      this.poNotification.warning('Preencha cliente e descrição.');
      return;
    }
    if (!this.formData.dtInicio || !this.formData.dtFim) {
      this.poNotification.warning('Preencha as datas de início e fim.');
      return;
    }
    if (!this.formData.tipo) {
      this.poNotification.warning('Selecione o tipo de contrato.');
      return;
    }

    this.saving = true;
    const payload: any = {
      empresaId: Number(this.formData.empresaId),
      descricao: this.formData.descricao.trim(),
      cor: this.formData.cor || '#333333',
      dtInicio: this.formData.dtInicio,
      dtFim: this.formData.dtFim,
      tipo: this.formData.tipo,
      isFeriado: !!this.formData.isFeriado,
      profissionalIds: (this.formData.profissionalIds || []).map((id: any) => Number(id)),
      escalas: this.formData.escalas || [],
    };
    if (this.formData.valorHora !== null && this.formData.valorHora !== '') {
      let v = String(this.formData.valorHora).replace(/\./g, '').replace(',', '.');
      payload.valorHora = Number(v);
    }
    if (this.formData.valorFixo !== null && this.formData.valorFixo !== '') {
      let v = String(this.formData.valorFixo).replace(/\./g, '').replace(',', '.');
      payload.valorFixo = Number(v);
    }

    const request$ = this.isEdit
      ? this.contratoService.update(this.formData.id, payload)
      : this.contratoService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Contrato atualizado com sucesso.' : 'Contrato criado com sucesso.');
        this.saving = false;
        this.loadData(true);
        this.modal.close();
      },
      error: (err: any) => {
        let msg = 'Erro ao salvar contrato.';
        if (err.error && err.error.message) {
          msg = Array.isArray(err.error.message) ? err.error.message.join(', ') : err.error.message;
        }
        this.poNotification.error(msg);
        this.saving = false;
      },
    });
  }

  remove(row: any) {
    this.contratoService.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Contrato excluído com sucesso.');
        this.loadData(true);
      },
      error: () => {
        this.poNotification.error('Erro ao excluir contrato.');
      },
    });
  }

  private resetNovaEscala() {
    this.novaEscala = { diaSemana: null, profissionalId: null, horaInicio: '08:30', horaFim: '18:00', intervaloIni: '11:30', intervaloFim: '13:00' };
  }

  private buildSearchParams(): ContratoSearchParams {
    return {
      page: this.page,
      pageSize: this.pageSize,
      search: this.quickSearch || undefined,
      descricao: this.filters.descricao,
      empresaId: this.filters.empresaId,
      tipo: this.filters.tipo,
      dtInicio: this.filters.dtInicio,
      dtFim: this.filters.dtFim,
      isFeriado: this.filters.isFeriado === undefined ? undefined : this.filters.isFeriado === 'true',
      sortProperty: this.sortProperty,
      sortDirection: this.sortDirection,
    };
  }

  private syncDisclaimers() {
    const disclaimers: PoDisclaimer[] = [];

    if (this.quickSearch) {
      disclaimers.push({ property: 'search', label: 'Busca', value: this.quickSearch });
    }
    if (this.filters.descricao) {
      disclaimers.push({ property: 'descricao', label: 'Contrato', value: this.filters.descricao });
    }
    if (this.filters.empresaId) {
      disclaimers.push({
        property: 'empresaId',
        label: 'Cliente',
        value: this.empresas.find((e) => e.value === this.filters.empresaId)?.label || this.filters.empresaId,
      });
    }
    if (this.filters.tipo) {
      disclaimers.push({ property: 'tipo', label: 'Tipo', value: this.filters.tipo === 'F' ? 'Fixo' : 'Hora' });
    }
    if (this.filters.dtInicio) {
      disclaimers.push({ property: 'dtInicio', label: 'Data Início', value: this.filters.dtInicio });
    }
    if (this.filters.dtFim) {
      disclaimers.push({ property: 'dtFim', label: 'Data Fim', value: this.filters.dtFim });
    }

    this.disclaimerGroup = { ...this.disclaimerGroup, disclaimers };
  }
}
