import { Routes } from '@angular/router';

export const NOTES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./notes-list/notes-list.component').then(c => c.NotesListComponent)
  },
  {
    path: 'saisir/:classeId/:matiereId',
    loadComponent: () => import('./notes-saisie/notes-saisie.component').then(c => c.NotesSaisieComponent)
  }
];