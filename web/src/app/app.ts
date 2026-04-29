import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PoComponentsModule, PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoComponentsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  
  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: () => alert('Home Clicked'), icon: 'an an-house', shortLabel: 'Home' },
    { label: 'Clientes (Tenants)', icon: 'an an-building', shortLabel: 'Clientes' },
    { label: 'Configurações', icon: 'an an-gear', shortLabel: 'Config' },
  ];

}
