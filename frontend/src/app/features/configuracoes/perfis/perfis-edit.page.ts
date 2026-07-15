import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoComboOption, PoFieldModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { ProfileService } from '../../../core/services/profile.service';
import { MenuService } from '../../../core/services/menu.service';

@Component({
  selector: 'app-perfis-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-input class="po-md-12" p-label="Nome *" [ngModel]="formData.name" (ngModelChange)="formData.name = $event" name="name"></po-input>
      </div>
      <div class="po-row">
        <po-multiselect class="po-md-12" p-label="Menus" [p-options]="menuOptions" [ngModel]="formData.menuIds" (ngModelChange)="formData.menuIds = $event" name="menuIds"></po-multiselect>
      </div>
    </po-page-edit>
  `,
})
export class PerfisEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProfileService);
  private menuService = inject(MenuService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';
  menuOptions: PoComboOption[] = [];
  formData: any = { name: '', menuIds: [] as Array<number | string> };

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
    this.menuService.findAll().subscribe((data) => {
      this.menuOptions = (data || []).map((item) => ({
        label: item.parent?.label ? `${item.parent.label} > ${item.label}` : item.label,
        value: item.id,
      }));
    });
  }

  loadRecord() {
    this.service.findOne(this.id!).subscribe({
      next: (data: any) => {
        this.formData = {
          name: data.name || '',
          menuIds: (data.profileMenus || []).map((pm: any) => pm.menuId),
        };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar perfil.');
        this.router.navigate(['/configuracoes/perfis']);
      },
    });
  }

  save() {
    if (!this.formData.name?.trim()) {
      this.poNotification.warning('Preencha o nome do perfil.');
      return;
    }

    this.saving = true;
    const payload = {
      name: this.formData.name.trim(),
      menuIds: (this.formData.menuIds || []).map((value: number | string) => Number(value)),
    };

    const request$ = this.isEdit
      ? this.service.update(this.id!, payload)
      : this.service.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Perfil atualizado com sucesso.' : 'Perfil criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/configuracoes/perfis']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar perfil.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/perfis']);
  }
}
