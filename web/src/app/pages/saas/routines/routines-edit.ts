import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoPageDynamicEditModule, PoPageDynamicEditField } from '@po-ui/ng-templates';
import { HttpClient } from '@angular/common/http';
import { CoreService } from '../../../core/services/core.service';

@Component({
  selector: 'app-routines-edit',
  standalone: true,
  imports: [CommonModule, PoPageDynamicEditModule],
  template: `
    <po-page-dynamic-edit
      [p-title]="'Cadastro de Rotina do Sistema'"
      [p-service-api]="serviceApi"
      [p-fields]="fields"
      [p-value]="routine"
    >
    </po-page-dynamic-edit>
  `
})
export class RoutinesEditComponent implements OnInit {
  private coreService = inject(CoreService);
  
  readonly serviceApi = `${this.coreService.apiUrl}/routines/catalog`; 
  
  routine: any = {
    levelMin: 1,
    type: 'S'
  };

  readonly fields: Array<PoPageDynamicEditField> = [
    { property: 'id', key: true, visible: false },
    { property: 'module', label: 'Módulo/Grupo', gridColumns: 6, required: true, help: 'Ex: Financeiro, Frota, Gestão SaaS' },
    { property: 'label', label: 'Nome para Exibição', gridColumns: 6, required: true },
    { property: 'name', label: 'Nome Técnico (Slug)', gridColumns: 6, required: true, help: 'Ex: admin.tenants.list' },
    { property: 'type', label: 'Tipo de Rotina', gridColumns: 6, required: true, 
      options: [
        { label: 'Sistema (Nativo)', value: 'S' },
        { label: 'Usuário (Dinâmico)', value: 'U' }
      ]
    },
    { property: 'link', label: 'Caminho da Rota (Frontend)', gridColumns: 8 },
    { property: 'icon', label: 'Ícone PO-UI', gridColumns: 4 },
    { property: 'levelMin', label: 'Nível Mínimo Global', type: 'number', gridColumns: 4 }
  ];

  ngOnInit() {}
}
