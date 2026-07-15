import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoComboOption, PoFieldModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { MenuService } from '../../../core/services/menu.service';
import { RoutineService } from '../../../core/services/routine.service';
import { SystemModuleService } from '../../../core/services/system-module.service';

@Component({
  selector: 'app-menus-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-combo class="po-md-4" p-label="Modulo" [p-options]="moduleOptions" [ngModel]="formData.moduleId" (ngModelChange)="formData.moduleId = $event" name="moduleId"></po-combo>
        <po-combo class="po-md-4" p-label="Rotina" [p-options]="routineOptions" [ngModel]="formData.routineId" (ngModelChange)="formData.routineId = $event" name="routineId"></po-combo>
        <po-combo class="po-md-4" p-label="Menu Pai" [p-options]="parentOptions" [ngModel]="formData.parentId" (ngModelChange)="formData.parentId = $event" name="parentId"></po-combo>
      </div>
      <div class="po-row">
        <po-input class="po-md-6" p-label="Label *" [ngModel]="formData.label" (ngModelChange)="formData.label = $event" name="label"></po-input>
        <po-input class="po-md-6" p-label="ShortLabel" [ngModel]="formData.shortLabel" (ngModelChange)="formData.shortLabel = $event" name="shortLabel" [p-maxlength]="20"></po-input>
      </div>
      <div class="po-row">
        <po-input class="po-md-4" p-label="Icone" [ngModel]="formData.icon" (ngModelChange)="formData.icon = $event" name="icon"></po-input>
        <po-number class="po-md-4" p-label="Ordem" [ngModel]="formData.sortOrder" (ngModelChange)="formData.sortOrder = $event" name="sortOrder"></po-number>
        <po-switch class="po-md-4" p-label="Ativo" [ngModel]="formData.isActive" (ngModelChange)="formData.isActive = $event" name="isActive"></po-switch>
      </div>
      <div class="po-row">
        <po-input class="po-md-8" p-label="Link" [ngModel]="formData.link" (ngModelChange)="formData.link = $event" name="link"></po-input>
      </div>
    </po-page-edit>
  `,
})
export class MenusEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(MenuService);
  private moduleService = inject(SystemModuleService);
  private routineService = inject(RoutineService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';
  moduleOptions: PoComboOption[] = [];
  routineOptions: PoComboOption[] = [];
  parentOptions: PoComboOption[] = [];
  formData: any = { moduleId: null, routineId: null, parentId: null, label: '', shortLabel: '', icon: '', link: '', sortOrder: 0, isActive: true };

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar';
    }
    this.loadDependencies();
    if (this.isEdit) {
      this.loadRecord();
    }
  }

  loadDependencies() {
    this.moduleService.findAll().subscribe((data) => { this.moduleOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); });
    this.routineService.findAll().subscribe((data) => { this.routineOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); });
    this.service.findAll().subscribe((data) => {
      this.parentOptions = (data || [])
        .filter((item) => item.id !== this.id)
        .map((item) => ({ label: item.label, value: item.id }));
    });
  }

  loadRecord() {
    this.service.findOne(this.id!).subscribe({
      next: (data: any) => {
        this.formData = {
          moduleId: data.moduleId,
          routineId: data.routineId,
          parentId: data.parentId,
          label: data.label || '',
          shortLabel: data.shortLabel || '',
          icon: data.icon || '',
          link: data.link || '',
          sortOrder: data.sortOrder || 0,
          isActive: data.isActive,
        };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar menu.');
        this.router.navigate(['/configuracoes/menus']);
      },
    });
  }

  save() {
    if (!this.formData.label?.trim()) {
      this.poNotification.warning('Preencha o nome do menu.');
      return;
    }

    this.saving = true;
    const payload = { ...this.formData };

    const request$ = this.isEdit
      ? this.service.update(this.id!, payload)
      : this.service.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Menu atualizado com sucesso.' : 'Menu criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/configuracoes/menus']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar menu.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/menus']);
  }
}
