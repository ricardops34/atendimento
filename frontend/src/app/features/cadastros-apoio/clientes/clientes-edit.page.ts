import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoComboOption,
  PoDividerModule,
  PoFieldModule,
  PoLoadingModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { ClienteService } from '../../../core/services/cliente.service';
import { LocalidadeService } from '../../../core/services/localidade.service';
import { PaisService } from '../../../core/services/pais.service';

@Component({
  selector: 'app-clientes-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PoPageModule,
    PoFieldModule,
    PoButtonModule,
    PoLoadingModule,
    PoDividerModule,
  ],
  templateUrl: './clientes-edit.page.html',
})
export class ClientesEditPage implements OnInit {
  private route    = inject(ActivatedRoute);
  private router   = inject(Router);
  private svc      = inject(ClienteService);
  private localSvc = inject(LocalidadeService);
  private paisSvc  = inject(PaisService);
  private notify   = inject(PoNotificationService);

  id: number | null = null;
  loading     = false;
  saving      = false;
  buscandoCep = false;

  tipoPessoaOptions: PoComboOption[] = [
    { label: 'Pessoa Jurídica (PJ)', value: 'PJ' },
    { label: 'Pessoa Física (PF)',   value: 'PF' },
  ];

  estadoOptions: PoComboOption[] = [];
  municipioOptions: PoComboOption[] = [];
  paisOptions: PoComboOption[] = [];

  form: any = {
    tipoPessoa: 'PJ',
    nome: '', razaoSocial: '', cnpj: '', inscricaoEstadual: '', inscricaoMunicipal: '',
    cpf: '', rg: '', dataNascimento: '',
    telefone: '', celular: '', email: '',
    cep: '', logradouro: '', numero: '', complemento: '', bairro: '', municipioId: null, estadoId: null, paisId: null,
    cor: '',
  };

  get isPJ(): boolean { return this.form.tipoPessoa === 'PJ'; }
  get title(): string { return this.id ? 'Editar' : 'Novo'; }

  ngOnInit() {
    this.loadEstados();
    this.loadPaises();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.loadData();
    }
  }

  loadData() {
    this.loading = true;
    this.svc.findOne(this.id!).subscribe({
      next: (data: any) => {
        const municipioId = data.municipioId || null;

        this.form = {
          tipoPessoa:         data.tipoPessoa === 'J' ? 'PJ' : 'PF',
          nome:               data.nome               || '',
          razaoSocial:        data.razao                || '',
          cnpj:               data.tipoPessoa === 'J' ? data.documento : '',
          cpf:                data.tipoPessoa === 'F' ? data.documento : '',
          dataNascimento:     data.dataNascimento ? data.dataNascimento.substring(0, 10) : '',
          telefone:           data.telefone           || '',
          email:              data.email              || '',
          cep:                data.cep                || '',
          logradouro:         data.endereco         || '',
          numero:             data.numero             || '',
          complemento:        data.complemento        || '',
          bairro:             data.bairro             || '',
          // municipioId só é atribuído após o po-combo ter as options carregadas (ver loadMunicipios)
          municipioId:        null,
          estadoId:           data.estadoId           || null,
          paisId:             data.paisId             || null,
          cor:                data.cor                || '',
        };

        if (this.form.estadoId) {
          this.loadMunicipios(this.form.estadoId, municipioId);
        }

        this.loading = false;
      },
      error: () => {
        this.notify.error('Erro ao carregar cliente.');
        this.loading = false;
        this.router.navigate(['/clientes']);
      },
    });
  }

  loadEstados() {
    this.localSvc.findEstados().subscribe({
      next: (list: any[]) => {
        this.estadoOptions = list.map((e) => ({ label: `${e.nome} (${e.sigla})`, value: e.id, sigla: e.sigla }));
      },
    });
  }

  onUfChange(estadoId: number) {
    this.form.municipioId = null;
    this.municipioOptions = [];
    if (estadoId) this.loadMunicipios(estadoId);
  }

  loadMunicipios(estadoId: number, selectedId?: number | null) {
    this.localSvc.findMunicipios(estadoId).subscribe({
      next: (list: any[]) => {
        this.municipioOptions = list.map((m) => ({ label: m.nome, value: m.id }));
        if (selectedId) {
          setTimeout(() => {
            this.form.municipioId = selectedId;
          }, 50);
        }
      },
    });
  }

  loadPaises() {
    this.paisSvc.search(1, 9999).subscribe({
      next: (res: any) => {
        this.paisOptions = res.items.map((p: any) => ({ label: `${p.nome} (${p.sigla})`, value: p.id }));
        if (!this.id && !this.form.paisId) {
          const brasil = this.paisOptions.find(p => p.label?.includes('Brasil'));
          if (brasil) {
            setTimeout(() => {
              this.form.paisId = brasil.value;
            }, 50);
          }
        }
      }
    });
  }

  buscarCep() {
    const cep = this.form.cep?.replace(/\D/g, '');
    if (!cep || cep.length !== 8) { this.notify.warning('Informe um CEP com 8 dígitos.'); return; }
    this.buscandoCep = true;
    this.localSvc.buscarCep(cep).subscribe({
      next: (res: any) => {
        if (res.erro) { this.notify.warning('CEP não encontrado.'); }
        else {
          this.form.logradouro = res.logradouro || '';
          this.form.bairro     = res.bairro     || '';
          
          if (res.uf) {
            const estadoObj = this.estadoOptions.find(e => (e as any).sigla === res.uf);
            if (estadoObj) {
              this.form.estadoId = estadoObj.value;
              this.localSvc.findMunicipios(estadoObj.value).subscribe(list => {
                this.municipioOptions = list.map((m) => ({ label: m.nome, value: m.id }));
                const normalize = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
                const munMatch = list.find(m => normalize(m.nome) === normalize(res.localidade));
                if (munMatch) {
                  this.form.municipioId = munMatch.id;
                }
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

  save() {
    if (!this.form.nome?.trim()) { this.notify.warning('O nome é obrigatório.'); return; }
    this.saving = true;
    const payload: any = {
      tipoPessoa: this.form.tipoPessoa === 'PJ' ? 'J' : 'F',
      nome: this.form.nome
    };

    if (this.form.razaoSocial) payload.razao = this.form.razaoSocial;
    if (this.form.tipoPessoa === 'PJ' && this.form.cnpj) payload.documento = this.form.cnpj;
    if (this.form.tipoPessoa === 'PF' && this.form.cpf) payload.documento = this.form.cpf;
    if (this.form.telefone) payload.telefone = this.form.telefone;
    if (this.form.email) payload.email = this.form.email;
    if (this.form.cep) payload.cep = this.form.cep.replace(/\D/g, '');
    if (this.form.logradouro) payload.endereco = this.form.logradouro;
    if (this.form.numero) payload.numero = this.form.numero;
    if (this.form.complemento) payload.complemento = this.form.complemento;
    if (this.form.bairro) payload.bairro = this.form.bairro;
    if (this.form.municipioId) payload.municipioId = this.form.municipioId;
    if (this.form.estadoId) payload.estadoId = this.form.estadoId;
    if (this.form.paisId) payload.paisId = this.form.paisId;
    if (this.form.cor) payload.cor = this.form.cor;
    if (this.form.dataNascimento) payload.dataNascimento = this.form.dataNascimento;

    const req$ = this.id ? this.svc.update(this.id, payload) : this.svc.create(payload);
    req$.subscribe({
      next: () => {
        this.notify.success(this.id ? 'Cliente atualizado com sucesso.' : 'Cliente criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/clientes']);
      },
      error: () => { this.notify.error('Erro ao salvar cliente.'); this.saving = false; },
    });
  }

  cancel() {
    this.router.navigate(['/clientes']);
  }
}
