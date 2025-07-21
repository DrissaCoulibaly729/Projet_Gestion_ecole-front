import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ✅ IMPORT DU ROUTING MODULE (au lieu de routes directes)
import { AppRoutingModule } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    // ✅ IMPORTANT: Utiliser importProvidersFrom pour le routing module
    importProvidersFrom(AppRoutingModule),
    
    // ✅ Configuration HTTP
    provideHttpClient(withInterceptorsFromDi()),
    
    // ✅ Animations pour Mantis
    importProvidersFrom(BrowserAnimationsModule),
    
    // ✅ Autres providers si nécessaire
    // Vos services globaux peuvent être ajoutés ici
  ]
};