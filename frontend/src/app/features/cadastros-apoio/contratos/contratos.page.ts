import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  PoButtonModule,
  PoComboOption,
  PoFieldModule,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
  PoPageModule,
  PoTableAction,
  PoTableModule,
} from '@po-ui/ng-components';
import { ContratoService } from '../../../core/services/contrato.service';
import { EmpresaService } from '../../../core/services/empresa.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contratos-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule],
  templateUrl: './contratos.page.html',
})
export class ContratosPage implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) modal!: PoModalComponent;

  private contratoService = inject(ContratoService);
  private empresaService = inject(EmpresaService);
  private poNotification = inject(PoNotificationService);

  contratos: any[] = [];
  empresas: PoComboOption[] = [];
  loading = false;
  saving = false;
  isEdit = false;
  formData: any = {
    empresaId: null,
    descricao: '',
    cor: '#333333',
    isFeriado: false,
  };

  columns = [
    { property: 'id', label: 'ID' },
    { property: 'descricao', label: 'Contrato' },
    { property: 'empresa.nome', label: 'Empresa' },
    { property: 'cor', label: 'Cor' },
    { property: 'isFeriado', label: 'Feriado', type: 'label' },
  ];

  actions: PoTableAction[] = [
    { label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.openEdit(row) },
    { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.remove(row) },
  ];

  ngOnInit() {
    this.loadDependencies();
    this.loadData();
  }

  loadDependencies() {
    this.empresaService.findAll().subscribe({
      next: (data) => {
        this.empresas = (data || []).map((empresa) => ({ label: empresa.nome, value: empresa.id }));
      },
      error: () => {
        this.empresas = [];
      },
    });
  }

  loadData() {
    this.loading = true;
    this.contratoService.findAll().subscribe({
      next: (data) => {
        this.contratos = data || [];
        this.loading = false;
      },
      error: () => {
        this.contratos = [];
        this.loading = false;
      },
    });
  }

  openCreate() {
    this.isEdit = false;
    this.formData = {
      empresaId: this.empresas[0]?.value ?? null,
      descricao: '',
      cor: '#333333',
      isFeriado: false,
    };
    this.modal.open();
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.formData = {
      id: row.id,
      empresaId: row.empresaId,
      descricao: row.descricao,
      cor: row.cor || '#333333',
      isFeriado: !!row.isFeriado,
    };
    this.modal.open();
  }

  save() {
    if (!this.formData.empresaId || !this.formData.descricao?.trim()) {
      this.poNotification.warning('Preencha empresa e descricao.');
      return;
    }

    this.saving = true;
    const payload = {
      empresaId: Number(this.formData.empresaId),
      descricao: this.formData.descricao.trim(),
      cor: this.formData.cor || '#333333',
      isFeriado: !!this.formData.isFeriado,
    };

    const request$ = this.isEdit
      ? this.contratoService.update(this.formData.id, payload)
      : this.contratoService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Contrato atualizado com sucesso.' : 'Contrato criado com sucesso.');
        this.saving = false;
        this.loadData();
        this.modal.close();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar contrato.');
        this.saving = false;
      },
    });
  }

  remove(row: any) {
    this.contratoService.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Contrato excluido com sucesso.');
        this.loadData();
      },
      error: () => {
        this.poNotification.error('Erro ao excluir contrato.');
      },
    });
  }
}
