import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  PoButtonModule,
  PoCheckboxModule,
  PoComboOption,
  PoDividerModule,
  PoFieldModule,
  PoLoadingModule,
  PoNotificationService,
  PoPageModule,
  PoTagModule,
  PoTagType,
} from '@po-ui/ng-components';
import { ProfissionalFiscalService } from '../../core/services/profissional-fiscal.service';
import { LocalidadeService } from '../../core/services/localidade.service';

const NFD_MARKS_RE = new RegExp(String.fromCharCode(91, 92, 117, 48, 51, 48, 48, 45, 92, 117, 48, 51, 54, 102, 93), 'g');

@Component({
  selector: 'app-meus-dados-fiscais-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PoPageModule,
    PoFieldModule,
    PoButtonModule,
    PoCheckboxModule,
    PoDividerModule,
    PoLoadingModule,
    PoTagModule,
  ],
  template: `
    <po-page-edit p-title="Meus Dados Fiscais (NFS-e)" (p-save)="save()" (p-cancel)="reload()">
      <po-loading-overlay *ngIf="loading" p-text="Carregando..."></po-loading-overlay>

      <ng-container *ngIf="!loading">
        <po-divider p-label="Pessoa Jurídica"></po-divider>
        <div class="po-row">
          <po-input class="po-md-3" p-label="CNPJ" [ngModel]="form.cnpj" (ngModelChange)="form.cnpj = $event" name="cnpj"></po-input>
          <po-button class="po-md-2" p-label="Buscar CNPJ" p-kind="secondary" [p-loading]="buscandoCnpj" (p-click)="buscarCnpj()"></po-button>
          <po-select
            class="po-md-3"
            p-label="Regime Tributário"
            [p-options]="regimeOptions"
            [ngModel]="form.regimeTributario"
            (ngModelChange)="form.regimeTributario = $event"
            name="regimeTributario">
          </po-select>
          <po-checkbox
            class="po-md-4"
            p-label="Optante pelo Simples Nacional"
            [ngModel]="form.optanteSimplesNacional"
            (ngModelChange)="form.optanteSimplesNacional = $event"
            name="optanteSimplesNacional">
          </po-checkbox>
        </div>
        <div class="po-row">
          <po-input class="po-md-5" p-label="Razão Social" [ngModel]="form.razaoSocial" (ngModelChange)="form.razaoSocial = $event" name="razaoSocial"></po-input>
          <po-input class="po-md-4" p-label="Nome Fantasia" [ngModel]="form.nomeFantasia" (ngModelChange)="form.nomeFantasia = $event" name="nomeFantasia"></po-input>
          <po-input class="po-md-3" p-label="Inscrição Municipal" [ngModel]="form.inscricaoMunicipal" (ngModelChange)="form.inscricaoMunicipal = $event" name="inscricaoMunicipal"></po-input>
        </div>
        <div class="po-row">
          <po-input class="po-md-3" p-label="CNAE" [ngModel]="form.cnae" (ngModelChange)="form.cnae = $event" name="cnae"></po-input>
          <po-input class="po-md-4" p-label="Código de Serviço (LC 116)" [ngModel]="form.codigoServico" (ngModelChange)="form.codigoServico = $event" name="codigoServico"></po-input>
          <po-number class="po-md-3" p-label="Alíquota ISS (%)" p-step="0.01" [ngModel]="form.aliquotaIss" (ngModelChange)="form.aliquotaIss = $event" name="aliquotaIss"></po-number>
        </div>

        <po-divider p-label="Endereço Fiscal"></po-divider>
        <div class="po-row">
          <po-input class="po-md-2" p-label="CEP" [ngModel]="form.cep" (ngModelChange)="form.cep = $event" name="cep"></po-input>
          <po-button class="po-md-2" p-label="Buscar CEP" p-kind="secondary" [p-loading]="buscandoCep" (p-click)="buscarCep()"></po-button>
          <po-input class="po-md-5" p-label="Logradouro" [ngModel]="form.logradouro" (ngModelChange)="form.logradouro = $event" name="logradouro"></po-input>
          <po-input class="po-md-3" p-label="Número" [ngModel]="form.numero" (ngModelChange)="form.numero = $event" name="numero"></po-input>
        </div>
        <div class="po-row">
          <po-input class="po-md-4" p-label="Complemento" [ngModel]="form.complemento" (ngModelChange)="form.complemento = $event" name="complemento"></po-input>
          <po-input class="po-md-4" p-label="Bairro" [ngModel]="form.bairro" (ngModelChange)="form.bairro = $event" name="bairro"></po-input>
          <po-select class="po-md-2" p-label="UF" [p-options]="estadoOptions" [ngModel]="form.estadoId" (ngModelChange)="onUfChange($event)" name="estadoId"></po-select>
          <po-select class="po-md-2" p-label="Município" [p-options]="municipioOptions" [ngModel]="form.municipioId" (ngModelChange)="form.municipioId = $event" name="municipioId"></po-select>
        </div>

        <po-divider p-label="Contato para a NFS-e"></po-divider>
        <div class="po-row">
          <po-email class="po-md-4" p-label="E-mail" [ngModel]="form.emailNfse" (ngModelChange)="form.emailNfse = $event" name="emailNfse"></po-email>
          <po-input class="po-md-3" p-label="Telefone" [ngModel]="form.telefoneNfse" (ngModelChange)="form.telefoneNfse = $event" name="telefoneNfse"></po-input>
        </div>

        <po-divider p-label="Certificado Digital A1 (.pfx)"></po-divider>
        <div class="po-row">
          <div class="po-md-12" *ngIf="certificadoNomeArquivo">
            <po-tag [p-type]="certificadoVencido ? tagType.Danger : tagType.Success">
              {{ certificadoNomeArquivo }} — válido até {{ certificadoValidade | date: 'dd/MM/yyyy' }}
              {{ certificadoVencido ? '(VENCIDO)' : '' }}
            </po-tag>
          </div>
          <div class="po-md-12" *ngIf="!certificadoNomeArquivo">
            <po-tag [p-type]="tagType.Warning">Nenhum certificado cadastrado.</po-tag>
          </div>
        </div>
        <div class="po-row">
          <div class="po-md-4">
            <label class="po-label">Arquivo do certificado (.pfx)</label><br />
            <input type="file" accept=".pfx,.p12" (change)="onArquivoSelecionado($event)" />
          </div>
          <po-password class="po-md-3" p-label="Senha do certificado" [ngModel]="senhaCertificado" (ngModelChange)="senhaCertificado = $event" name="senhaCertificado"></po-password>
          <po-button class="po-md-2" p-label="Enviar certificado" p-kind="primary" [p-loading]="enviandoCertificado" [p-disabled]="!arquivoCertificado || !senhaCertificado" (p-click)="enviarCertificado()"></po-button>
          <po-button class="po-md-2" p-label="Remover certificado" [p-danger]="true" [p-disabled]="!certificadoNomeArquivo" (p-click)="removerCertificado()"></po-button>
        </div>
      </ng-container>
    </po-page-edit>
  `,
})
export class MeusDadosFiscaisPage implements OnInit {
  private svc = inject(ProfissionalFiscalService);
  private localSvc = inject(LocalidadeService);
  private notify = inject(PoNotificationService);

  readonly tagType = PoTagType;

  loading = false;
  buscandoCep = false;
  buscandoCnpj = false;
  enviandoCertificado = false;

  estadoOptions: PoComboOption[] = [];
  municipioOptions: PoComboOption[] = [];

  regimeOptions: PoComboOption[] = [
    { label: 'MEI', value: 'MEI' },
    { label: 'Simples Nacional', value: 'SIMPLES_NACIONAL' },
    { label: 'Lucro Presumido', value: 'LUCRO_PRESUMIDO' },
    { label: 'Lucro Real', value: 'LUCRO_REAL' },
  ];

  form: any = {
    cnpj: '', razaoSocial: '', nomeFantasia: '', inscricaoMunicipal: '',
    regimeTributario: null, optanteSimplesNacional: false, cnae: '', codigoServico: '', aliquotaIss: null,
    cep: '', logradouro: '', numero: '', complemento: '', bairro: '', municipioId: null, estadoId: null,
    emailNfse: '', telefoneNfse: '',
  };

  certificadoNomeArquivo: string | null = null;
  certificadoValidade: string | null = null;
  arquivoCertificado: File | null = null;
  senhaCertificado = '';

  get certificadoVencido(): boolean {
    return !!this.certificadoValidade && new Date(this.certificadoValidade).getTime() < Date.now();
  }

  ngOnInit() {
    this.loadEstados();
    this.reload();
  }

  reload() {
    this.loading = true;
    this.svc.findMe().subscribe({
      next: (data: any) => this.aplicarDados(data),
      error: () => {
        this.notify.error('Erro ao carregar seus dados fiscais.');
        this.loading = false;
      },
    });
  }

  private aplicarDados(data: any) {
    const estadoId = data?.estadoId || null;
    this.form = {
      cnpj: data?.cnpj || '',
      razaoSocial: data?.razaoSocial || '',
      nomeFantasia: data?.nomeFantasia || '',
      inscricaoMunicipal: data?.inscricaoMunicipal || '',
      regimeTributario: data?.regimeTributario || null,
      optanteSimplesNacional: !!data?.optanteSimplesNacional,
      cnae: data?.cnae || '',
      codigoServico: data?.codigoServico || '',
      aliquotaIss: data?.aliquotaIss ?? null,
      cep: data?.cep || '',
      logradouro: data?.logradouro || '',
      numero: data?.numero || '',
      complemento: data?.complemento || '',
      bairro: data?.bairro || '',
      municipioId: null,
      estadoId,
      emailNfse: data?.emailNfse || '',
      telefoneNfse: data?.telefoneNfse || '',
    };
    this.certificadoNomeArquivo = data?.certificadoNomeArquivo || null;
    this.certificadoValidade = data?.certificadoValidade || null;
    this.arquivoCertificado = null;
    this.senhaCertificado = '';

    if (estadoId) this.loadMunicipios(estadoId, data?.municipioId || null);
    this.loading = false;
  }

  loadEstados() {
    this.localSvc.findEstados().subscribe({
      next: (list) => { this.estadoOptions = list.map((e) => ({ label: `${e.nome} (${e.sigla})`, value: e.id, sigla: (e as any).sigla })); },
    });
  }

  onUfChange(estadoId: number) {
    this.form.estadoId = estadoId;
    this.form.municipioId = null;
    this.municipioOptions = [];
    if (estadoId) this.loadMunicipios(estadoId);
  }

  loadMunicipios(estadoId: number, selectedId?: number | null) {
    this.localSvc.findMunicipios(estadoId).subscribe({
      next: (list) => {
        this.municipioOptions = list.map((m) => ({ label: m.nome, value: m.id }));
        if (selectedId) {
          setTimeout(() => { this.form.municipioId = selectedId; }, 50);
        }
      },
    });
  }

  buscarCep() {
    const cep = this.form.cep?.replace(/\D/g, '');
    if (!cep || cep.length !== 8) { this.notify.warning('Informe um CEP com 8 dígitos.'); return; }
    this.buscandoCep = true;
    this.localSvc.buscarCep(cep).subscribe({
      next: (res: any) => {
        if (res.erro) {
          this.notify.warning('CEP não encontrado.');
        } else {
          this.form.logradouro = res.logradouro || '';
          this.form.bairro = res.bairro || '';
          if (res.uf) {
            const estadoObj = this.estadoOptions.find((e) => (e as any).sigla === res.uf);
            if (estadoObj) {
              this.form.estadoId = estadoObj.value;
              this.localSvc.findMunicipios(estadoObj.value as number).subscribe((list) => {
                this.municipioOptions = list.map((m) => ({ label: m.nome, value: m.id }));
                const normalize = (str: string) => (str ? str.normalize('NFD').replace(NFD_MARKS_RE, '').toLowerCase() : '');
                const munMatch = list.find((m) => normalize(m.nome) === normalize(res.localidade));
                if (munMatch) this.form.municipioId = munMatch.id;
              });
            }
          }
          this.notify.success('Endereço preenchido pelo CEP.');
        }
        this.buscandoCep = false;
      },
      error: () => { this.notify.error('Erro ao buscar CEP na ViaCEP.'); this.buscandoCep = false; },
    });
  }

  buscarCnpj() {
    const cnpj = this.form.cnpj?.replace(/\D/g, '');
    if (!cnpj || cnpj.length !== 14) { this.notify.warning('Informe um CNPJ com 14 dígitos.'); return; }
    this.buscandoCnpj = true;
    this.localSvc.buscarCnpj(cnpj).subscribe({
      next: (res: any) => {
        this.form.razaoSocial = res.razao_social || this.form.razaoSocial;
        this.form.nomeFantasia = res.nome_fantasia || this.form.nomeFantasia;
        this.form.telefoneNfse = res.ddd_telefone_1 || this.form.telefoneNfse;
        this.form.emailNfse = res.email || this.form.emailNfse;
        this.form.cep = res.cep || this.form.cep;
        this.form.logradouro = res.logradouro || this.form.logradouro;
        this.form.numero = res.numero || this.form.numero;
        this.form.complemento = res.complemento || this.form.complemento;
        this.form.bairro = res.bairro || this.form.bairro;

        if (res.uf) {
          const estadoObj = this.estadoOptions.find((e) => (e as any).sigla === res.uf);
          if (estadoObj) {
            this.form.estadoId = estadoObj.value;
            this.localSvc.findMunicipios(estadoObj.value as number).subscribe((list) => {
              this.municipioOptions = list.map((m) => ({ label: m.nome, value: m.id }));
              const normalize = (str: string) => (str ? str.normalize('NFD').replace(NFD_MARKS_RE, '').toLowerCase() : '');
              const munMatch = list.find((m) => normalize(m.nome) === normalize(res.municipio));
              if (munMatch) this.form.municipioId = munMatch.id;
            });
          }
        }
        this.notify.success('Dados preenchidos pelo CNPJ.');
        this.buscandoCnpj = false;
      },
      error: () => { this.notify.error('CNPJ não encontrado ou erro ao consultar a BrasilAPI.'); this.buscandoCnpj = false; },
    });
  }

  onArquivoSelecionado(event: Event) {
    const input = event.target as HTMLInputElement;
    this.arquivoCertificado = input.files?.[0] || null;
  }

  enviarCertificado() {
    if (!this.arquivoCertificado || !this.senhaCertificado) return;
    this.enviandoCertificado = true;
    this.svc.uploadMeCertificado(this.arquivoCertificado, this.senhaCertificado).subscribe({
      next: (data: any) => {
        this.notify.success('Certificado enviado com sucesso.');
        this.certificadoNomeArquivo = data?.certificadoNomeArquivo || null;
        this.certificadoValidade = data?.certificadoValidade || null;
        this.arquivoCertificado = null;
        this.senhaCertificado = '';
        this.enviandoCertificado = false;
      },
      error: (err) => {
        this.notify.error(err?.error?.message || 'Erro ao enviar o certificado.');
        this.enviandoCertificado = false;
      },
    });
  }

  removerCertificado() {
    this.svc.removeMeCertificado().subscribe({
      next: () => {
        this.notify.success('Certificado removido.');
        this.certificadoNomeArquivo = null;
        this.certificadoValidade = null;
      },
      error: () => this.notify.error('Erro ao remover o certificado.'),
    });
  }

  save() {
    const payload = { ...this.form };
    this.svc.updateMe(payload).subscribe({
      next: () => this.notify.success('Dados fiscais atualizados com sucesso.'),
      error: (err) => this.notify.error(err?.error?.message || 'Erro ao salvar os dados fiscais.'),
    });
  }
}
