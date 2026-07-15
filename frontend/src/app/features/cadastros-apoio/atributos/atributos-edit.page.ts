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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const TIPO_OPTIONS: PoComboOption[] = [
  { label: 'Data', value: 'Data' },
  { label: 'Texto', value: 'Texto' },
  { label: 'Numero', value: 'Numero' },
  { label: 'Email', value: 'Email' },
  { label: 'Senha', value: 'Senha' },
];

const CADASTRO_OPTIONS: PoComboOption[] = [
  { label: 'Cliente', value: 'Cliente' },
  { label: 'Empresa', value: 'Empresa' },
  { label: 'Contrato', value: 'Contrato' },
  { label: 'Profissional', value: 'Profissional' },
];

@Component({
  selector: 'app-atributos-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-input
          class="po-md-6"
          p-label="Título *"
          [ngModel]="formData.titulo"
          (ngModelChange)="formData.titulo = $event"
          name="titulo">
        </po-input>
        <po-combo
          class="po-md-3"
          p-label="Tipo *"
          [p-options]="tipoOptions"
          [ngModel]="formData.tipo"
          (ngModelChange)="formData.tipo = $event"
          name="tipo">
        </po-combo>
        <po-combo
          class="po-md-3"
          p-label="Cadastro *"
          [p-options]="cadastroOptions"
          [ngModel]="formData.cadastro"
          (ngModelChange)="onCadastroChange($event)"
          name="cadastro">
        </po-combo>
      </div>
      <div class="po-row">
        <po-number
          class="po-md-3"
          p-label="Tamanho"
          [(ngModel)]="formData.tamanho"
          name="tamanho">
        </po-number>
        <po-number
          class="po-md-3"
          p-label="Sequência"
          p-help="Ordem de apresentação do atributo dentro do cadastro selecionado. Sugerida automaticamente, mas pode ajustar."
          [(ngModel)]="formData.sequencia"
          name="sequencia">
        </po-number>
        <po-switch
          class="po-md-3"
          p-label="Obrigatório"
          [ngModel]="formData.obrigatorio"
          (ngModelChange)="formData.obrigatorio = $event"
          name="obrigatorio">
        </po-switch>
        <po-switch
          class="po-md-3"
          p-label="Ativo"
          [ngModel]="formData.ativo"
          (ngModelChange)="formData.ativo = $event"
          name="ativo">
        </po-switch>
      </div>
    </po-page-edit>
  `,
})
export class AtributosEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private poNotification = inject(PoNotificationService);

  private apiUrl = `${environment.apiUrl}/atributos`;

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';

  readonly tipoOptions = TIPO_OPTIONS;
  readonly cadastroOptions = CADASTRO_OPTIONS;

  formData: any = {
    titulo: '',
    tipo: 'Texto',
    cadastro: 'Cliente',
    tamanho: null,
    sequencia: 0,
    obrigatorio: false,
    ativo: true,
  };

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar Atributo';
      this.loadRecord();
    } else {
      this.sugerirProximaSequencia(this.formData.cadastro);
    }
  }

  onCadastroChange(cadastro: string) {
    this.formData.cadastro = cadastro;
    if (!this.isEdit) {
      this.sugerirProximaSequencia(cadastro);
    }
  }

  private sugerirProximaSequencia(cadastro: string) {
    this.http.get<any[]>(this.apiUrl, { params: { cadastro } }).subscribe({
      next: (list) => {
        const maiorSequencia = (list || []).reduce((max, a) => Math.max(max, a.sequencia || 0), 0);
        this.formData.sequencia = maiorSequencia + 1;
      },
    });
  }

  loadRecord() {
    this.http.get<any>(`${this.apiUrl}/${this.id}`).subscribe({
      next: (data) => {
        this.formData = {
          titulo: data.titulo || '',
          tipo: data.tipo || 'Texto',
          cadastro: data.cadastro || 'Cliente',
          tamanho: data.tamanho ?? null,
          sequencia: data.sequencia ?? 0,
          obrigatorio: data.obrigatorio === true,
          ativo: data.ativo !== false,
        };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar atributo.');
        this.router.navigate(['/atributos']);
      },
    });
  }

  save() {
    if (!this.formData.titulo?.trim()) {
      this.poNotification.warning('Informe o título.');
      return;
    }
    if (!this.formData.tipo) {
      this.poNotification.warning('Informe o tipo.');
      return;
    }
    if (!this.formData.cadastro) {
      this.poNotification.warning('Informe o cadastro.');
      return;
    }

    this.saving = true;
    const payload: any = {
      titulo: this.formData.titulo.trim(),
      tipo: this.formData.tipo,
      cadastro: this.formData.cadastro,
      sequencia: this.formData.sequencia ?? 0,
      obrigatorio: this.formData.obrigatorio ?? false,
      ativo: this.formData.ativo ?? true,
    };
    if (this.formData.tamanho) payload.tamanho = this.formData.tamanho;

    const request$ = this.isEdit
      ? this.http.patch(`${this.apiUrl}/${this.id}`, payload)
      : this.http.post(this.apiUrl, payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Atributo atualizado com sucesso.' : 'Atributo criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/atributos']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar atributo.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/atributos']);
  }
}
