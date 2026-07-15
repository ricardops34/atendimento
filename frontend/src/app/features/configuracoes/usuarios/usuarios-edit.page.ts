import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoButtonModule, PoComboOption, PoDividerModule, PoFieldModule, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { UserService } from '../../../core/services/user.service';
import { ProfileService } from '../../../core/services/profile.service';
import { EmpresaAdminService } from '../../../core/services/empresa-admin.service';

@Component({
  selector: 'app-usuarios-edit-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PoPageModule, PoButtonModule, PoFieldModule, PoDividerModule],
  template: `
    <po-page-edit [p-title]="title" (p-save)="save()" (p-cancel)="cancel()">
      <div class="po-row">
        <po-switch class="po-md-2" p-label="Ativo" [ngModel]="formData.isActive" (ngModelChange)="formData.isActive = $event" name="isActive"></po-switch>
        <po-input class="po-md-5" p-label="Nome *" [ngModel]="formData.name" (ngModelChange)="formData.name = $event" name="name"></po-input>
        <po-email class="po-md-5" p-label="Email *" [ngModel]="formData.email" (ngModelChange)="formData.email = $event" name="email"></po-email>
      </div>
      <div class="po-row">
        <po-password class="po-md-6" [p-label]="isEdit ? 'Senha (deixe em branco para nao alterar)' : 'Senha *'" [ngModel]="formData.password" (ngModelChange)="formData.password = $event" name="password"></po-password>
        <po-combo class="po-md-6" p-label="Perfil *" [p-options]="profileOptions" [ngModel]="formData.profileId" (ngModelChange)="formData.profileId = $event" name="profileId"></po-combo>
      </div>

      <po-divider p-label="Vinculos de Empresa"></po-divider>
      <div class="po-row" style="align-items: end;">
        <po-combo class="po-md-8" p-label="Empresa" [p-options]="empresasOptions" [ngModel]="formData.selectedEmpresaId" (ngModelChange)="formData.selectedEmpresaId = $event" name="selectedEmpresaId"></po-combo>
        <div class="po-md-4">
          <po-button p-label="Adicionar" p-icon="an an-plus" (p-click)="addEmpresaLink()"></po-button>
        </div>
      </div>
      <table class="po-table" style="width: 100%; margin-top: 8px;" *ngIf="formData.empresaLinks?.length">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Padrao</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let link of formData.empresaLinks; let i = index">
            <td>{{ resolveEmpresaName(link.empresaId) }}</td>
            <td>{{ link.isDefault ? 'Sim' : '' }}</td>
            <td style="display: flex; gap: 8px;">
              <po-button *ngIf="!link.isDefault" p-label="Definir como padrao" p-kind="tertiary" (p-click)="setDefaultEmpresa(i)"></po-button>
              <po-button p-icon="an an-x" p-kind="tertiary" p-danger="true" (p-click)="removeEmpresaLink(i)"></po-button>
            </td>
          </tr>
        </tbody>
      </table>
    </po-page-edit>
  `,
})
export class UsuariosEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(UserService);
  private profileService = inject(ProfileService);
  private empresaService = inject(EmpresaAdminService);
  private poNotification = inject(PoNotificationService);

  isEdit = false;
  saving = false;
  id: number | null = null;
  title = 'Novo';
  profileOptions: PoComboOption[] = [];
  empresasOptions: PoComboOption[] = [];
  formData: any = this.createEmptyForm();

  ngOnInit() {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.isEdit = true;
      this.id = Number(idParam);
      this.title = 'Editar';
    }
    this.loadDependencies();
  }

  loadDependencies() {
    this.profileService.findAll().subscribe((data) => { this.profileOptions = (data || []).map((item) => ({ label: item.name, value: item.id })); });
    this.empresaService.findAll().subscribe((data) => {
      this.empresasOptions = (data || []).map((item) => ({ label: item.name, value: item.id }));
      if (this.isEdit) {
        this.loadRecord();
      } else {
        this.formData.selectedEmpresaId = this.empresasOptions[0]?.value ?? null;
      }
    });
  }

  loadRecord() {
    this.service.findOne(this.id!).subscribe({
      next: (data: any) => {
        this.formData = {
          name: data.name || '',
          email: data.email || '',
          password: '',
          isActive: data.isActive,
          profileId: data.profileId,
          selectedEmpresaId: this.empresasOptions[0]?.value ?? null,
          empresaLinks: (data.userEmpresas || []).map((link: any) => ({
            empresaId: link.empresaId,
            isDefault: !!link.isDefault,
          })),
        };
      },
      error: () => {
        this.poNotification.error('Erro ao carregar usuario.');
        this.router.navigate(['/configuracoes/usuarios']);
      },
    });
  }

  addEmpresaLink() {
    if (!this.formData.selectedEmpresaId) {
      this.poNotification.warning('Selecione a empresa para adicionar o vinculo.');
      return;
    }

    const empresaId = Number(this.formData.selectedEmpresaId);
    const exists = (this.formData.empresaLinks || []).some((item: any) => Number(item.empresaId) === empresaId);
    if (exists) {
      this.poNotification.warning('Essa empresa ja esta vinculada ao usuario.');
      return;
    }

    this.formData.empresaLinks = [
      ...(this.formData.empresaLinks || []),
      { empresaId, isDefault: !(this.formData.empresaLinks || []).length },
    ];
  }

  removeEmpresaLink(index: number) {
    this.formData.empresaLinks = (this.formData.empresaLinks || []).filter((_: any, currentIndex: number) => currentIndex !== index);
    if (!this.formData.empresaLinks.some((item: any) => item.isDefault) && this.formData.empresaLinks[0]) {
      this.formData.empresaLinks[0].isDefault = true;
    }
  }

  setDefaultEmpresa(index: number) {
    this.formData.empresaLinks = (this.formData.empresaLinks || []).map((item: any, currentIndex: number) => ({
      ...item,
      isDefault: currentIndex === index,
    }));
  }

  resolveEmpresaName(empresaId: number) {
    return this.empresasOptions.find((item) => Number(item.value) === Number(empresaId))?.label || String(empresaId);
  }

  save() {
    if (!this.formData.name?.trim() || !this.formData.email?.trim()) {
      this.poNotification.warning('Preencha nome e email.');
      return;
    }
    if (!this.formData.profileId) {
      this.poNotification.warning('Selecione o perfil do usuario.');
      return;
    }
    if (!this.isEdit && !this.formData.password?.trim()) {
      this.poNotification.warning('Informe a senha do usuario.');
      return;
    }
    if (!(this.formData.empresaLinks || []).length) {
      this.poNotification.warning('Adicione ao menos um vinculo de empresa.');
      return;
    }

    this.saving = true;
    const payload: any = {
      name: this.formData.name.trim(),
      email: this.formData.email.trim(),
      profileId: Number(this.formData.profileId),
      isActive: !!this.formData.isActive,
      empresaLinks: (this.formData.empresaLinks || []).map((item: any) => ({
        empresaId: Number(item.empresaId),
        isDefault: !!item.isDefault,
      })),
    };
    if (this.formData.password?.trim()) payload.password = this.formData.password.trim();

    const request$ = this.isEdit
      ? this.service.update(this.id!, payload)
      : this.service.create(payload);

    request$.subscribe({
      next: () => {
        this.poNotification.success(this.isEdit ? 'Usuario atualizado com sucesso.' : 'Usuario criado com sucesso.');
        this.saving = false;
        this.router.navigate(['/configuracoes/usuarios']);
      },
      error: () => {
        this.poNotification.error('Erro ao salvar usuario.');
        this.saving = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/configuracoes/usuarios']);
  }

  private createEmptyForm() {
    return {
      name: '',
      email: '',
      password: '',
      isActive: true,
      profileId: null,
      selectedEmpresaId: null,
      empresaLinks: [] as any[],
    };
  }
}
