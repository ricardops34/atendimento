import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoComboOption,
  PoFieldModule,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
  PoPageModule,
  PoTableAction,
  PoTableColumn,
  PoTableModule,
} from '@po-ui/ng-components';
import { MenuService } from '../../../core/services/menu.service';
import { RoutineService } from '../../../core/services/routine.service';
import { SystemModuleService } from '../../../core/services/system-module.service';
import { orderMenuDetails } from './menu-detail-order';

interface MenuDetail {
  id?: number;
  routineId: number;
  moduleId: number;
  module: string;
  routine: string;
  link?: string;
  sortOrder: number;
  isActive: boolean;
}

@Component({
  selector: 'app-menus-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PoPageModule,
    PoButtonModule,
    PoFieldModule,
    PoTableModule,
    PoModalModule,
  ],
  template: `
    <po-page-edit [p-title]="title" [p-disable-submit]="saving" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-input class="po-md-8" p-label="Titulo *" [ngModel]="formData.title" (ngModelChange)="formData.title = $event" name="title"></po-input>
        <po-switch class="po-md-4" p-label="Ativo" [ngModel]="formData.isActive" (ngModelChange)="formData.isActive = $event" name="isActive"></po-switch>
      </div>

      <div class="po-row po-mt-4">
        <div class="po-md-8"><h3>Itens do Menu</h3></div>
        <div class="po-md-4 po-text-right">
          <po-button p-label="Adicionar item" p-icon="an an-plus" (p-click)="openNewItem()"></po-button>
        </div>
      </div>

      <po-table
         [p-columns]="itemColumns"
         [p-items]="items"
         [p-actions]="itemActions"
         [p-sort]="true"
         [p-hide-columns-manager]="true">
      </po-table>
    </po-page-edit>

    <po-modal #itemModal [p-title]="itemModalTitle">
      <div class="po-row">
        <po-combo class="po-md-6" p-label="Modulo *" [p-options]="moduleOptions" [ngModel]="itemForm.moduleId" (ngModelChange)="selectModule($event)" name="moduleId"></po-combo>
        <po-combo class="po-md-6" p-label="Rotina *" [p-options]="routineOptions" [ngModel]="itemForm.routineId" (ngModelChange)="itemForm.routineId = $event" name="routineId"></po-combo>
      </div>
      <div class="po-row">
        <po-number class="po-md-6" p-label="Ordem" [ngModel]="itemForm.sortOrder" (ngModelChange)="itemForm.sortOrder = $event" name="sortOrder"></po-number>
        <po-switch class="po-md-6" p-label="Ativo" [ngModel]="itemForm.isActive" (ngModelChange)="itemForm.isActive = $event" name="itemIsActive"></po-switch>
      </div>
      <po-modal-footer>
        <po-button p-label="Cancelar" p-kind="secondary" (p-click)="itemModal.close()"></po-button>
        <po-button p-label="Confirmar" p-kind="primary" (p-click)="confirmItem()"></po-button>
      </po-modal-footer>
    </po-modal>
  `,
})
export class MenusEditPage implements OnInit {
  @ViewChild('itemModal', { static: false }) itemModal?: PoModalComponent;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(MenuService);
  private routineService = inject(RoutineService);
  private moduleService = inject(SystemModuleService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo Menu';
  formData = { title: '', isActive: true };
  items: MenuDetail[] = [];
  moduleOptions: PoComboOption[] = [];
  routineOptions: PoComboOption[] = [];
  itemModalTitle = 'Novo Item do Menu';
  itemForm = this.emptyItemForm();
  private routines: any[] = [];
  private editingRoutineId: number | null = null;

  itemColumns: PoTableColumn[] = [
    { property: 'module', label: 'Modulo', sortable: true },
    { property: 'routine', label: 'Rotina', sortable: true },
    { property: 'link', label: 'Link', sortable: true },
    { property: 'sortOrder', label: 'Ordem', type: 'number', sortable: true },
    { property: 'isActive', label: 'Ativo', type: 'boolean', sortable: true },
  ];

  itemActions: PoTableAction[] = [
    { label: 'Editar', icon: 'an an-pencil-simple', action: (item: any) => this.editItem(item as MenuDetail) },
    { label: 'Excluir', icon: 'an an-trash', action: (item: any) => this.removeItem(item as MenuDetail) },
  ];

  ngOnInit() {
    this.loadDependencies();
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar Menu';
      this.loadRecord();
    }
  }

  openNewItem() {
    this.editingRoutineId = null;
    this.itemModalTitle = 'Novo Item do Menu';
    const nextOrder = this.items.length ? Math.max(...this.items.map((item) => item.sortOrder)) + 10 : 10;
    this.itemForm = { ...this.emptyItemForm(), sortOrder: nextOrder };
    this.refreshRoutineOptions();
    this.itemModal?.open();
  }

  editItem(item: MenuDetail) {
    this.editingRoutineId = item.routineId;
    this.itemModalTitle = 'Editar Item do Menu';
    this.itemForm = {
      moduleId: item.moduleId,
      routineId: item.routineId,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    };
    this.refreshRoutineOptions();
    this.itemModal?.open();
  }

  removeItem(item: MenuDetail) {
    this.items = this.items.filter((current) => current.routineId !== item.routineId);
  }

  selectModule(moduleId: number | null) {
    this.itemForm.moduleId = moduleId;
    const selected = this.routines.find((routine) => routine.id === Number(this.itemForm.routineId));
    if (selected && selected.moduleId !== Number(moduleId)) this.itemForm.routineId = null;
    this.refreshRoutineOptions();
  }

  confirmItem() {
    const module = this.moduleOptions.find((option) => Number(option.value) === Number(this.itemForm.moduleId));
    const routine = this.routines.find((item) => item.id === Number(this.itemForm.routineId));
    if (!module || !routine) {
      this.poNotification.warning('Selecione o modulo e a rotina.');
      return;
    }
    const duplicated = this.items.some((item) =>
      item.routineId === routine.id && item.routineId !== this.editingRoutineId
    );
    if (duplicated) {
      this.poNotification.warning('Esta rotina ja faz parte do menu.');
      return;
    }

    const detail: MenuDetail = {
      routineId: routine.id,
      moduleId: routine.moduleId,
      module: String(module.label),
      routine: routine.name,
      link: routine.path,
      sortOrder: Number(this.itemForm.sortOrder) || 0,
      isActive: this.itemForm.isActive !== false,
    };
    if (this.editingRoutineId === null) {
      this.items = [...this.items, detail];
    } else {
      this.items = this.items.map((item) => item.routineId === this.editingRoutineId ? detail : item);
    }
    this.items = orderMenuDetails(this.items);
    this.itemModal?.close();
  }

  save() {
    if (!this.formData.title.trim()) {
      this.poNotification.warning('Preencha o titulo do menu.');
      return;
    }
    this.saving = true;
    const payload = {
      title: this.formData.title.trim(),
      isActive: this.formData.isActive,
      items: this.items.map((item) => ({
        routineId: item.routineId,
        sortOrder: item.sortOrder,
        isActive: item.isActive,
      })),
    };
    const request$ = this.isEdit ? this.service.update(this.id!, payload) : this.service.create(payload);
    request$.subscribe({
      next: () => { this.poNotification.success('Menu salvo com sucesso.'); this.saving = false; this.cancel(); },
      error: () => { this.poNotification.error('Erro ao salvar menu.'); this.saving = false; },
    });
  }

  cancel() { this.router.navigate(['/configuracoes/menus']); }

  private loadDependencies() {
    this.moduleService.findAll().subscribe((data) => {
      this.moduleOptions = (data || []).map((item) => ({ label: item.name, value: item.id }));
    });
    this.routineService.findAll().subscribe((data) => {
      this.routines = (data || []).filter((item) =>
        !['dashboard-home', 'configuracoes-home', 'configuracoes-menus-rotinas'].includes(item.key)
      );
      this.refreshRoutineOptions();
    });
  }

  private loadRecord() {
    this.service.findOne(this.id!).subscribe({
      next: (data) => {
        this.formData = { title: data.title || '', isActive: data.isActive };
        this.items = orderMenuDetails((data.items || []).map((item: any) => ({
          id: item.id,
          routineId: item.routineId,
          moduleId: item.moduleId,
          module: item.module,
          routine: item.routine,
          link: item.link,
          sortOrder: item.sortOrder || 0,
          isActive: item.isActive,
        })));
      },
      error: () => { this.poNotification.error('Erro ao carregar menu.'); this.cancel(); },
    });
  }

  private refreshRoutineOptions() {
    const moduleId = Number(this.itemForm.moduleId);
    this.routineOptions = this.routines
      .filter((item) => !moduleId || item.moduleId === moduleId)
      .map((item) => ({ label: item.name, value: item.id }));
  }

  private emptyItemForm() {
    return {
      moduleId: null as number | null,
      routineId: null as number | null,
      sortOrder: 0,
      isActive: true,
    };
  }
}
