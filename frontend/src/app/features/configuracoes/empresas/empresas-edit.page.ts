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
import { EmpresaAdminService } from '../../../core/services/empresa-admin.service';
import { LocalidadeService } from '../../../core/services/localidade.service';

@Component({
  selector: 'app-empresas-admin-edit-page',
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
  templateUrl: './empresas-edit.page.html',
})
export class EmpresasAdminEditPage implements OnInit {
  private route    = inject(ActivatedRoute);
  private router   = inject(Router);
  private svc      = inject(EmpresaAdminService);
  private localSvc = inject(LocalidadeService);
  private notify   = inject(PoNotificationService);

  id: number | null = null;
  loading     = false;
  saving      = false;
  buscandoCep = false;

  estadoOptions: PoComboOption[] = [];
  municipioOptions: PoComboOption[] = [];

  form: any = {
    name: '', slug: '',
    razaoSocial: '', cnpj: '', inscricaoEstadual: '', inscricaoMunicipal: '',
    telefone: '', celular: '', email: '',
    cep: '', logradouro: '', numero: '', complemento: '', bairro: '', municipio: '', uf: '', pais: 'Brasil',
  };

  get title(): string { return this.id ? 'Editar Empresa' : 'Nova Empresa'; }

  ngOnInit() {
    this.loadEstados();
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
        this.form = {
          name:               data.name               || '',
          slug:               data.slug               || '',
          razaoSocial:        data.razaoSocial        || '',
          cnpj:               data.cnpj               || '',
          inscricaoEstadual:  data.inscricaoEstadual  || '',
          inscricaoMunicipal: data.inscricaoMunicipal || '',
          telefone:           data.telefone           || '',
          celular:            data.celular            || '',
          email:              data.email              || '',
          cep:                data.cep                || '',
          logradouro:         data.logradouro         || '',
          numero:             data.numero             || '',
          complemento:        data.complemento        || '',
          bairro:             data.bairro             || '',
          municipio:          data.municipio          || '',
          uf:                 data.uf                 || '',
          pais:               data.pais               || 'Brasil',
        };
        if (data.uf) this.loadMunicipios(data.uf);
        this.loading = false;
      },
      error: () => { this.notify.error('Erro ao carregar empresa.'); this.loading = false; },
    });
  }

  loadEstados() {
    this.localSvc.findEstados().subscribe({
      next: (list: any[]) => {
        this.estadoOptions = list.map((e) => ({ label: `${e.nome} (${e.sigla})`, value: e.sigla }));
      },
    });
  }

  onUfChange(uf: string) {
    this.form.municipio = '';
    this.municipioOptions = [];
    if (uf) this.loadMunicipios(uf);
  }

  loadMunicipios(sigla: string) {
    this.localSvc.findMunicipios(sigla).subscribe({
      next: (list: any[]) => {
        this.municipioOptions = list.map((m) => ({ label: m.nome, value: m.nome }));
      },
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
          this.form.municipio  = res.localidade || '';
          this.form.uf         = res.uf         || '';
          if (res.uf) this.loadMunicipios(res.uf);
          this.notify.success('Endereço preenchido pelo CEP.');
        }
        this.buscandoCep = false;
      },
      error: () => { this.notify.error('Erro ao buscar CEP na ViaCEP.'); this.buscandoCep = false; },
    });
  }

  save() {
    if (!this.form.name?.trim() || !this.form.slug?.trim()) {
      this.notify.warning('Nome e Slug são obrigatórios.');
      return;
    }
    this.saving = true;
    const req$ = this.id
      ? this.svc.update(this.id, this.form)
      : this.svc.create(this.form);
    req$.subscribe({
      next: () => {
        this.notify.success(this.id ? 'Empresa atualizada.' : 'Empresa criada.');
        this.saving = false;
        this.router.navigate(['/configuracoes/empresas']);
      },
      error: () => { this.notify.error('Erro ao salvar empresa.'); this.saving = false; },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/empresas']);
  }
}
