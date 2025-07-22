// Angular import
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Project import - Composants Mantis
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';

// Auth imports
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
  // ✅ Propriétés d'authentification
  currentUser: User | null = null;
  private destroy$ = new Subject<void>();
  
  // ✅ Propriétés Mantis OBLIGATOIRES
  navCollapsed: boolean = false;
  navCollapsedMob: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('🎨 Mantis AdminLayoutComponent - Initialisation complète');
    
    // Récupérer l'utilisateur connecté
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        console.log('🎨 Mantis AdminLayoutComponent - Utilisateur:', user?.role);
      });

    // ✅ Initialisation des propriétés Mantis
    this.initializeMantisLayout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * ✅ Initialisation spécifique au thème Mantis
   */
  private initializeMantisLayout(): void {
    // Ajouter les classes CSS Mantis au body
    document.body.classList.add('layout-default');
    
    // Gestion responsive pour mobile
    this.handleResponsiveLayout();
  }

  /**
   * ✅ Gestion responsive du layout
   */
  private handleResponsiveLayout(): void {
    const windowWidth = window.innerWidth;
    
    if (windowWidth < 1025) {
      // Mode mobile/tablette
      this.navCollapsed = true;
      document.querySelector('.coded-navbar')?.classList.add('menupos-static');
    } else {
      // Mode desktop
      this.navCollapsed = false;
    }
  }

  /**
   * ✅ Gestion du toggle de navigation (desktop)
   */
  navMobClick(): void {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
    
    // Retirer la classe collapsed si présente
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('navbar-collapsed')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('navbar-collapsed');
    }
  }

  /**
   * ✅ Gestion des raccourcis clavier
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  /**
   * ✅ Fermeture du menu mobile
   */
  closeMenu(): void {
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('mob-open');
    }
    this.navCollapsedMob = false;
  }

  /**
   * ✅ Déconnexion utilisateur
   */
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

  /**
   * ✅ Affichage du rôle utilisateur
   */
  getRoleDisplay(role: string): string {
    switch (role) {
      case 'administrateur': return 'Administrateur';
      case 'enseignant': return 'Enseignant';
      case 'eleve': return 'Élève';
      default: return role;
    }
  }

  /**
   * ✅ Initiales de l'utilisateur
   */
  getUserInitials(): string {
    if (!this.currentUser) return '??';
    const firstInitial = this.currentUser.prenom?.charAt(0)?.toUpperCase() || '';
    const lastInitial = this.currentUser.nom?.charAt(0)?.toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }
}