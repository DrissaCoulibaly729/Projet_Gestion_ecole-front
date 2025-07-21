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
  if (this.authService.isAuthenticated) {
    const user = this.authService.currentUser;
    if (user) {
      console.log('🎨 Mantis GuestGuard - Redirection pour:', user.role);
      
      switch (user.role) {
        case 'administrateur':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'enseignant':
          this.router.navigate(['/enseignant/dashboard']); // ✅ Route Mantis
          break;
        case 'eleve':
          this.router.navigate(['/eleve/bulletins']); // ✅ Route Mantis
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
