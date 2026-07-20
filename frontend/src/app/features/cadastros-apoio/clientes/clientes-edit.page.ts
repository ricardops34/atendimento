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
  PoTabsModule,
} from '@po-ui/ng-components';
import { ClienteService } from '../../../core/services/cliente.service';
import { LocalidadeService } from '../../../core/services/localidade.service';
import { PaisService } from '../../../core/services/pais.service';
import { AtributoService } from '../../../core/services/atributo.service';
import { UserService } from '../../../core/services/user.service';

interface ClienteAtributoLinha {
  atributoId: number | null;
  conteudo: any;
}

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
    PoTabsModule,
  ],
  templateUrl: './clientes-edit.page.html',
  styleUrl: './clientes-edit.page.css',
})
export class ClientesEditPage implements OnInit {
  private route       = inject(ActivatedRoute);
  private router      = inject(Router);
  private svc         = inject(ClienteService);
  private localSvc    = inject(LocalidadeService);
  private paisSvc     = inject(PaisService);
  private atributoSvc = inject(AtributoService);
  private userSvc     = inject(UserService);
  private notify      = inject(PoNotificationService);

  id: number | null = null;
  loading     = false;
  saving      = false;
  buscandoCep = false;

  private catalogoAtributosPronto = false;
  private clienteAtributosProntos = false;

  tipoPessoaOptions: PoComboOption[] = [
    { label: 'Pessoa Jurídica (PJ)', value: 'PJ' },
    { label: 'Pessoa Física (PF)',   value: 'PF' },
  ];

  estadoOptions: PoComboOption[] = [];
  municipioOptions: PoComboOption[] = [];
  paisOptions: PoComboOption[] = [];

  atributoCatalogo: any[] = [];

  get temAtributosParaCadastro(): boolean {
    return this.atributoCatalogo.length > 0;
  }

  // Vínculo com o usuário de login do Portal do Cliente (feature 003-acesso-cliente-atendimentos).
  // O usuário em si é cadastrado/gerenciado na tela de Usuários; aqui só selecionamos qual já existe.
  usuarioOptions: PoComboOption[] = [];

  form: any = {
    tipoPessoa: 'PJ',
    nome: '', razaoSocial: '', cnpj: '', inscricaoEstadual: '', inscricaoMunicipal: '',
    cpf: '', rg: '', dataNascimento: '',
    telefone: '', celular: '', email: '',
    cep: '', logradouro: '', numero: '', complemento: '', bairro: '', municipioId: null, estadoId: null, paisId: null,
    cor: '',
    usuarioId: null,
    atributos: [] as ClienteAtributoLinha[],
  };

  get isPJ(): boolean { return this.form.tipoPessoa === 'PJ'; }
  get title(): string { return this.id ? 'Editar' : 'Novo'; }

  ngOnInit() {
    this.loadEstados();
    this.loadPaises();
    this.loadAtributoCatalogo();
    this.loadUsuarios();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.loadData();
    } else {
      this.clienteAtributosProntos = true;
      this.tentarMontarLinhasAtributos();
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
          usuarioId:          data.usuario?.id         ?? null,
          atributos:          data.atributos          || [],
        };

        if (this.form.estadoId) {
          this.loadMunicipios(this.form.estadoId, municipioId);
        }

        this.clienteAtributosProntos = true;
        this.tentarMontarLinhasAtributos();

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

  loadAtributoCatalogo() {
    this.atributoSvc.findAll('Cliente').subscribe({
      next: (list: any[]) => {
        this.atributoCatalogo = list || [];
        this.catalogoAtributosPronto = true;
        this.tentarMontarLinhasAtributos();
      },
    });
  }

  loadUsuarios() {
    this.userSvc.findAll().subscribe({
      next: (list: any[]) => {
        this.usuarioOptions = (list || []).map((u) => ({ label: `${u.name} (${u.email})`, value: u.id }));
      },
    });
  }

  private tentarMontarLinhasAtributos() {
    if (!this.catalogoAtributosPronto || !this.clienteAtributosProntos) return;

    const existentes: ClienteAtributoLinha[] = this.form.atributos || [];
    const valoresExistentes = new Map(existentes.map((a) => [a.atributoId, a.conteudo]));

    // Form dinâmico: uma linha para cada atributo ativo do catálogo (já ordenado por sequência).
    const linhasAtivas = this.atributoCatalogo
      .filter((a) => a.ativo)
      .map((a) => ({ atributoId: a.id, conteudo: valoresExistentes.get(a.id) ?? '' }));

    // Preserva valores já preenchidos de atributos que foram desativados depois (não perde histórico).
    const idsAtivos = new Set(linhasAtivas.map((l) => l.atributoId));
    const linhasLegado = existentes.filter((a) => !idsAtivos.has(a.atributoId));

    this.form.atributos = [...linhasAtivas, ...linhasLegado];
  }

  private atributoDoCatalogo(atributoId: number | null) {
    return this.atributoCatalogo.find((a) => a.id === atributoId);
  }

  isAtributoObrigatorio(atributoId: number | null): boolean {
    const atributo = this.atributoDoCatalogo(atributoId);
    return !!atributo?.obrigatorio && !!atributo?.ativo;
  }

  isAtributoInativo(atributoId: number | null): boolean {
    const atributo = this.atributoDoCatalogo(atributoId);
    return !!atributo && !atributo.ativo;
  }

  temAtributoLegadoInativo(): boolean {
    return (this.form.atributos as ClienteAtributoLinha[]).some((a) => this.isAtributoInativo(a.atributoId));
  }

  labelAtributo(atributoId: number | null): string {
    const atributo = this.atributoDoCatalogo(atributoId);
    if (!atributo) return '';
    let label = atributo.titulo;
    if (atributo.obrigatorio && atributo.ativo) label += ' *';
    if (!atributo.ativo) label += ' (inativo)';
    return label;
  }

  tipoAtributo(atributoId: number | null): string {
    return this.atributoDoCatalogo(atributoId)?.tipo || 'Texto';
  }

  tamanhoAtributo(atributoId: number | null): number | null {
    return this.atributoDoCatalogo(atributoId)?.tamanho ?? null;
  }

  larguraAtributo(atributoId: number | null): string {
    const atributo = this.atributoDoCatalogo(atributoId);
    const tipo = atributo?.tipo || 'Texto';
    if (tipo === 'Data' || tipo === 'Numero' || tipo === 'Senha') return 'po-md-3';
    if (tipo === 'Email') return 'po-md-4';

    const tamanho = atributo?.tamanho || 255;
    if (tamanho <= 20) return 'po-md-3';
    if (tamanho <= 60) return 'po-md-4';
    return 'po-md-6';
  }

  removerLinhaAtributo(index: number) {
    this.form.atributos = this.form.atributos.filter((_: ClienteAtributoLinha, i: number) => i !== index);
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

    const atributos: ClienteAtributoLinha[] = this.form.atributos || [];
    for (const item of atributos) {
      const preenchido = item.conteudo !== null && item.conteudo !== undefined && String(item.conteudo).trim() !== '';
      if (this.isAtributoObrigatorio(item.atributoId) && !preenchido) {
        this.notify.warning(`Preencha o atributo obrigatório "${this.atributoDoCatalogo(item.atributoId)?.titulo}".`);
        return;
      }
    }

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
    // Sempre enviado (mesmo null), para permitir desvincular o usuário do portal.
    payload.usuarioId = this.form.usuarioId ?? null;

    const atributosPreenchidos = atributos
      .filter((a) => a.atributoId && a.conteudo !== null && a.conteudo !== undefined && String(a.conteudo).trim() !== '')
      .map((a) => ({ atributoId: a.atributoId, conteudo: a.conteudo }));
    if (atributosPreenchidos.length) payload.atributos = atributosPreenchidos;

    const req$ = this.id ? this.svc.update(this.id, payload) : this.svc.create(payload);
    req$.subscribe({
      next: () => {
        this.notify.success(this.id ? 'Cliente atualizado com sucesso.' : 'Cliente criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/clientes']);
      },
      error: (err) => { this.notify.error(err?.error?.message || 'Erro ao salvar cliente.'); this.saving = false; },
    });
  }

  cancel() {
    this.router.navigate(['/clientes']);
  }
}
