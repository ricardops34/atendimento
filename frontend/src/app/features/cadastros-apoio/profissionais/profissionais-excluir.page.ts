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
import { ProfissionalService } from '../../../core/services/profissional.service';

@Component({
  selector: 'app-profissionais-excluir-page',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule, PoInfoModule],
  template: `
    <po-page-default p-title="Excluir Profissional">
      <div class="po-row" style="margin-top: 16px;">
        <po-info class="po-md-12" p-label="Nome" [p-value]="registro?.nome || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-12" p-label="Usuário do Sistema" [p-value]="registro?.user?.name || '-'"></po-info>
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
export class ProfissionaisExcluirPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profissionalService = inject(ProfissionalService);
  private poDialog = inject(PoDialogService);
  private poNotification = inject(PoNotificationService);

  registro: any = null;
  id!: number;

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    this.profissionalService.findOne(this.id).subscribe({
      next: (data: any) => {
        this.registro = data;
      },
      error: () => {
        this.poNotification.error('Erro ao carregar profissional.');
        this.router.navigate(['/profissionais']);
      },
    });
  }

  confirmar() {
    this.poDialog.confirm({
      title: 'Confirmar exclusão',
      message: `Confirma a exclusão do profissional "${this.registro?.nome}"?`,
      confirm: () => this.excluir(),
    });
  }

  excluir() {
    this.profissionalService.remove(this.id).subscribe({
      next: () => {
        this.poNotification.success('Profissional excluído com sucesso.');
        this.router.navigate(['/profissionais']);
      },
      error: () => {
        this.poNotification.error('Erro ao excluir profissional.');
      },
    });
  }

  cancelar() {
    this.router.navigate(['/profissionais']);
  }
}
