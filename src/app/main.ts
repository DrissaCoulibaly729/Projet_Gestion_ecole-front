import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app/app.component';

// Services et Interceptors
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule, 
      AppRoutingModule,
      HttpClientModule
    ),
    provideAnimations(),
    // HTTP Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
}).catch((err) => console.error(err));

// src/app/core/config/menu.config.ts
export interface MenuItem {
  id: string;
  title: string;
  type: 'item' | 'group' | 'collapse';
  icon?: string;
  url?: string;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: MenuItem[];
  roles?: string[];
}

export const menuItems: MenuItem[] = [
  // Menu Administrateur
  {
    id: 'admin-dashboard',
    title: 'Tableau de bord',
    type: 'item',
    icon: 'ti ti-dashboard',
    url: '/admin/dashboard',
    roles: ['administrateur']
  },
  {
    id: 'admin-gestion',
    title: 'Gestion',
    type: 'group',
    roles: ['administrateur'],
    children: [
      {
        id: 'admin-utilisateurs',
        title: 'Utilisateurs',
        type: 'item',
        icon: 'ti ti-users',
        url: '/admin/utilisateurs',
        roles: ['administrateur']
      },
      {
        id: 'admin-classes',
        title: 'Classes',
        type: 'item',
        icon: 'ti ti-school',
        url: '/admin/classes',
        roles: ['administrateur']
      },
      {
        id: 'admin-matieres',
        title: 'Matières',
        type: 'item',
        icon: 'ti ti-books',
        url: '/admin/matieres',
        roles: ['administrateur']
      }
    ]
  },

  // Menu Enseignant
  {
    id: 'enseignant-dashboard',
    title: 'Tableau de bord',
    type: 'item',
    icon: 'ti ti-dashboard',
    url: '/enseignant/dashboard',
    roles: ['enseignant']
  },
  {
    id: 'enseignant-activites',
    title: 'Mes activités',
    type: 'group',
    roles: ['enseignant'],
    children: [
      {
        id: 'enseignant-classes',
        title: 'Mes classes',
        type: 'item',
        icon: 'ti ti-school',
        url: '/enseignant/classes',
        roles: ['enseignant']
      },
      {
        id: 'enseignant-notes',
        title: 'Gestion des notes',
        type: 'item',
        icon: 'ti ti-edit',
        url: '/enseignant/notes',
        roles: ['enseignant']
      }
    ]
  },

  // Menu Élève
  {
    id: 'eleve-bulletins',
    title: 'Mes bulletins',
    type: 'item',
    icon: 'ti ti-report',
    url: '/eleve/bulletins',
    roles: ['eleve']
  },

  // Menu partagé
  {
    id: 'compte',
    title: 'Mon compte',
    type: 'group',
    roles: ['administrateur', 'enseignant', 'eleve'],
    children: [
      {
        id: 'profil',
        title: 'Mon profil',
        type: 'item',
        icon: 'ti ti-user',
        url: '/profil',
        roles: ['administrateur', 'enseignant', 'eleve']
      }
    ]
  }
];
