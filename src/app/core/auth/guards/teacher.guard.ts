import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user && (user.role === 'enseignant' || user.role === 'administrateur')) {
          return true;
        } else {
          this.redirectToAppropriateRoute(user?.role);
          return false;
        }
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }

  private redirectToAppropriateRoute(role?: string): void {
    switch (role) {
      case 'administrateur':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'eleve':
        this.router.navigate(['/student/dashboard']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }
}
