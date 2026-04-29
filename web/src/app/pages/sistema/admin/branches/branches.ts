import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  PoPageDynamicTableModule, 
  PoPageDynamicTableField, 
  PoPageDynamicTableActions 
} from '@po-ui/ng-templates';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      [p-title]="'Filiais e Unidades'"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-actions]="actions"
    >
    </po-page-dynamic-table>
  `
})
export class BranchesComponent implements OnInit {
  private coreService = inject(CoreService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/branches`;
  
  readonly actions: PoPageDynamicTableActions = {
    new: '/app/branches/new',
    edit: '/app/branches/edit/:id',
    remove: true
  };

  readonly fields: Array<PoPageDynamicTableField> = [
    { property: 'id', key: true, visible: false },
    { property: 'document', label: 'CNPJ/CPF', gridColumns: 3, filter: true },
    { property: 'name', label: 'Razão Social', gridColumns: 5, filter: true },
    { property: 'city', label: 'Cidade', gridColumns: 2, filter: true },
    { property: 'state', label: 'UF', gridColumns: 1, filter: true },
    { property: 'isMain', label: 'Matriz', type: 'boolean', gridColumns: 1 }
  ];

  ngOnInit() {}
}
