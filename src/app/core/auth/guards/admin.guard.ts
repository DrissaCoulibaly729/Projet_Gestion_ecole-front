import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user && user.role === 'administrateur') {
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
    case 'enseignant':
      this.router.navigate(['/enseignant/dashboard']); // ✅ CORRIGER
      break;
    case 'eleve':
      this.router.navigate(['/eleve/bulletins']); // ✅ CORRIGER
      break;
    default:
      this.router.navigate(['/auth/login']);
  }
}

}