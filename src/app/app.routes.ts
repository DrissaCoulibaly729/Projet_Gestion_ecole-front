
import { Routes } from '@angular/router';

import { AuthGuard, AdminGuard, TeacherGuard, StudentGuard, GuestGuard } from './core/auth/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  
  // Routes d'authentification - SEULES ROUTES QUI FONCTIONNENT POUR L'INSTANT
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(c => c.AuthLayoutComponent),
    canActivate: [GuestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  
  // Routes administrateur - SIMPLIFIÉ
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(c => c.AdminLayoutComponent),
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(c => c.AdminDashboardComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Routes temporaires pour les autres rôles (redirigent vers admin pour l'instant)
  {
    path: 'teacher',
    redirectTo: '/admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'student',
    redirectTo: '/admin/dashboard', 
    pathMatch: 'full'
  },

  // Routes d'erreur
  {
    path: 'unauthorized',
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent)
  },
  
  // Redirection pour toutes les autres routes
  {
    path: '**',
    redirectTo: '/404'
  }
];