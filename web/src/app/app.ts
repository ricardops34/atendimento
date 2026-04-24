import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PoModule, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => alert('Home Clicked'), icon: 'po-icon-home', shortLabel: 'Home' },
    { label: 'Clientes (Tenants)', icon: 'po-icon-company', shortLabel: 'Clientes' },
    { label: 'Configurações', icon: 'po-icon-settings', shortLabel: 'Config' },
  ];

}
