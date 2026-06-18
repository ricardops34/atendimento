import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PoButtonModule, PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-configuracoes-page',
  standalone: true,
  imports: [CommonModule, PoPageModule, PoButtonModule],
  templateUrl: './configuracoes.page.html',
})
export class ConfiguracoesPage {
  private router = inject(Router);

  sections = [
    { label: 'Tenants', icon: 'an an-buildings', route: '/configuracoes/tenants' },
    { label: 'Modulos', icon: 'an an-squares-four', route: '/configuracoes/modulos' },
    { label: 'Rotinas', icon: 'an an-list-checks', route: '/configuracoes/rotinas' },
    { label: 'Perfis', icon: 'an an-identification-card', route: '/configuracoes/perfis' },
    { label: 'Menus', icon: 'an an-tree-structure', route: '/configuracoes/menus' },
    { label: 'Usuarios', icon: 'an an-users-three', route: '/configuracoes/usuarios' },
  ];

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
