import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

// ✅ CORRECTION 1: Import correct des types et données
import { AdminNavigationItems, NavigationItem, NavigationItems, StudentNavigationItems, TeacherNavigationItems } from '../navigation/navigation';
import { User } from '../../../../core/auth/models/auth.model';  // ✅ Chemin correct

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="pc-sidebar">
      <div class="navbar-wrapper">
        <div class="m-header">
          <a [routerLink]="['/']" class="b-brand text-primary">
            <img src="assets/images/logo-dark.svg" alt="logo image" class="logo-lg" height="40">
            <span class="badge badge-light-success rounded-pill ms-2 theme-version">v2.3.0</span>
          </a>
        </div>
        
        <div class="navbar-content">
          <div class="card pc-user-card">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <div class="avtar avtar-s bg-primary-50">
                    <i class="ti ti-user text-primary"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3" *ngIf="currentUser">
                  <div class="dropdown">
                    <a 
                      class="nav-link dropdown-toggle arrow-none me-0" 
                      data-bs-toggle="dropdown" 
                      href="#" 
                      role="button" 
                      aria-haspopup="false" 
                      aria-expanded="false"
                    >
                      <span>
                        <span class="user-name">{{ currentUser.prenom }} {{ currentUser.nom }}</span>
                        <span class="user-desc f-12 text-muted">{{ getRoleDisplay(currentUser.role) }}</span>
                      </span>
                    </a>
                    <div class="dropdown-menu">
                      <ul>
                        <li>
                          <a class="pc-user-links" [routerLink]="[getProfileUrl()]">
                            <i class="ti ti-user"></i>
                            <span>Mon profil</span>
                          </a>
                        </li>
                        <li>
                          <a class="pc-user-links" href="javascript:void(0)" (click)="logout()">
                            <i class="ti ti-logout"></i>
                            <span>Déconnexion</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul class="pc-navbar">
            <ng-container *ngFor="let menuItem of getFilteredMenuItems()">
              <!-- Menu Item -->
              <li class="pc-item" *ngIf="menuItem.type === 'item'">
                <a 
                  class="pc-link" 
                  [routerLink]="[menuItem.url]" 
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{exact: true}"
                >
                  <span class="pc-micon">
                    <i [class]="getIconClass(menuItem.icon)"></i>
                  </span>
                  <span class="pc-mtext">{{ menuItem.title }}</span>
                </a>
              </li>

              <!-- Menu Group -->
              <li class="pc-item pc-caption" *ngIf="menuItem.type === 'group'">
                <label>{{ menuItem.title }}</label>
                <i class="ti ti-dashboard"></i>
              </li>

              <!-- Menu Group Children -->
              <ng-container *ngIf="menuItem.type === 'group' && menuItem.children">
                <li class="pc-item" *ngFor="let childItem of menuItem.children">
                  <a 
                    class="pc-link" 
                    [routerLink]="[childItem.url]" 
                    routerLinkActive="active"
                  >
                    <span class="pc-micon">
                      <i [class]="getIconClass(childItem.icon)"></i>
                    </span>
                    <span class="pc-mtext">{{ childItem.title }}</span>
                  </a>
                </li>
              </ng-container>

              <!-- Menu Collapse (pour plus tard si besoin) -->
              <li class="pc-item pc-hasmenu" *ngIf="menuItem.type === 'collapse'">
                <a href="javascript:void(0)" class="pc-link">
                  <span class="pc-micon">
                    <i [class]="getIconClass(menuItem.icon)"></i>
                  </span>
                  <span class="pc-mtext">{{ menuItem.title }}</span>
                  <span class="pc-arrow">
                    <i class="ti ti-chevron-right"></i>
                  </span>
                </a>
                <ul class="pc-submenu" *ngIf="menuItem.children">
                  <li *ngFor="let childItem of menuItem.children">
                    <a [routerLink]="[childItem.url]" class="pc-link">{{ childItem.title }}</a>
                  </li>
                </ul>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .pc-sidebar {
      background: #fff;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .user-name {
      font-weight: 600;
      color: #2c3e50;
    }
    .user-desc {
      color: #7b8a8b !important;
    }
  `]
})
export class NavigationComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // S'abonner aux changements de l'utilisateur connecté
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // ✅ CORRECTION 2: Type de retour correct
  getFilteredMenuItems(): NavigationItem[] {
  if (!this.currentUser) {
    console.log('🎨 Mantis Navigation - Aucun utilisateur connecté');
    return [];
  }

  console.log('🎨 Mantis Navigation - Filtrage pour le rôle:', this.currentUser.role);

  // ✅ IMPORTANT : Utiliser la navigation selon le rôle
  let menuItems: NavigationItem[] = [];
  
  switch (this.currentUser.role) {
    case 'administrateur':
      menuItems = AdminNavigationItems;
      break;
    case 'enseignant':
      menuItems = TeacherNavigationItems;
      break;
    case 'eleve':
      menuItems = StudentNavigationItems;
      break;
    default:
      menuItems = [];
  }

  console.log('🎨 Mantis Navigation - Éléments affichés:', menuItems.length);
  return menuItems;
}

  // ✅ CORRECTION 4: Méthode pour vérifier l'affichage des éléments
  private shouldShowMenuItem(item: NavigationItem): boolean {
    // Si pas de rôles définis, afficher l'élément
    if (!item.roles || item.roles.length === 0) {
      return true;
    }
    
    // Si pas d'utilisateur connecté, ne pas afficher
    if (!this.currentUser) {
      return false;
    }
    
    // Vérifier si le rôle de l'utilisateur est autorisé
    return item.roles.includes(this.currentUser.role);
  }

  getRoleDisplay(role: string): string {
    switch (role) {
      case 'administrateur': return 'Administrateur';
      case 'enseignant': return 'Enseignant';
      case 'eleve': return 'Élève';
      default: return role;
    }
  }

  getProfileUrl(): string {
    if (!this.currentUser) return '/profil';
    
    switch (this.currentUser.role) {
      case 'administrateur': return '/admin/profil';
      case 'enseignant': return '/enseignant/profil';
      case 'eleve': return '/eleve/profil';
      default: return '/profil';
    }
  }

  // ✅ CORRECTION 5: Méthode pour gérer les classes d'icônes
  getIconClass(icon?: string): string {
    if (!icon) return 'ti ti-circle';
    
    // Si l'icône commence par 'ti ', c'est déjà correct
    if (icon.startsWith('ti ')) return icon;
    
    // Sinon, ajouter le préfixe 'ti ti-'
    return `ti ti-${icon}`;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // La redirection sera gérée par le service
        console.log('Déconnexion réussie');
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        // Déconnexion forcée côté client même en cas d'erreur serveur
        this.authService.quickLogout();
      }
    });
  }
}