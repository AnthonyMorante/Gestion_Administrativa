import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { jsonConfig } from './config';

export const js = window as any;
export const global = Object.freeze(jsonConfig);
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation())]
};
