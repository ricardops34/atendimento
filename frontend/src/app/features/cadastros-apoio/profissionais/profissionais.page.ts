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
import { ProfissionalService } from '../../../core/services/profissional.service';

@Component({
  selector: 'app-profissionais-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoFieldModule],
  templateUrl: './profissionais.page.html',
})
export class ProfissionaisPage implements OnInit {
  @ViewChild(PoModalComponent, { static: true }) modal!: PoModalComponent;

  private profissionalService = inject(ProfissionalService);
  private poNotification = inject(PoNotificationService);

  profissionais: any[] = [];
  loading = false;
  saving = false;
  isEdit = false;
  formData: any = { nome: '' };

  columns = [
    { property: 'id', label: 'ID' },
    { property: 'nome', label: 'Profissional' },
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
    this.profissionalService.findAll().subscribe({
      next: (data) => {
        this.profissionais = data || [];
        this.loading = false;
      },
      error: () => {
        this.profissionais = [];
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
      this.poNotification.warning('Informe o nome do profissional.');
      return;
    }

    this.saving = true;
    const payload = { nome: this.formData.nome.trim() };
    const request$ = this.isEdit
      ? this.profissionalService.update(this.formData.id, payload)
      : this.profissionalService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Profissional atualizado com sucesso.' : 'Profissional criado com sucesso.');
        this.saving = false;
        this.loadData();
        this.modal.close();
      },
      error: () => {
        this.poNotification.error('Erro ao salvar profissional.');
        this.saving = false;
      },
    });
  }

  remove(row: any) {
    this.profissionalService.remove(row.id).subscribe({
      next: () => {
        this.poNotification.success('Profissional excluido com sucesso.');
        this.loadData();
      },
      error: () => {
        this.poNotification.error('Erro ao excluir profissional.');
      },
    });
  }
}
