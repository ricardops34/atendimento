import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PoModule],
  template: `
    <po-page-default p-title="Dashboard">
      <div class="po-row">
        <po-info class="po-md-12" p-label="Bem-vindo" p-value="Selecione uma opção no menu lateral para começar."></po-info>
      </div>
    </po-page-default>
  `
})
export class DashboardComponent {}
