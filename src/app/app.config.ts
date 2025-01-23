import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { reqErrorHandlerInterceptor } from './core/interceptors/req-error-handler.interceptor';
import { reqHeaderInterceptor } from './core/interceptors/req-header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideHttpClient(withFetch(),withInterceptors([reqErrorHandlerInterceptor, reqHeaderInterceptor, loadingInterceptor])),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule),
    provideToastr(),
    provideClientHydration()]
};
