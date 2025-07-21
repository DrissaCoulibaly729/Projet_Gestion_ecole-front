import { Routes } from '@angular/router';

import { AuthGuard, AdminGuard, TeacherGuard, StudentGuard, GuestGuard } from './core/auth/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  
  // Routes d'authentification
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
  
  // Routes administrateur
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
        path: 'users',
        loadChildren: () => import('./features/admin/users/users.routes').then(r => r.USERS_ROUTES)
      },
      {
        path: 'classes',
        loadChildren: () => import('./features/admin/classes/classes.routes').then(r => r.CLASSES_ROUTES)
      },
      {
        path: 'subjects',
        loadChildren: () => import('./features/admin/subjects/subjects.routes').then(r => r.SUBJECTS_ROUTES)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  
  // Routes enseignant
  {
    path: 'teacher',
    loadComponent: () => import('./layouts/teacher-layout/teacher-layout.component').then(c => c.TeacherLayoutComponent),
    canActivate: [TeacherGuard],
    canActivateChild: [TeacherGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/teacher/dashboard/dashboard.component').then(c => c.TeacherDashboardComponent)
      },
      {
        path: 'classes',
        loadChildren: () => import('./features/teacher/classes/classes.routes').then(r => r.TEACHER_CLASSES_ROUTES)
      },
      {
        path: 'grades',
        loadChildren: () => import('./features/teacher/grades/grades.routes').then(r => r.GRADES_ROUTES)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  
  // Routes élève
  {
    path: 'student',
    loadComponent: () => import('./layouts/student-layout/student-layout.component').then(c => c.StudentLayoutComponent),
    canActivate: [StudentGuard],
    canActivateChild: [StudentGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/student/dashboard/dashboard.component').then(c => c.StudentDashboardComponent)
      },
      {
        path: 'grades',
        loadChildren: () => import('./features/student/grades/grades.routes').then(r => r.STUDENT_GRADES_ROUTES)
      },
      {
        path: 'bulletins',
        loadChildren: () => import('./features/student/bulletins/bulletins.routes').then(r => r.BULLETINS_ROUTES)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  
  // Route catch-all
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];