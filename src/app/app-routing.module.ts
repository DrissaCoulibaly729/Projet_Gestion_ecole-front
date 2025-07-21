// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts (CORRECTION : AdminLayoutComponent au lieu d'AdminComponent)
import { AdminLayoutComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

// Guards (CORRECTION : Chemins corrects)
import { AuthGuard } from './core/auth/guards/auth.guard';
import { GuestGuard } from './core/auth/guards/guest.guard';
import { AdminGuard } from './core/auth/guards/admin.guard';

const routes: Routes = [
  // Routes d'authentification
  {
    path: '',
    component: GuestLayoutComponent,
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'auth/login',
        loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
      }
    ]
  },

  // Routes Admin - CORRIGÉ
  {
    path: 'admin',
    component: AdminLayoutComponent, // ✅ Nom correct
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent)
      },
      // ... autres routes
    ]
  },

  // Routes d'erreur
  {
    path: 'unauthorized',
    loadComponent: () => import('./pages/errors/unauthorized/unauthorized.component').then(c => c.UnauthorizedComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./pages/errors/not-found/not-found.component').then(c => c.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];