import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoComboOption,
  PoFieldModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { ContratoService } from '../../../core/services/contrato.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { ProfissionalService } from '../../../core/services/profissional.service';

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
  selector: 'app-contratos-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-combo
          class="po-md-8"
          p-label="Cliente *"
          [p-options]="empresas"
          [ngModel]="formData.clienteId"
          (ngModelChange)="formData.clienteId = $event"
          name="clienteId">
        </po-combo>
        <po-input
          class="po-md-4"
          p-label="Cor (hex)"
          [ngModel]="formData.cor"
          (ngModelChange)="formData.cor = $event"
          name="cor"
          p-placeholder="#333333">
        </po-input>
      </div>

      <div class="po-row">
        <po-input
          class="po-md-12"
          p-label="Descrição *"
          [ngModel]="formData.descricao"
          (ngModelChange)="formData.descricao = $event"
          name="descricao">
        </po-input>
      </div>

      <div class="po-row">
        <po-input
          class="po-md-3"
          p-label="Data de Início *"
          p-type="date"
          [ngModel]="formData.dtInicio"
          (ngModelChange)="formData.dtInicio = $event"
          name="dtInicio">
        </po-input>
        <po-input
          class="po-md-3"
          p-label="Data de Fim *"
          p-type="date"
          [ngModel]="formData.dtFim"
          (ngModelChange)="formData.dtFim = $event"
          name="dtFim">
        </po-input>
        <po-combo
          class="po-md-3"
          p-label="Tipo *"
          [p-options]="tipoOptions"
          [ngModel]="formData.tipo"
          (ngModelChange)="formData.tipo = $event"
          name="tipo">
        </po-combo>
        <po-switch
          class="po-md-3"
          p-label="Feriado"
          [ngModel]="formData.isFeriado"
          (ngModelChange)="formData.isFeriado = $event"
          name="isFeriado">
        </po-switch>
      </div>

      <div class="po-row">
        <po-switch
          class="po-md-4"
          p-label="Bloqueado"
          p-help="Se bloqueado, não será listado nos agendamentos."
          [ngModel]="formData.bloqueado"
          (ngModelChange)="formData.bloqueado = $event"
          name="bloqueado">
        </po-switch>
      </div>

      <div class="po-row">
        <po-decimal
          class="po-md-6"
          p-label="Valor Hora"
          [ngModel]="formData.valorHora"
          (ngModelChange)="formData.valorHora = $event"
          name="valorHora"
          [p-decimals-length]="2">
        </po-decimal>
        <po-decimal
          class="po-md-6"
          p-label="Valor Fixo"
          [ngModel]="formData.valorFixo"
          (ngModelChange)="formData.valorFixo = $event"
          name="valorFixo"
          [p-decimals-length]="2">
        </po-decimal>
      </div>

      <div class="po-row" style="margin-top: 8px;">
        <po-multiselect
          class="po-md-12"
          p-label="Profissionais Habilitados"
          [p-options]="profissionais"
          [ngModel]="formData.profissionalIds"
          (ngModelChange)="formData.profissionalIds = $event"
          name="profissionalIds">
        </po-multiselect>
      </div>

      <!-- Escala semanal -->
      <div style="margin-top: 16px; border-top: 1px solid #ddd; padding-top: 12px;">
        <p style="font-weight: 600; margin-bottom: 8px;">Escala Semanal</p>

        <div class="po-row">
          <po-combo
            class="po-md-3"
            p-label="Dia da Semana"
            [p-options]="diasSemana"
            [ngModel]="novaEscala.diaSemana"
            (ngModelChange)="novaEscala.diaSemana = $event; onDiaSemanaChange()"
            name="novaEscalaDia">
          </po-combo>
          <po-combo
            class="po-md-3"
            p-label="Profissional"
            [p-options]="profissionais"
            [ngModel]="novaEscala.profissionalId"
            (ngModelChange)="novaEscala.profissionalId = $event"
            name="novaEscalaProfissional">
          </po-combo>
          <po-input
            class="po-md-1"
            p-label="Hora Início"
            [ngModel]="novaEscala.horaInicio"
            (ngModelChange)="novaEscala.horaInicio = $event"
            name="novaEscalaHoraInicio"
            p-placeholder="08:30">
          </po-input>
          <po-input
            class="po-md-1"
            p-label="Interv. Ini"
            [ngModel]="novaEscala.intervaloIni"
            (ngModelChange)="novaEscala.intervaloIni = $event"
            name="novaEscalaIntervaloIni"
            p-placeholder="11:30">
          </po-input>
          <po-input
            class="po-md-1"
            p-label="Interv. Fim"
            [ngModel]="novaEscala.intervaloFim"
            (ngModelChange)="novaEscala.intervaloFim = $event"
            name="novaEscalaIntervaloFim"
            p-placeholder="13:00">
          </po-input>
          <po-input
            class="po-md-1"
            p-label="Hora Fim"
            [ngModel]="novaEscala.horaFim"
            (ngModelChange)="novaEscala.horaFim = $event"
            name="novaEscalaHoraFim"
            p-placeholder="18:00">
          </po-input>
          <div class="po-md-2" style="display: flex; align-items: flex-end; padding-bottom: 4px;">
            <po-button p-label="Adicionar" p-icon="an an-plus" (p-click)="addEscala()"></po-button>
          </div>
        </div>

        <div *ngIf="formData.escalas?.length" style="margin-top: 8px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 4px 8px; text-align: left;">Dia</th>
                <th style="padding: 4px 8px; text-align: left;">Profissional</th>
                <th style="padding: 4px 8px;">Início</th>
                <th style="padding: 4px 8px;">Int. Ini</th>
                <th style="padding: 4px 8px;">Int. Fim</th>
                <th style="padding: 4px 8px;">Fim</th>
                <th style="padding: 4px 8px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let e of formData.escalas; let i = index" style="border-bottom: 1px solid #eee;">
                <td style="padding: 4px 8px;">{{ getDiaSemanaLabel(e.diaSemana) }}</td>
                <td style="padding: 4px 8px;">{{ getProfissionalLabel(e.profissionalId) }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ e.horaInicio }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ e.intervaloIni }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ e.intervaloFim }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ e.horaFim }}</td>
                <td style="padding: 4px 8px; text-align: center;">
                  <po-button p-icon="po-icon-delete" p-kind="tertiary" (p-click)="removeEscala(i)"></po-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Adiantamentos -->
      <div style="margin-top: 16px; border-top: 1px solid #ddd; padding-top: 12px;">
        <p style="font-weight: 600; margin-bottom: 8px;">Adiantamentos</p>

        <div class="po-row">
          <po-input
            class="po-md-4"
            p-label="Descrição"
            [ngModel]="novoAdiantamento.descricao"
            (ngModelChange)="novoAdiantamento.descricao = $event"
            name="novoAdiantamentoDescricao"
            p-placeholder="Adiantamento">
          </po-input>
          <po-decimal
            class="po-md-2"
            p-label="Valor Total"
            [ngModel]="novoAdiantamento.valorTotal"
            (ngModelChange)="novoAdiantamento.valorTotal = $event"
            name="novoAdiantamentoValorTotal"
            [p-decimals-length]="2">
          </po-decimal>
          <po-number
            class="po-md-2"
            p-label="Parcelas"
            [ngModel]="novoAdiantamento.parcelas"
            (ngModelChange)="novoAdiantamento.parcelas = $event"
            name="novoAdiantamentoParcelas">
          </po-number>
          <po-input
            class="po-md-2"
            p-label="Data Início"
            p-type="date"
            [ngModel]="novoAdiantamento.dataInicio"
            (ngModelChange)="novoAdiantamento.dataInicio = $event"
            name="novoAdiantamentoDataInicio">
          </po-input>
          <div class="po-md-2" style="display: flex; align-items: flex-end; padding-bottom: 4px;">
            <po-button p-label="Adicionar" p-icon="an an-plus" (p-click)="addAdiantamento()"></po-button>
          </div>
        </div>

        <div *ngIf="formData.adiantamentos?.length" style="margin-top: 8px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 4px 8px; text-align: left;">Descrição</th>
                <th style="padding: 4px 8px;">Valor Total</th>
                <th style="padding: 4px 8px;">Parcelas</th>
                <th style="padding: 4px 8px;">Valor Parcela</th>
                <th style="padding: 4px 8px;">Data Início</th>
                <th style="padding: 4px 8px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let a of formData.adiantamentos; let i = index" style="border-bottom: 1px solid #eee;">
                <td style="padding: 4px 8px;">{{ a.descricao }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ a.valorTotal }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ a.parcelas }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ a.valorParcela }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ a.dataInicio }}</td>
                <td style="padding: 4px 8px; text-align: center;">
                  <po-button p-icon="po-icon-delete" p-kind="tertiary" (p-click)="removeAdiantamento(i)"></po-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </po-page-edit>
  `,
})
export class ContratosEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contratoService = inject(ContratoService);
  private empresaService = inject(ClienteService);
  private profissionalService = inject(ProfissionalService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';

  empresas: PoComboOption[] = [];
  profissionais: PoComboOption[] = [];

  readonly tipoOptions = TIPO_OPTIONS;
  readonly diasSemana = DIAS_SEMANA;

  formData: any = {
    clienteId: null,
    descricao: '',
    cor: '#333333',
    dtInicio: '',
    dtFim: '',
    tipo: 'F',
    valorHora: null,
    valorFixo: null,
    isFeriado: false,
    bloqueado: false,
    profissionalIds: [],
    escalas: [],
    adiantamentos: [],
  };

  novaEscala: any = {
    diaSemana: null,
    profissionalId: null,
    horaInicio: '08:30',
    horaFim: '18:00',
    intervaloIni: '11:30',
    intervaloFim: '13:00',
  };

  novoAdiantamento: any = {
    descricao: '',
    valorTotal: null,
    parcelas: 1,
    dataInicio: '',
  };

  ngOnInit() {
    this.loadDependencies();
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar Contrato';
      this.loadRecord();
    }
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

  loadRecord() {
    this.contratoService.findOne(this.id!).subscribe({
      next: (contrato: any) => {
        this.formData = {
          id: contrato.id,
          clienteId: contrato.clienteId,
          descricao: contrato.descricao,
          cor: contrato.cor || '#333333',
          dtInicio: contrato.dtInicio ? contrato.dtInicio.substring(0, 10) : '',
          dtFim: contrato.dtFim ? contrato.dtFim.substring(0, 10) : '',
          tipo: contrato.tipo || 'F',
          valorHora: contrato.valorHora ?? null,
          valorFixo: contrato.valorFixo ?? null,
          isFeriado: !!contrato.isFeriado,
          bloqueado: !!contrato.bloqueado,
          profissionalIds: (contrato.profissionais || []).map((p: any) => p.profissionalId),
          escalas: (contrato.escalas || []).map((e: any) => ({
            diaSemana: e.diaSemana,
            profissionalId: e.profissionalId,
            horaInicio: e.horaInicio,
            horaFim: e.horaFim,
            intervaloIni: e.intervaloIni,
            intervaloFim: e.intervaloFim,
          })),
          adiantamentos: (contrato.adiantamentos || []).map((a: any) => ({
            descricao: a.descricao,
            valorTotal: a.valorTotal,
            parcelas: a.parcelas,
            valorParcela: a.valorParcela,
            dataInicio: a.dataInicio ? a.dataInicio.substring(0, 10) : '',
          })),
        };
        this.resetNovaEscala();
        this.resetNovoAdiantamento();
      },
      error: () => {
        this.poNotification.error('Erro ao carregar contrato.');
        this.router.navigate(['/contratos']);
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
      {
        ...this.novaEscala,
        diaSemana: Number(this.novaEscala.diaSemana),
        profissionalId: Number(this.novaEscala.profissionalId),
      },
    ];
    this.resetNovaEscala();
  }

  removeEscala(index: number) {
    this.formData.escalas = this.formData.escalas.filter((_: any, i: number) => i !== index);
  }

  addAdiantamento() {
    const valorTotal = Number(this.novoAdiantamento.valorTotal);
    const parcelas = Number(this.novoAdiantamento.parcelas);
    if (!this.novoAdiantamento.descricao?.trim() || !valorTotal || !parcelas || !this.novoAdiantamento.dataInicio) {
      this.poNotification.warning('Preencha descrição, valor total, parcelas e data de início do adiantamento.');
      return;
    }
    this.formData.adiantamentos = [
      ...this.formData.adiantamentos,
      {
        descricao: this.novoAdiantamento.descricao.trim(),
        valorTotal,
        parcelas,
        valorParcela: Math.round((valorTotal / parcelas) * 100) / 100,
        dataInicio: this.novoAdiantamento.dataInicio,
      },
    ];
    this.resetNovoAdiantamento();
  }

  removeAdiantamento(index: number) {
    this.formData.adiantamentos = this.formData.adiantamentos.filter((_: any, i: number) => i !== index);
  }

  getDiaSemanaLabel(value: number): string {
    return DIAS_SEMANA.find((d) => d.value === value)?.label || String(value);
  }

  getProfissionalLabel(id: number): string {
    return this.profissionais.find((p) => p.value === id)?.label || String(id);
  }

  save() {
    if (!this.formData.clienteId || !this.formData.descricao?.trim()) {
      this.poNotification.warning('Preencha o cliente e a descrição.');
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
      clienteId: Number(this.formData.clienteId),
      descricao: this.formData.descricao.trim(),
      cor: this.formData.cor || '#333333',
      dtInicio: this.formData.dtInicio,
      dtFim: this.formData.dtFim,
      tipo: this.formData.tipo,
      isFeriado: !!this.formData.isFeriado,
      bloqueado: !!this.formData.bloqueado,
      profissionalIds: (this.formData.profissionalIds || []).map((id: any) => Number(id)),
      escalas: this.formData.escalas || [],
      adiantamentos: this.formData.adiantamentos || [],
    };
    if (this.formData.valorHora !== null && this.formData.valorHora !== '') {
      payload.valorHora = Number(this.formData.valorHora);
    }
    if (this.formData.valorFixo !== null && this.formData.valorFixo !== '') {
      payload.valorFixo = Number(this.formData.valorFixo);
    }

    const request$ = this.isEdit
      ? this.contratoService.update(this.id!, payload)
      : this.contratoService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Contrato atualizado com sucesso.' : 'Contrato criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/contratos']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar contrato.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/contratos']);
  }

  private resetNovaEscala() {
    this.novaEscala = {
      diaSemana: null,
      profissionalId: null,
      horaInicio: '08:30',
      horaFim: '18:00',
      intervaloIni: '11:30',
      intervaloFim: '13:00',
    };
  }

  private resetNovoAdiantamento() {
    this.novoAdiantamento = {
      descricao: '',
      valorTotal: null,
      parcelas: 1,
      dataInicio: '',
    };
  }
}
