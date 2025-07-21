import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts - UTILISER VOS COMPOSANTS EXISTANTS
import { AdminLayoutComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

// Guards - UTILISER VOS GUARDS EXISTANTS
import { AuthGuard } from './core/auth/guards/auth.guard';
import { GuestGuard } from './core/auth/guards/guest.guard';

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

  // Routes Admin
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'administrateur' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent)
      }
    ]
  },

  // Routes temporaires d'erreur (sans fichiers externes)
  {
    path: 'unauthorized',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/shared/profile/profile.component').then(c => c.ProfileComponent)
      }
    ]
  },
  {
    path: '404',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
      }
    ]
  },

  // Redirection pour toutes les autres routes
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}