import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PoModule, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoModule],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => alert('Home Clicked'), icon: 'po-icon-home', shortLabel: 'Home' },
    { label: 'Clientes (Tenants)', icon: 'po-icon-company', shortLabel: 'Clientes' },
    { label: 'Configurações', icon: 'po-icon-settings', shortLabel: 'Config' },
    { label: 'Sair', action: () => window.location.href = '/login', icon: 'po-icon-exit', shortLabel: 'Sair' },
  ];
}
