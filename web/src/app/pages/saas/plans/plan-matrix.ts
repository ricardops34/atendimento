import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoTableModule, PoTableColumn, PoNotificationService, PoPageModule } from '@po-ui/ng-components';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-plan-matrix',
  standalone: true,
  imports: [CommonModule, PoTableModule, PoPageModule],
  template: `
    <po-page-default p-title="Matriz de Recursos por Plano">
      <div class="po-row">
        <po-table
          class="po-md-12"
          [p-columns]="columns"
          [p-items]="items"
          [p-striped]="true"
          p-container="light"
        >
          <ng-template po-table-column-template p-property="routine" let-value>
            <div class="po-p-1">
              <strong>{{ value?.label || 'Sem Nome' }}</strong><br>
              <small class="po-text-color-07">{{ value?.module || 'Global' }}</small>
            </div>
          </ng-template>

          <!-- Template dinâmico para os planos será injetado via colunas -->
        </po-table>
      </div>
    </po-page-default>
  `
})
export class PlanMatrixComponent implements OnInit {
  private coreService = inject(CoreService);
  private http = inject(HttpClient);
  private notification = inject(PoNotificationService);

  columns: Array<PoTableColumn> = [
    { property: 'routine', label: 'Funcionalidade / Módulo', width: '30%' }
  ];

  items: Array<any> = [];
  plans: Array<any> = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Busca Planos e Rotinas em paralelo
    this.http.get(`${this.coreService.apiUrl}/plans`).subscribe((plans: any) => {
      this.plans = plans;
      this.setupColumns();
      
      this.http.get(`${this.coreService.apiUrl}/routines/catalog`).subscribe((routines: any) => {
        this.buildMatrix(routines);
      });
    });
  }

  setupColumns() {
    this.plans.forEach(plan => {
      this.columns.push({
        property: `plan_${plan.id}`,
        label: plan.name,
        type: 'boolean',
        width: '15%',
        action: (row: any) => this.toggleRoutine(plan.id, row.routineId)
      });
    });
  }

  buildMatrix(routines: any[]) {
    this.items = routines.map(r => {
      const row: any = {
        routine: { label: r.label, module: r.module },
        routineId: r.id
      };

      // Verifica para cada plano se a rotina está presente
      this.plans.forEach(plan => {
        const hasRoutine = plan.routines.some((pr: any) => pr.routineId === r.id);
        row[`plan_${plan.id}`] = hasRoutine;
      });

      return row;
    });
  }

  toggleRoutine(planId: string, routineId: string) {
    this.http.post(`${this.coreService.apiUrl}/plans/toggle-routine`, { planId, routineId }).subscribe({
      next: () => this.notification.success('Plano atualizado com sucesso!'),
      error: () => this.notification.error('Falha ao atualizar plano.')
    });
  }
}
