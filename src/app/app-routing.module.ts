import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts MANTIS - Structure originale
import { AdminLayoutComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

// Guards
import { AuthGuard } from './core/auth/guards/auth.guard';
import { GuestGuard } from './core/auth/guards/guest.guard';

const routes: Routes = [
  // Routes d'authentification (Guest Layout)
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

  // Routes Administrateur (Admin Layout Mantis)
  {
    path: 'admin',
    component: AdminLayoutComponent,  // ✅ Utilise le layout Mantis
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
      },
      {
        path: 'profil',
        loadComponent: () => import('./pages/shared/profile/profile.component').then(c => c.ProfileComponent)
      }
      // ✅ Ajouterons progressivement : users, classes, matieres
    ]
  },

  // Routes Enseignant (Admin Layout Mantis)
  {
    path: 'enseignant',
    component: AdminLayoutComponent,  // ✅ Même layout, navigation différente
    canActivate: [AuthGuard],
    data: { role: 'enseignant' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent)  // ✅ Temporaire
      },
      {
        path: 'profil',
        loadComponent: () => import('./pages/shared/profile/profile.component').then(c => c.ProfileComponent)
      }
    ]
  },

  // Routes Élève (Admin Layout Mantis)
  {
    path: 'eleve',
    component: AdminLayoutComponent,  // ✅ Même layout, navigation différente
    canActivate: [AuthGuard],
    data: { role: 'eleve' },
    children: [
      {
        path: '',
        redirectTo: 'bulletins',
        pathMatch: 'full'
      },
      {
        path: 'bulletins',
        loadComponent: () => import('./pages/shared/profile/profile.component').then(c => c.ProfileComponent)  // ✅ Temporaire
      },
      {
        path: 'profil',
        loadComponent: () => import('./pages/shared/profile/profile.component').then(c => c.ProfileComponent)
      }
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