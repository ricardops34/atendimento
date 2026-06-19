import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoDialogService,
  PoInfoModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { EmpresaService } from '../../../core/services/empresa.service';

@Component({
  selector: 'app-empresas-excluir-page',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule, PoInfoModule],
  template: `
    <po-page-default p-title="Excluir Empresa">
      <div class="po-row" style="margin-top: 16px;">
        <po-info class="po-md-8" p-label="Nome" [p-value]="registro?.nome || '-'"></po-info>
        <po-info class="po-md-4" p-label="Estado" [p-value]="registro?.estado || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-12" p-label="Razão Social" [p-value]="registro?.razao || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-9" p-label="Cidade" [p-value]="registro?.cidade || '-'"></po-info>
      </div>

      <div style="display: flex; gap: 8px; margin-top: 24px;">
        <po-button
          p-label="Confirmar Exclusão"
          p-kind="danger"
          p-icon="po-icon-delete"
          (p-click)="confirmar()">
        </po-button>
        <po-button
          p-label="Cancelar"
          p-kind="secondary"
          (p-click)="cancelar()">
        </po-button>
      </div>
    </po-page-default>
  `,
})
export class EmpresasExcluirPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private poDialog = inject(PoDialogService);
  private poNotification = inject(PoNotificationService);

  registro: any = null;
  id!: number;

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    this.empresaService.findOne(this.id).subscribe({
      next: (data: any) => {
        this.registro = data;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar empresa.');
        this.router.navigate(['/clientes']);
      },
    });
  }

  confirmar() {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: `Confirma a exclusão da empresa "${this.registro?.nome}"?`,
      confirm: () => this.excluir(),
    });
  }

  excluir() {
    this.empresaService.remove(this.id).subscribe({
      next: () => {
        this.poNotification.success('Empresa excluída com sucesso.');
        this.router.navigate(['/clientes']);
      },
      error: () => {
        this.poNotification.error('Erro ao excluir empresa. Verifique se não há contratos vinculados.');
      },
    });
  }

  cancelar() {
    this.router.navigate(['/clientes']);
  }
}
