import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoInfoModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { ContratoService } from '../../../core/services/contrato.service';

@Component({
  selector: 'app-contratos-detail-page',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule, PoInfoModule],
  template: `
    <po-page-default p-title="Contrato">
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <po-button p-label="Editar" p-icon="po-icon-edit" (p-click)="onEdit()"></po-button>
        <po-button p-label="Voltar" p-kind="secondary" (p-click)="onBack()"></po-button>
      </div>

      <div class="po-row" style="margin-top: 16px;">
        <po-info class="po-md-8" p-label="Descrição" [p-value]="registro?.descricao || '-'"></po-info>
        <po-info class="po-md-4" p-label="Tipo" [p-value]="getTipoLabel(registro?.tipo)"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-12" p-label="Cliente" [p-value]="registro?.cliente?.nome || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-6" p-label="Data de Início" [p-value]="formatDate(registro?.dtInicio)"></po-info>
        <po-info class="po-md-6" p-label="Data de Fim" [p-value]="formatDate(registro?.dtFim)"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-6" p-label="Valor Hora" [p-value]="formatDecimal(registro?.valorHora)"></po-info>
        <po-info class="po-md-6" p-label="Valor Fixo" [p-value]="formatDecimal(registro?.valorFixo)"></po-info>
      </div>
    </po-page-default>
  `,
})
export class ContratosDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contratoService = inject(ContratoService);
  private poNotification = inject(PoNotificationService);

  registro: any = null;
  id!: number;

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    this.contratoService.findOne(this.id).subscribe({
      next: (data: any) => {
        this.registro = data;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar contrato.');
        this.router.navigate(['/contratos']);
      },
    });
  }

  getTipoLabel(tipo: string): string {
    if (tipo === 'F') return 'Fixo';
    if (tipo === 'H') return 'Hora';
    return tipo || '-';
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
  }

  formatDecimal(value: number | null | undefined): string {
    if (value === null || value === undefined) return '-';
    return value.toFixed(2);
  }

  onEdit() {
    this.router.navigate(['/contratos', this.id, 'editar']);
  }

  onBack() {
    this.router.navigate(['/contratos']);
  }
}
