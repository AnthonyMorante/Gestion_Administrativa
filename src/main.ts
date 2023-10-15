import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { jsonConfig } from './app/config';
export const js = window as any;
export const global = Object.freeze(jsonConfig);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
