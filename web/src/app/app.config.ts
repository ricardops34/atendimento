import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { PoI18nModule, PoI18nConfig } from '@po-ui/ng-components';

const i18nConfig: PoI18nConfig = {
  default: {
    language: 'pt-br',
    context: 'general',
    cache: true
  },
  contexts: {
    'login': {
      'pt-br': { url: './assets/i18n/login-pt.json' } as any,
      'en-us': { url: './assets/i18n/login-en.json' } as any,
      'es-es': { url: './assets/i18n/login-es.json' } as any
    },
    'admin': {
      'pt-br': { url: './assets/i18n/admin-pt.json' } as any,
      'en-us': { url: './assets/i18n/admin-en.json' } as any,
      'es-es': { url: './assets/i18n/admin-es.json' } as any
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
