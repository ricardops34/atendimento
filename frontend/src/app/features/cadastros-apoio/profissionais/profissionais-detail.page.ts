import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PoButtonModule,
  PoInfoModule,
  PoNotificationService,
  PoPageModule,
} from '@po-ui/ng-components';
import { ProfissionalService } from '../../../core/services/profissional.service';

@Component({
  selector: 'app-profissionais-detail-page',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule, PoInfoModule],
  template: `
    <po-page-default p-title="Profissional">
      <div slot="actions" style="display: flex; gap: 8px; margin-bottom: 16px;">
        <po-button p-label="Editar" p-icon="po-icon-edit" (p-click)="onEdit()"></po-button>
        <po-button p-label="Voltar" p-kind="secondary" (p-click)="onBack()"></po-button>
      </div>

      <div class="po-row" style="margin-top: 16px;">
        <po-info class="po-md-12" p-label="Nome" [p-value]="registro?.nome || '-'"></po-info>
      </div>
      <div class="po-row">
        <po-info class="po-md-12" p-label="Usuário do Sistema" [p-value]="registro?.user?.name || '-'"></po-info>
      </div>
    </po-page-default>
  `,
})
export class ProfissionaisDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profissionalService = inject(ProfissionalService);
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

  onEdit() {
    this.router.navigate(['/profissionais', this.id, 'editar']);
  }

  onBack() {
    this.router.navigate(['/profissionais']);
  }
}
