import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  PoButtonModule,
  PoFieldModule,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
  PoPageModule,
  PoTableAction,
  PoTableModule,
} from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../../../core/services/empresa.service';

@Component({
  selector: 'app-empresas-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule],
  templateUrl: './empresas.page.html',
})
export class EmpresasPage implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) modal!: PoModalComponent;

  private empresaService = inject(EmpresaService);
  private poNotification = inject(PoNotificationService);

  empresas: any[] = [];
  loading = false;
  saving = false;
  isEdit = false;
  formData: any = { nome: '' };

  columns = [
    { property: 'id', label: 'ID' },
    { property: 'nome', label: 'Empresa' },
  ];

  actions: PoTableAction[] = [
    { label: 'Editar', icon: 'po-icon-edit', action: (row: any) => this.openEdit(row) },
    { label: 'Excluir', icon: 'po-icon-delete', action: (row: any) => this.remove(row) },
  ];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.empresaService.findAll().subscribe({
      next: (data) => {
        this.empresas = data || [];
        this.loading = false;
      },
      error: () => {
        this.empresas = [];
        this.loading = false;
      },
    });
  }

  openCreate() {
    this.isEdit = false;
    this.formData = { nome: '' };
    this.modal.open();
  }

  openEdit(row: any) {
    this.isEdit = true;
    this.formData = { id: row.id, nome: row.nome };
    this.modal.open();
  }

  save() {
    if (!this.formData.nome?.trim()) {
      this.poNotification.warning('Informe o nome da empresa.');
      return;
    }

    this.saving = true;
    const payload = { nome: this.formData.nome.trim() };
    const request$ = this.isEdit
      ? this.empresaService.update(this.formData.id, payload)
      : this.empresaService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Empresa atualizada com sucesso.' : 'Empresa criada com sucesso.');
        this.saving = false;
        this.loadData();
        this.modal.close();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar empresa.');
        this.saving = false;
      },
    });
  }

  remove(row: any) {
    this.empresaService.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Empresa excluida com sucesso.');
        this.loadData();
      },
      error: () => {
        this.poNotification.error('Erro ao excluir empresa.');
      },
    });
  }
}
