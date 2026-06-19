import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoInfoModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { EmpresaService } from '../../../core/services/empresa.service';

@Component({
  selector: 'app-empresas-detail-page',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule, PoInfoModule],
  template: `
    <po-page-default p-title="Empresa">
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <po-button p-label="Editar" p-icon="po-icon-edit" (p-click)="onEdit()"></po-button>
        <po-button p-label="Voltar" p-kind="secondary" (p-click)="onBack()"></po-button>
      </div>

      <div class="po-row" style="margin-top: 16px;">
        <po-info class="po-md-8" p-label="Nome" [p-value]="registro?.nome || '-'"></po-info>
        <po-info class="po-md-4" p-label="Cor" [p-value]="registro?.cor || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-12" p-label="Razão Social" [p-value]="registro?.razao || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-12" p-label="Endereço" [p-value]="registro?.endereco || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-9" p-label="Cidade" [p-value]="registro?.cidade || '-'"></po-info>
        <po-info class="po-md-3" p-label="Estado" [p-value]="registro?.estado || '-'"></po-info>
      </div>
    </po-page-default>
  `,
})
export class EmpresasDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
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

  onEdit() {
    this.router.navigate(['/clientes', this.id, 'editar']);
  }

  onBack() {
    this.router.navigate(['/clientes']);
  }
}
