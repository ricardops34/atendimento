import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-banco-horas-page',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Banco de Horas"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `,
})
export class BancoHorasPage {
  constructor(private router: Router) {}

  readonly apiUrl = `${environment.apiUrl}/banco-horas`;

  readonly fields: Array<any> = [
    { property: 'id', label: 'ID', key: true, width: '8%', visible: false, allowColumnsManager: false },
    { property: 'contratoDescricao', label: 'Contrato', filter: true },
    { property: 'profissionalNome', label: 'Profissional', filter: true },
    { property: 'maxHorasMes', label: 'Máx. Horas/Mês', type: 'number', width: '15%' },
    { property: 'modoExcedente', label: 'Excedente', type: 'label', width: '15%', labels: [
      { value: 'BANCO', label: 'Banco de Horas', color: 'color-08' },
      { value: 'BLOQUEIO', label: 'Bloquear', color: 'color-07' },
    ]},
    { property: 'saldoBancoHoras', label: 'Saldo (h)', type: 'number', width: '12%' },
  ];

  readonly actions = {
    remove: false,
    new: false,
    custom: [
      {
        label: 'Ver extrato / lançar baixa',
        action: (item: any) => this.router.navigate(['/banco-horas', item.id]),
      },
    ],
  };
}
