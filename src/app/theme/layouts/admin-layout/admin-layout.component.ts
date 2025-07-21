// Angular import
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Project import
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';

// ✅ AJOUTER : Auth imports
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, BreadcrumbComponent, NavigationComponent, NavBarComponent, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  // ✅ AJOUTER : Propriétés d'authentification
  currentUser: User | null = null;
  private destroy$ = new Subject<void>();
  
  // public props (existantes)
  navCollapsed: boolean;
  navCollapsedMob: boolean;

  // ✅ AJOUTER : Injection AuthService
  constructor(private authService: AuthService) {}

  // ✅ AJOUTER : Méthodes lifecycle
  ngOnInit(): void {
    console.log('🎨 Mantis AdminLayoutComponent - Chargement du vrai layout');
    
    // Récupérer l'utilisateur connecté
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        console.log('🎨 Mantis AdminLayoutComponent - Utilisateur:', user?.role);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ✅ AJOUTER : Méthode de déconnexion
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('🎨 Mantis - Déconnexion réussie');
      },
      error: (error) => {
        console.error('❌ Erreur lors de la déconnexion:', error);
        this.authService.quickLogout();
      }
    });
  }

  // public method (existantes)
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('navbar-collapsed')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('navbar-collapsed');
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('mob-open');
    }
  }

  // ✅ AJOUTER : Méthodes utilitaires
  getRoleDisplay(role: string): string {
    switch (role) {
      case 'administrateur': return 'Administrateur';
      case 'enseignant': return 'Enseignant';
      case 'eleve': return 'Élève';
      default: return role;
    }
  }

  getUserInitials(): string {
    if (!this.currentUser) return '??';
    const firstInitial = this.currentUser.prenom?.charAt(0)?.toUpperCase() || '';
    const lastInitial = this.currentUser.nom?.charAt(0)?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }
}