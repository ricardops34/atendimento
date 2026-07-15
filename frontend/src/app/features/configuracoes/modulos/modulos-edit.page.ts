import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoFieldModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { SystemModuleService } from '../../../core/services/system-module.service';

@Component({
  selector: 'app-modulos-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-input class="po-md-5" p-label="Nome *" [ngModel]="formData.name" (ngModelChange)="formData.name = $event" name="name"></po-input>
        <po-input class="po-md-5" p-label="Key *" [ngModel]="formData.key" (ngModelChange)="formData.key = $event" name="key"></po-input>
        <po-number class="po-md-2" p-label="Ordem" [ngModel]="formData.sortOrder" (ngModelChange)="formData.sortOrder = $event" name="sortOrder"></po-number>
      </div>
    </po-page-edit>
  `,
})
export class ModulosEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(SystemModuleService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';
  formData: any = { name: '', key: '', sortOrder: 0 };

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar';
      this.loadRecord();
    }
  }

  loadRecord() {
    this.service.findOne(this.id!).subscribe({
      next: (data: any) => {
        this.formData = { name: data.name || '', key: data.key || '', sortOrder: data.sortOrder || 0 };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar modulo.');
        this.router.navigate(['/configuracoes/modulos']);
      },
    });
  }

  save() {
    if (!this.formData.name?.trim() || !this.formData.key?.trim()) {
      this.poNotification.warning('Preencha nome e key.');
      return;
    }

    this.saving = true;
    const payload = {
      name: this.formData.name.trim(),
      key: this.formData.key.trim(),
      sortOrder: Number(this.formData.sortOrder) || 0,
    };

    const request$ = this.isEdit
      ? this.service.update(this.id!, payload)
      : this.service.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Modulo atualizado com sucesso.' : 'Modulo criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/configuracoes/modulos']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar modulo.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/modulos']);
  }
}
