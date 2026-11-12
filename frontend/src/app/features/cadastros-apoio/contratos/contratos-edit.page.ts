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

const MODO_EXCEDENTE_OPTIONS: PoComboOption[] = [
  { label: 'Banco de Horas', value: 'BANCO' },
  { label: 'Bloquear lançamento', value: 'BLOQUEIO' },
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
        <div class="po-md-4 contrato-color-field">
          <label for="contratoCor">Cor (hex)</label>
          <input id="contratoCor" class="contrato-color-picker" type="color" name="cor"
            [(ngModel)]="formData.cor" aria-label="Selecionar cor do contrato">
        </div>
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
        <po-datepicker
          class="po-md-3"
          p-label="Data de Início *"
          [ngModel]="formData.dtInicio"
          (ngModelChange)="formData.dtInicio = $event"
          name="dtInicio">
        </po-datepicker>
        <po-datepicker
          class="po-md-3"
          p-label="Data de Fim *"
          [ngModel]="formData.dtFim"
          (ngModelChange)="formData.dtFim = $event"
          name="dtFim">
        </po-datepicker>
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

      <!-- Profissionais habilitados -->
      <div style="margin-top: 16px; border-top: 1px solid #ddd; padding-top: 12px;">
        <p style="font-weight: 600; margin-bottom: 8px;">Profissionais Habilitados</p>

        <div class="po-row">
          <po-combo
            class="po-md-3"
            p-label="Profissional"
            [p-options]="profissionais"
            [ngModel]="novoProfissional.profissionalId"
            (ngModelChange)="novoProfissional.profissionalId = $event"
            name="novoProfissionalId">
          </po-combo>
          <po-decimal
            class="po-md-2"
            p-label="Valor Hora"
            [ngModel]="novoProfissional.valorHora"
            (ngModelChange)="novoProfissional.valorHora = $event"
            name="novoProfissionalValorHora"
            p-placeholder="Do contrato"
            [p-decimals-length]="2">
          </po-decimal>
          <po-decimal
            class="po-md-2"
            p-label="Valor Fixo"
            [ngModel]="novoProfissional.valorFixo"
            (ngModelChange)="novoProfissional.valorFixo = $event"
            name="novoProfissionalValorFixo"
            p-placeholder="Do contrato"
            [p-decimals-length]="2">
          </po-decimal>
          <po-decimal
            class="po-md-2"
            p-label="Máx. Horas/Mês"
            [ngModel]="novoProfissional.maxHorasMes"
            (ngModelChange)="novoProfissional.maxHorasMes = $event"
            name="novoProfissionalMaxHoras"
            p-placeholder="Sem limite"
            [p-decimals-length]="2">
          </po-decimal>
          <po-combo
            class="po-md-2"
            p-label="Excedente"
            [p-options]="modoExcedenteOptions"
            [ngModel]="novoProfissional.modoExcedente"
            (ngModelChange)="novoProfissional.modoExcedente = $event"
            name="novoProfissionalModoExcedente">
          </po-combo>
          <div class="po-md-1" style="display: flex; align-items: flex-end; gap: 4px; padding-bottom: 4px;">
            <po-button
              [p-label]="editandoProfissionalIndex === null ? 'Adicionar' : 'Salvar'"
              [p-icon]="editandoProfissionalIndex === null ? 'an an-plus' : 'an an-check'"
              (p-click)="addProfissionalHabilitado()">
            </po-button>
            <po-button
              *ngIf="editandoProfissionalIndex !== null"
              p-label="Cancelar"
              p-kind="tertiary"
              (p-click)="cancelarEdicaoProfissional()">
            </po-button>
          </div>
        </div>

        <div *ngIf="formData.profissionais?.length" style="margin-top: 8px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="padding: 4px 8px; text-align: left;">Profissional</th>
                <th style="padding: 4px 8px;">Valor Hora</th>
                <th style="padding: 4px 8px;">Valor Fixo</th>
                <th style="padding: 4px 8px;">Máx. Horas/Mês</th>
                <th style="padding: 4px 8px; text-align: left;">Excedente</th>
                <th style="padding: 4px 8px;">Saldo Banco Horas</th>
                <th style="padding: 4px 8px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of formData.profissionais; let i = index" style="border-bottom: 1px solid #eee;">
                <td style="padding: 4px 8px;">{{ getProfissionalLabel(p.profissionalId) }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ p.valorHora ?? '—' }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ p.valorFixo ?? '—' }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ p.maxHorasMes ?? '—' }}</td>
                <td style="padding: 4px 8px;">{{ getModoExcedenteLabel(p.modoExcedente) }}</td>
                <td style="padding: 4px 8px; text-align: center;">{{ p.saldoBancoHoras ?? 0 }}</td>
                <td style="padding: 4px 8px; text-align: center; white-space: nowrap;">
                  <po-button p-icon="po-icon-edit" p-kind="tertiary" (p-click)="editProfissionalHabilitado(i)"></po-button>
                  <po-button p-icon="po-icon-delete" p-kind="tertiary" (p-click)="removeProfissionalHabilitado(i)"></po-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
          <div class="po-md-2" style="display: flex; align-items: flex-end; gap: 4px; padding-bottom: 4px;">
            <po-button
              [p-label]="editandoEscalaIndex === null ? 'Adicionar' : 'Salvar'"
              [p-icon]="editandoEscalaIndex === null ? 'an an-plus' : 'an an-check'"
              (p-click)="addEscala()">
            </po-button>
            <po-button
              *ngIf="editandoEscalaIndex !== null"
              p-label="Cancelar"
              p-kind="tertiary"
              (p-click)="cancelarEdicaoEscala()">
            </po-button>
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
                <td style="padding: 4px 8px; text-align: center; white-space: nowrap;">
                  <po-button p-icon="po-icon-edit" p-kind="tertiary" (p-click)="editEscala(i)"></po-button>
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
          <po-datepicker
            class="po-md-2"
            p-label="Data Início"
            [ngModel]="novoAdiantamento.dataInicio"
            (ngModelChange)="novoAdiantamento.dataInicio = $event"
            name="novoAdiantamentoDataInicio">
          </po-datepicker>
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
                <td style="padding: 4px 8px; text-align: center;">{{ a.dataInicio | date:'dd/MM/yyyy' }}</td>
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
  styles: [`
    .contrato-color-field { display: flex; flex-direction: column; gap: 4px; }
    .contrato-color-field label { font-size: 14px; font-weight: 700; line-height: 24px; }
    .contrato-color-picker {
      width: 100%;
      height: 44px;
      padding: 4px;
      border: 1px solid var(--color-neutral-mid-40, #9da7a9);
      border-radius: 3px;
      background: var(--color-neutral-light-00, #fff);
      cursor: pointer;
    }
  `],
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
  readonly modoExcedenteOptions = MODO_EXCEDENTE_OPTIONS;

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
    profissionais: [],
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
  editandoEscalaIndex: number | null = null;

  novoProfissional: any = {
    profissionalId: null,
    valorHora: null,
    valorFixo: null,
    maxHorasMes: null,
    modoExcedente: null,
  };
  editandoProfissionalIndex: number | null = null;

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
      error: (err) => {
        console.error('Erro ao carregar clientes para o contrato.', err);
        this.poNotification.error('Erro ao carregar a lista de clientes.');
      },
    });
    this.profissionalService.findAll().subscribe({
      next: (data) => {
        this.profissionais = (data || []).map((p: any) => ({ label: p.nome, value: p.id }));
      },
      error: (err) => {
        console.error('Erro ao carregar profissionais para o contrato.', err);
        this.poNotification.error('Erro ao carregar a lista de profissionais.');
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
          dtInicio: contrato.dtInicio ? new Date(contrato.dtInicio) : null,
          dtFim: contrato.dtFim ? new Date(contrato.dtFim) : null,
          tipo: contrato.tipo || 'F',
          valorHora: contrato.valorHora ?? null,
          valorFixo: contrato.valorFixo ?? null,
          isFeriado: !!contrato.isFeriado,
          bloqueado: !!contrato.bloqueado,
          profissionais: (contrato.profissionais || []).map((p: any) => ({
            profissionalId: p.profissionalId,
            valorHora: p.valorHora ?? null,
            valorFixo: p.valorFixo ?? null,
            maxHorasMes: p.maxHorasMes ?? null,
            modoExcedente: p.modoExcedente ?? null,
            saldoBancoHoras: p.saldoBancoHoras ?? 0,
          })),
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
            dataInicio: a.dataInicio ? new Date(a.dataInicio) : null,
          })),
        };
        this.resetNovaEscala();
        this.resetNovoAdiantamento();
        this.resetNovoProfissional();
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
    const escala = {
      ...this.novaEscala,
      diaSemana: Number(this.novaEscala.diaSemana),
      profissionalId: Number(this.novaEscala.profissionalId),
    };

    if (this.editandoEscalaIndex !== null) {
      this.formData.escalas = this.formData.escalas.map((e: any, i: number) =>
        i === this.editandoEscalaIndex ? escala : e,
      );
    } else {
      this.formData.escalas = [...this.formData.escalas, escala];
    }
    this.resetNovaEscala();
  }

  editEscala(index: number) {
    this.editandoEscalaIndex = index;
    this.novaEscala = { ...this.formData.escalas[index] };
  }

  cancelarEdicaoEscala() {
    this.resetNovaEscala();
  }

  removeEscala(index: number) {
    this.formData.escalas = this.formData.escalas.filter((_: any, i: number) => i !== index);
    if (this.editandoEscalaIndex === index) {
      this.resetNovaEscala();
    }
  }

  addProfissionalHabilitado() {
    if (!this.novoProfissional.profissionalId) {
      this.poNotification.warning('Selecione o profissional.');
      return;
    }
    const profissionalId = Number(this.novoProfissional.profissionalId);
    const jaExiste = (this.formData.profissionais || []).some(
      (p: any, i: number) => p.profissionalId === profissionalId && i !== this.editandoProfissionalIndex,
    );
    if (jaExiste) {
      this.poNotification.warning('Este profissional já está habilitado neste contrato.');
      return;
    }

    const item = {
      profissionalId,
      valorHora: this.novoProfissional.valorHora !== null && this.novoProfissional.valorHora !== ''
        ? Number(this.novoProfissional.valorHora) : null,
      valorFixo: this.novoProfissional.valorFixo !== null && this.novoProfissional.valorFixo !== ''
        ? Number(this.novoProfissional.valorFixo) : null,
      maxHorasMes: this.novoProfissional.maxHorasMes !== null && this.novoProfissional.maxHorasMes !== ''
        ? Number(this.novoProfissional.maxHorasMes) : null,
      modoExcedente: this.novoProfissional.modoExcedente || null,
      saldoBancoHoras: this.editandoProfissionalIndex !== null
        ? this.formData.profissionais[this.editandoProfissionalIndex].saldoBancoHoras ?? 0
        : 0,
    };

    if (this.editandoProfissionalIndex !== null) {
      this.formData.profissionais = this.formData.profissionais.map((p: any, i: number) =>
        i === this.editandoProfissionalIndex ? item : p,
      );
    } else {
      this.formData.profissionais = [...this.formData.profissionais, item];
    }
    this.resetNovoProfissional();
  }

  editProfissionalHabilitado(index: number) {
    this.editandoProfissionalIndex = index;
    this.novoProfissional = { ...this.formData.profissionais[index] };
  }

  cancelarEdicaoProfissional() {
    this.resetNovoProfissional();
  }

  removeProfissionalHabilitado(index: number) {
    this.formData.profissionais = this.formData.profissionais.filter((_: any, i: number) => i !== index);
    if (this.editandoProfissionalIndex === index) {
      this.resetNovoProfissional();
    }
  }

  getModoExcedenteLabel(value: string | null): string {
    if (!value) return '—';
    return MODO_EXCEDENTE_OPTIONS.find((m) => m.value === value)?.label || value;
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
      profissionais: (this.formData.profissionais || []).map((p: any) => ({
        profissionalId: Number(p.profissionalId),
        valorHora: p.valorHora ?? undefined,
        valorFixo: p.valorFixo ?? undefined,
        maxHorasMes: p.maxHorasMes ?? undefined,
        modoExcedente: p.modoExcedente ?? undefined,
      })),
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
    this.editandoEscalaIndex = null;
    this.novaEscala = {
      diaSemana: null,
      profissionalId: null,
      horaInicio: '08:30',
      horaFim: '18:00',
      intervaloIni: '11:30',
      intervaloFim: '13:00',
    };
  }

  private resetNovoProfissional() {
    this.editandoProfissionalIndex = null;
    this.novoProfissional = {
      profissionalId: null,
      valorHora: null,
      valorFixo: null,
      maxHorasMes: null,
      modoExcedente: null,
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
