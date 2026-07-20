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
  { label: 'Nacional', value: 'N' },
  { label: 'Estadual', value: 'E' },
  { label: 'Municipal', value: 'M' },
];

@Component({
  selector: 'app-feriados-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-input
          class="po-md-6"
          p-label="Descrição *"
          [ngModel]="formData.descricao"
          (ngModelChange)="formData.descricao = $event"
          name="descricao">
        </po-input>
        <po-datepicker
          class="po-md-6"
          p-label="Data *"
          [ngModel]="formData.data"
          (ngModelChange)="formData.data = $event"
          name="data">
        </po-datepicker>
      </div>
      <div class="po-row">
        <po-combo
          class="po-md-4"
          p-label="Tipo *"
          [p-options]="tipoOptions"
          [ngModel]="formData.tipo"
          (ngModelChange)="formData.tipo = $event"
          name="tipo">
        </po-combo>
        <po-switch
          class="po-md-2"
          p-label="Fixo"
          [ngModel]="formData.fixo"
          (ngModelChange)="formData.fixo = $event"
          name="fixo">
        </po-switch>
        <po-input
          class="po-md-6"
          *ngIf="formData.tipo === 'M'"
          p-label="Município *"
          [ngModel]="formData.municipio"
          (ngModelChange)="formData.municipio = $event"
          name="municipio">
        </po-input>
      </div>
    </po-page-edit>
  `,
})
export class FeriadosEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private poNotification = inject(PoNotificationService);
  
  private apiUrl = `${environment.apiUrl}/feriados`;

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';

  readonly tipoOptions = TIPO_OPTIONS;

  formData: any = {
    descricao: '',
    data: '',
    tipo: 'N',
    fixo: true,
    municipio: '',
  };

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar Feriado';
      this.loadRecord();
    }
  }

  loadRecord() {
    this.http.get<any>(`${this.apiUrl}/${this.id}`).subscribe({
      next: (data) => {
        this.formData = {
          descricao: data.descricao || '',
          data: data.data ? data.data.substring(0, 10) : '',
          tipo: data.tipo || 'N',
          fixo: data.fixo !== false,
          municipio: data.municipio || '',
        };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar feriado.');
        this.router.navigate(['/feriados']);
      },
    });
  }

  save() {
    if (!this.formData.descricao?.trim()) {
      this.poNotification.warning('Informe a descrição.');
      return;
    }
    if (!this.formData.data) {
      this.poNotification.warning('Informe a data.');
      return;
    }

    this.saving = true;
    const payload: any = {
      descricao: this.formData.descricao.trim(),
      data: this.formData.data,
      tipo: this.formData.tipo,
      fixo: this.formData.fixo,
    };
    if (this.formData.tipo === 'M') {
      if (!this.formData.municipio?.trim()) {
        this.poNotification.warning('Informe o município.');
        this.saving = false;
        return;
      }
      payload.municipio = this.formData.municipio.trim();
    }

    const request$ = this.isEdit
      ? this.http.patch(`${this.apiUrl}/${this.id}`, payload)
      : this.http.post(this.apiUrl, payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Feriado atualizado com sucesso.' : 'Feriado criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/feriados']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar feriado.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/feriados']);
  }
}
