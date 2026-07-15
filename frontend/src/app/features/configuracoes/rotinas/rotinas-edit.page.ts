import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoComboOption, PoFieldModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { RoutineService } from '../../../core/services/routine.service';
import { SystemModuleService } from '../../../core/services/system-module.service';

@Component({
  selector: 'app-rotinas-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-combo class="po-md-6" p-label="Modulo *" [p-options]="moduleOptions" [ngModel]="formData.moduleId" (ngModelChange)="formData.moduleId = $event" name="moduleId"></po-combo>
        <po-input class="po-md-6" p-label="Nome *" [ngModel]="formData.name" (ngModelChange)="formData.name = $event" name="name"></po-input>
      </div>
      <div class="po-row">
        <po-input class="po-md-6" p-label="Key *" [ngModel]="formData.key" (ngModelChange)="formData.key = $event" name="key"></po-input>
        <po-input class="po-md-6" p-label="Path *" [ngModel]="formData.path" (ngModelChange)="formData.path = $event" name="path"></po-input>
      </div>
      <div class="po-row">
        <po-input class="po-md-4" p-label="Icone" [ngModel]="formData.icon" (ngModelChange)="formData.icon = $event" name="icon"></po-input>
        <po-input class="po-md-4" p-label="ShortLabel" [ngModel]="formData.shortLabel" (ngModelChange)="formData.shortLabel = $event" name="shortLabel" [p-maxlength]="20"></po-input>
        <po-number class="po-md-4" p-label="Ordem" [ngModel]="formData.sortOrder" (ngModelChange)="formData.sortOrder = $event" name="sortOrder"></po-number>
      </div>
      <div class="po-row">
        <po-switch class="po-md-4" p-label="Ativa" [ngModel]="formData.isActive" (ngModelChange)="formData.isActive = $event" name="isActive"></po-switch>
      </div>
    </po-page-edit>
  `,
})
export class RotinasEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(RoutineService);
  private moduleService = inject(SystemModuleService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';
  moduleOptions: PoComboOption[] = [];
  formData: any = { moduleId: null, name: '', key: '', path: '', icon: '', shortLabel: '', sortOrder: 0, isActive: true };

  ngOnInit() {
    this.loadDependencies();
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar';
      this.loadRecord();
    }
  }

  loadDependencies() {
    this.moduleService.findAll().subscribe((data) => {
      this.moduleOptions = (data || []).map((item) => ({ label: item.name, value: item.id }));
    });
  }

  loadRecord() {
    this.service.findOne(this.id!).subscribe({
      next: (data: any) => {
        this.formData = {
          moduleId: data.moduleId,
          name: data.name || '',
          key: data.key || '',
          path: data.path || '',
          icon: data.icon || '',
          shortLabel: data.shortLabel || '',
          sortOrder: data.sortOrder || 0,
          isActive: data.isActive,
        };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar rotina.');
        this.router.navigate(['/configuracoes/rotinas']);
      },
    });
  }

  save() {
    if (!this.formData.moduleId || !this.formData.name?.trim() || !this.formData.key?.trim() || !this.formData.path?.trim()) {
      this.poNotification.warning('Preencha modulo, nome, key e path.');
      return;
    }

    this.saving = true;
    const payload = { ...this.formData };

    const request$ = this.isEdit
      ? this.service.update(this.id!, payload)
      : this.service.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Rotina atualizada com sucesso.' : 'Rotina criada com sucesso.');
        this.saving = false;
        this.router.navigate(['/configuracoes/rotinas']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar rotina.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/rotinas']);
  }
}
