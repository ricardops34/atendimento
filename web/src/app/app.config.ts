import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { PoI18nModule } from '@po-ui/ng-components';

const i18nConfig: any = {
  default: {
    language: 'pt-br',
    context: 'login', // Mudado de 'general' para 'login'
    cache: true
  },
  contexts: {
    'login': {
      'pt-br': 'assets/i18n/login-pt.json',
      'en-us': 'assets/i18n/login-en.json',
      'es-es': 'assets/i18n/login-es.json'
    },
    'admin': {
      'pt-br': 'assets/i18n/admin-pt.json',
      'en-us': 'assets/i18n/admin-en.json',
      'es-es': 'assets/i18n/admin-es.json'
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(PoI18nModule.config(i18nConfig))
  ]
};
