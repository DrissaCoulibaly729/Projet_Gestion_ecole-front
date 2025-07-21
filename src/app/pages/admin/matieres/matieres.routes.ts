import { Routes } from '@angular/router';

export const MATIERES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./matieres-list/matieres-list.component').then(c => c.MatieresListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./matiere-create/matiere-create.component').then(c => c.MatiereCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./matiere-detail/matiere-detail.component').then(c => c.MatiereDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./matiere-edit/matiere-edit.component').then(c => c.MatiereEditComponent)
  }
];
