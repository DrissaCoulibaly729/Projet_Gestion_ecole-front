import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * ✅ SOLUTION : Utiliser Observable pour attendre la mise à jour
   */
  canActivate(): Observable<boolean> {
    console.log('🎨 GuestGuard - Vérification avec Observable...');
    
    // ✅ Attendre que l'état d'authentification soit stable
    return this.authService.isAuthenticated$.pipe(
      take(1), // Prendre la première valeur émise
      map(isAuthenticated => {
        console.log('🎨 GuestGuard - État auth reçu:', isAuthenticated);
        
        if (isAuthenticated) {
          const user = this.authService.currentUser;
          if (user) {
            console.log('🎨 GuestGuard - Utilisateur connecté, redirection pour:', user.role);
            
            switch (user.role) {
              case 'administrateur':
                console.log('➡️ GuestGuard - Redirection Admin: /admin/dashboard');
                this.router.navigate(['/admin/dashboard']);
                break;
              case 'enseignant':
                console.log('➡️ GuestGuard - Redirection Enseignant: /enseignant/dashboard');
                this.router.navigate(['/enseignant/dashboard']);
                break;
              case 'eleve':
                console.log('➡️ GuestGuard - Redirection Élève: /eleve/bulletins');
                this.router.navigate(['/eleve/bulletins']);
                break;
              default:
                console.log('❌ GuestGuard - Rôle non reconnu, redirection login');
                this.router.navigate(['/auth/login']);
            }
          }
          return false; // Empêcher l'accès aux pages guest si connecté
        }
        
        console.log('✅ GuestGuard - Accès autorisé (non connecté)');
        return true; // Autoriser l'accès aux pages guest si non connecté
      })
    );
  }
}
