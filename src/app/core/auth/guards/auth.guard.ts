import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * ✅ SOLUTION PRINCIPALE : Utiliser Observable pour attendre la mise à jour
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    console.log('🎨 AuthGuard - Vérification avec Observable...');
    
    // ✅ Attendre que l'état d'authentification soit stable
    return this.authService.isAuthenticated$.pipe(
      take(1), // Prendre la première valeur émise
      map(isAuthenticated => {
        console.log('🎨 AuthGuard - État auth reçu:', isAuthenticated);
        
        if (!isAuthenticated) {
          console.log('❌ AuthGuard - Non authentifié, redirection vers login');
          this.router.navigate(['/auth/login']);
          return false;
        }

        console.log('✅ AuthGuard - Utilisateur authentifié');

        // Vérifier le rôle requis
        const requiredRole = route.data?.['role'];
        if (requiredRole) {
          const currentUser = this.authService.currentUser;
          if (!currentUser || !this.authService.hasRole(requiredRole)) {
            console.log('❌ AuthGuard - Rôle insuffisant:', requiredRole, 'vs', currentUser?.role);
            this.router.navigate(['/unauthorized']);
            return false;
          }
          console.log('✅ AuthGuard - Rôle autorisé:', requiredRole);
        }

        console.log('✅ AuthGuard - Accès accordé');
        return true;
      })
    );
  }
}