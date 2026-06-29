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
import { ContratoService } from '../../../core/services/contrato.service';

@Component({
  selector: 'app-contratos-excluir-page',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule, PoInfoModule],
  template: `
    <po-page-default p-title="Excluir Contrato">
      <div class="po-row" style="margin-top: 16px;">
        <po-info class="po-md-12" p-label="Descrição" [p-value]="registro?.descricao || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-12" p-label="Cliente" [p-value]="registro?.cliente?.nome || '-'"></po-info>
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
export class ContratosExcluirPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private contratoService = inject(ContratoService);
  private poDialog = inject(PoDialogService);
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

  confirmar() {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: `Confirma a exclusão do contrato "${this.registro?.descricao}"?`,
      confirm: () => this.excluir(),
    });
  }

  excluir() {
    this.contratoService.remove(this.id).subscribe({
      next: () => {
        this.poNotification.success('Contrato excluído com sucesso.');
        this.router.navigate(['/contratos']);
      },
      error: () => {
        this.poNotification.error('Erro ao excluir contrato.');
      },
    });
  }

  cancelar() {
    this.router.navigate(['/contratos']);
  }
}
