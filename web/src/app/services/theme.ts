import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  /**
   * Aplica o tema dinamicamente no navegador
   * @param themeConfig Objeto contendo as cores e preferências do tenant
   */
  applyTheme(themeConfig: any) {
    if (!themeConfig) return;

    const root = document.documentElement;

    // Cores Principais do PO-UI
    if (themeConfig.primary) root.style.setProperty('--color-primary', themeConfig.primary);
    if (themeConfig.primaryDark) root.style.setProperty('--color-primary-dark', themeConfig.primaryDark);
    if (themeConfig.action) root.style.setProperty('--color-action', themeConfig.action);

    // Gerenciamento de Dark Mode
    if (themeConfig.isDark) {
      document.body.classList.add('po-theme-dark');
      root.style.setProperty('--color-background', '#1c1c1c');
      root.style.setProperty('--color-text', '#ffffff');
    } else {
      document.body.classList.remove('po-theme-dark');
      root.style.setProperty('--color-background', '#f4f4f4');
      root.style.setProperty('--color-text', '#000000');
    }

    console.log('🎨 Tema aplicado com sucesso para o Tenant.');
  }

  /**
   * Reseta para o tema padrão
   */
  resetTheme() {
    const root = document.documentElement;
    root.style.removeProperty('--color-primary');
    root.style.removeProperty('--color-action');
    document.body.classList.remove('po-theme-dark');
  }
}
