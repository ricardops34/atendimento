import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PoModule, PoI18nModule, PoI18nConfig } from '@po-ui/ng-components';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Configuração dos Dicionários de Idiomas
const i18nConfig: PoI18nConfig = {
  default: {
    language: 'pt-br',
    context: 'general',
    cache: true
  },
  contexts: {
    login: {
      'pt-br': './assets/i18n/login-pt.json',
      'en-us': './assets/i18n/login-en.json',
      'es-es': './assets/i18n/login-es.json'
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideAnimations(),
    importProvidersFrom([
      PoModule,
      PoI18nModule.config(i18nConfig) // Ativando o multi-idioma
    ])
  ]
};
