import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoFieldModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { EmpresaService } from '../../../core/services/empresa.service';

@Component({
  selector: 'app-empresas-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-input
          class="po-md-8"
          p-label="Nome *"
          [ngModel]="formData.nome"
          (ngModelChange)="formData.nome = $event"
          name="nome">
        </po-input>
        <po-input
          class="po-md-4"
          p-label="Cor na Agenda (hex)"
          [ngModel]="formData.cor"
          (ngModelChange)="formData.cor = $event"
          name="cor"
          p-placeholder="#RRGGBB">
        </po-input>
      </div>
      <div class="po-row">
        <po-input
          class="po-md-12"
          p-label="Razão Social"
          [ngModel]="formData.razao"
          (ngModelChange)="formData.razao = $event"
          name="razao">
        </po-input>
      </div>
      <div class="po-row">
        <po-input
          class="po-md-12"
          p-label="Endereço"
          [ngModel]="formData.endereco"
          (ngModelChange)="formData.endereco = $event"
          name="endereco">
        </po-input>
      </div>
      <div class="po-row">
        <po-input
          class="po-md-9"
          p-label="Cidade"
          [ngModel]="formData.cidade"
          (ngModelChange)="formData.cidade = $event"
          name="cidade">
        </po-input>
        <po-input
          class="po-md-3"
          p-label="Estado (UF)"
          [ngModel]="formData.estado"
          (ngModelChange)="formData.estado = $event"
          name="estado"
          [p-maxlength]="2">
        </po-input>
      </div>
    </po-page-edit>
  `,
})
export class EmpresasEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;

  title = 'Nova Empresa';

  formData: any = {
    nome: '',
    razao: '',
    cor: '',
    endereco: '',
    cidade: '',
    estado: '',
  };

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar Empresa';
      this.loadRecord();
    }
  }

  loadRecord() {
    this.empresaService.findOne(this.id!).subscribe({
      next: (data: any) => {
        this.formData = {
          nome: data.nome || '',
          razao: data.razao || '',
          cor: data.cor || '',
          endereco: data.endereco || '',
          cidade: data.cidade || '',
          estado: data.estado || '',
        };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar empresa.');
        this.router.navigate(['/clientes']);
      },
    });
  }

  save() {
    if (!this.formData.nome?.trim()) {
      this.poNotification.warning('Informe o nome da empresa.');
      return;
    }

    this.saving = true;
    const payload: any = { nome: this.formData.nome.trim() };
    if (this.formData.razao?.trim()) payload.razao = this.formData.razao.trim();
    if (this.formData.cor?.trim()) payload.cor = this.formData.cor.trim();
    if (this.formData.endereco?.trim()) payload.endereco = this.formData.endereco.trim();
    if (this.formData.cidade?.trim()) payload.cidade = this.formData.cidade.trim();
    if (this.formData.estado?.trim()) payload.estado = this.formData.estado.trim().toUpperCase().substring(0, 2);

    const request$ = this.isEdit
      ? this.empresaService.update(this.id!, payload)
      : this.empresaService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Empresa atualizada com sucesso.' : 'Empresa criada com sucesso.');
        this.saving = false;
        this.router.navigate(['/clientes']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar empresa.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/clientes']);
  }
}
