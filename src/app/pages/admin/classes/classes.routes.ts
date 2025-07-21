import { Routes } from '@angular/router';

export const CLASSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./classes-list/classes-list.component').then(c => c.ClassesListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./classe-create/classe-create.component').then(c => c.ClasseCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./classe-detail/classe-detail.component').then(c => c.ClasseDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./classe-edit/classe-edit.component').then(c => c.ClasseEditComponent)
  }
];