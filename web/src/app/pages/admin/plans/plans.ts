import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicTableModule, PoPageDynamicTableField } from '@po-ui/ng-templates';
import { PoI18nService } from '@po-ui/ng-components';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, PoPageDynamicTableModule],
  template: `
    <po-page-dynamic-table
      [p-title]="literals.title"
      [p-service-api]="apiUrl"
      [p-fields]="fields"
    >
    </po-page-dynamic-table>
  `
})
export class PlansComponent implements OnInit {
  private coreService = inject(CoreService);
  private poI18n = inject(PoI18nService);

  apiUrl = `${this.coreService.apiUrl}/plans`;
  literals: any = {};
  fields: Array<PoPageDynamicTableField> = [];

  ngOnInit() {
    this.poI18n.getLiterals({ context: 'admin' }).subscribe(literals => {
      this.literals = literals.plans;
      this.setupFields();
    });
  }

  private setupFields() {
    this.fields = [
      { property: 'id', key: true, visible: false },
      { property: 'name', label: this.literals.name, filter: true, gridColumns: 6, required: true },
      { property: 'description', label: this.literals.description, gridColumns: 6 },
      { property: 'maxUsers', label: this.literals.maxUsers, type: 'number', gridColumns: 2, required: true },
      { property: 'maxBranches', label: this.literals.maxBranches, type: 'number', gridColumns: 2, required: true },
      { property: 'maxRecords', label: this.literals.maxRecords, type: 'number', gridColumns: 2, required: true },
      { property: 'features', label: this.literals.features, gridColumns: 6, required: true },
      { property: 'createdAt', label: this.literals.createdAt, type: 'date', visible: false },
    ];
  }
}
