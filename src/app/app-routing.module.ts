// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Layouts
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  // Routes d'authentification (non authentifiées)
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
      },
      {
        path: 'auth/register',
        loadComponent: () => import('./pages/auth/register/register.component').then(c => c.RegisterComponent)
      }
    ]
  },

  // Routes Administrateur
  {
    path: 'admin',
    component: AdminComponent,
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
        path: 'utilisateurs',
        loadChildren: () => import('./pages/admin/users/users.routes').then(r => r.USERS_ROUTES)
      },
      {
        path: 'classes',
        loadChildren: () => import('./pages/admin/classes/classes.routes').then(r => r.CLASSES_ROUTES)
      },
      {
        path: 'matieres',
        loadChildren: () => import('./pages/admin/matieres/matieres.routes').then(r => r.MATIERES_ROUTES)
      },
      {
        path: 'profil',
        loadComponent: () => import('./pages/shared/profile/profile.component').then(c => c.ProfileComponent)
      }
    ]
  },

  // Routes Enseignant
  {
    path: 'enseignant',
    component: AdminComponent,
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
        loadComponent: () => import('./pages/enseignant/dashboard/enseignant-dashboard.component').then(c => c.EnseignantDashboardComponent)
      },
      {
        path: 'notes',
        loadChildren: () => import('./pages/enseignant/notes/notes.routes').then(r => r.NOTES_ROUTES)
      },
      {
        path: 'classes',
        loadComponent: () => import('./pages/enseignant/mes-classes/mes-classes.component').then(c => c.MesClassesComponent)
      },
      {
        path: 'profil',
        loadComponent: () => import('./pages/shared/profile/profile.component').then(c => c.ProfileComponent)
      }
    ]
  },

  // Routes Élève
  {
    path: 'eleve',
    component: AdminComponent,
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
        loadComponent: () => import('./pages/eleve/bulletins/bulletins-list.component').then(c => c.BulletinsListComponent)
      },
      {
        path: 'bulletin/:id',
        loadComponent: () => import('./pages/eleve/bulletin-detail/bulletin-detail.component').then(c => c.BulletinDetailComponent)
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