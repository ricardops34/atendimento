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
import { ProfissionalService } from '../../../core/services/profissional.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profissionais-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-input
          class="po-md-12"
          p-label="Nome *"
          [ngModel]="formData.nome"
          (ngModelChange)="formData.nome = $event"
          name="nome">
        </po-input>
      </div>
      <div class="po-row">
        <po-combo
          class="po-md-12"
          p-label="Usuário do Sistema"
          [p-options]="usuarios"
          [ngModel]="formData.userId"
          (ngModelChange)="formData.userId = $event"
          name="userId"
          p-placeholder="Selecione o usuário vinculado">
        </po-combo>
      </div>
    </po-page-edit>
  `,
})
export class ProfissionaisEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profissionalService = inject(ProfissionalService);
  private userService = inject(UserService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';
  usuarios: PoComboOption[] = [];

  formData: any = {
    nome: '',
    userId: null,
  };

  ngOnInit() {
    this.loadUsuarios();
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar';
      this.loadRecord();
    }
  }

  loadUsuarios() {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.usuarios = (data || []).map((u: any) => ({ label: u.name, value: u.id }));
      },
      error: () => {
        this.usuarios = [];
      },
    });
  }

  loadRecord() {
    this.profissionalService.findOne(this.id!).subscribe({
      next: (data: any) => {
        this.formData = {
          nome: data.nome || '',
          userId: data.user?.id ?? null,
        };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar profissional.');
        this.router.navigate(['/profissionais']);
      },
    });
  }

  save() {
    if (!this.formData.nome?.trim()) {
      this.poNotification.warning('Informe o nome do profissional.');
      return;
    }

    this.saving = true;
    const payload: any = { nome: this.formData.nome.trim() };
    if (this.formData.userId) payload.userId = Number(this.formData.userId);

    const request$ = this.isEdit
      ? this.profissionalService.update(this.id!, payload)
      : this.profissionalService.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Profissional atualizado com sucesso.' : 'Profissional criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/profissionais']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar profissional.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/profissionais']);
  }
}
