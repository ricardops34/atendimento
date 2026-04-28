import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PoI18nModule, PoI18nConfig } from '@po-ui/ng-components';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

registerLocaleData(localePt);

const i18nConfig: PoI18nConfig = {
  default: {
    language: 'pt-br',
    context: 'login',
    cache: true
  },
  contexts: {
    'login': {
      'pt-br': { url: 'assets/i18n/login-pt.json' },
      'en-us': { url: 'assets/i18n/login-en.json' },
      'es-es': { url: 'assets/i18n/login-es.json' }
    },
    'admin': {
      'pt-br': { url: 'assets/i18n/admin-pt.json' },
      'en-us': { url: 'assets/i18n/admin-en.json' },
      'es-es': { url: 'assets/i18n/admin-es.json' }
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    importProvidersFrom(PoI18nModule.config(i18nConfig))
  ]
};
