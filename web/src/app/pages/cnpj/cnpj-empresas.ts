import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField, PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-cnpj-empresas',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      p-title="Dados Públicos: Empresas (RFB)"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class CnpjEmpresasComponent {
  private coreService = inject(CoreService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/cnpj/empresas`;
  
  readonly actions: PoPageDynamicTableActions = {
    edit: '/saas/cnpj/empresas/edit/:id',
    remove: false,
    removeAll: false
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'cnpjBasico', label: 'CNPJ Básico', key: true, gridColumns: 3, filter: true },
    { property: 'razaoSocial', label: 'Razão Social', gridColumns: 5, filter: true },
    { property: 'capitalSocial', label: 'Capital Social', type: 'currency', gridColumns: 2 },
    { property: 'porteEmpresa', label: 'Porte', gridColumns: 2, options: [
      { label: 'Não Informado', value: '00' },
      { label: 'Micro Empresa', value: '01' },
      { label: 'Pequeno Porte', value: '03' },
      { label: 'Demais', value: '05' }
    ]},
    { property: 'naturezaJuridica', label: 'Natureza Jurídica', visible: false }
  ];
}
