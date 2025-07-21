import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { UserRole } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const allowedRoles: UserRole[] = route.data['roles'] || [];
    
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user && allowedRoles.includes(user.role)) {
          return true;
        } else {
          this.handleUnauthorized(user?.role);
          return false;
        }
      })
    );
  }

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.canActivate(route);
  }

  private handleUnauthorized(userRole?: UserRole): void {
    if (!userRole) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // Rediriger vers le dashboard approprié
    switch (userRole) {
      case 'administrateur':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'enseignant':
        this.router.navigate(['/teacher/dashboard']);
        break;
      case 'eleve':
        this.router.navigate(['/student/dashboard']);
        break;
    }
  }
}
