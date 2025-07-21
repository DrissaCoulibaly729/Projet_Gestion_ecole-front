import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // ✅ CORRECTION : isAuthenticated est un getter, pas une méthode
    if (this.authService.isAuthenticated) {
      // ✅ CORRECTION : Redirection manuelle selon le rôle
      const user = this.authService.currentUser;
      if (user) {
        switch (user.role) {
          case 'administrateur':
            this.router.navigate(['/admin/dashboard']);
            break;
          case 'enseignant':
            this.router.navigate(['/teacher/dashboard']);
            break;
          case 'eleve':
            this.router.navigate(['/student/dashboard']);
            break;
          default:
            this.router.navigate(['/auth/login']);
        }
      }
      return false;
    }
    return true;
  }
}
