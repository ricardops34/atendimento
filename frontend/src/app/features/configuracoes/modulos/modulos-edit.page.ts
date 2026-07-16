import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoComboOption, PoFieldModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { SystemModuleService } from '../../../core/services/system-module.service';
import { MODULE_ICON_OPTIONS } from './module-icon-options';

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
      <div class="po-row">
        <po-combo class="po-md-5" p-label="Icone" [p-options]="iconOptions" [ngModel]="formData.icon" (ngModelChange)="formData.icon = $event" name="icon">
          <ng-template p-combo-option-template let-option>
            <div class="modulo-icon-option">
              <i [class]="option.value"></i>
              <span>{{ option.label }}</span>
            </div>
          </ng-template>
        </po-combo>
        <div class="po-md-2 modulo-icon-preview">
          <i *ngIf="formData.icon" [class]="formData.icon"></i>
        </div>
      </div>
    </po-page-edit>
  `,
  styles: [`
    .modulo-icon-preview { display: flex; align-items: center; font-size: 28px; }
    .modulo-icon-option { display: flex; align-items: center; gap: 8px; }
    .modulo-icon-option i { font-size: 18px; width: 20px; text-align: center; }
  `],
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
  iconOptions: PoComboOption[] = MODULE_ICON_OPTIONS;
  formData: any = { name: '', key: '', sortOrder: 0, icon: '' };

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
        this.formData = { name: data.name || '', key: data.key || '', sortOrder: data.sortOrder || 0, icon: data.icon || '' };
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
      icon: this.formData.icon?.trim() || null,
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
