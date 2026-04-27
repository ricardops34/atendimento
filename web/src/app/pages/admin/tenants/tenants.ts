import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { PoI18nService } from '@po-ui/ng-components';
import { CoreService } from '../../../core/services/core.service';
import { PlansService } from '../plans/plans.service';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      [p-title]="literals.title"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class TenantsComponent implements OnInit {
  private coreService = inject(CoreService);
  private poI18n = inject(PoI18nService);
  private plansService = inject(PlansService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/tenants`;
  literals: any = {};
  fields: Array<PoPageDynamicTableField> = [];

  ngOnInit() {
    this.poI18n.getLiterals({ context: 'admin' }).subscribe(literals => {
      this.literals = literals.tenants;
      this.loadPlansAndSetupFields();
    });
  }

  private loadPlansAndSetupFields() {
    this.plansService.getOptions().subscribe(planOptions => {
      this.fields = [
        { property: 'id', key: true, visible: false },
        { property: 'name', label: this.literals.name, filter: true, gridColumns: 6, required: true },
        { property: 'domain', label: this.literals.domain, filter: true, gridColumns: 6, required: true },
        { 
          property: 'planId', 
          label: this.literals.plan, 
          type: 'string',
          options: planOptions, // Carrega os planos dinamicamente do banco
          gridColumns: 6, 
          required: true 
        },
        { property: 'isActive', label: this.literals.status, type: 'boolean', gridColumns: 2 },
        { property: 'createdAt', label: this.literals.createdAt, type: 'date', visible: true, allowEdit: false },
      ];
    });
  }
}
