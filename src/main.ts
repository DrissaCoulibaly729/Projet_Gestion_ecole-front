import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app-config';  // ✅ Garder app.config.ts
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));