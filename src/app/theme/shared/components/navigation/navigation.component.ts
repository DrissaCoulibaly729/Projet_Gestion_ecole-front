import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

import { MenuItem, menuItems } from '../../../../core/config/menu.config';
import { User } from '../../../../core/models';


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
                    <i [class]="menuItem.icon"></i>
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
                      <i [class]="childItem.icon"></i>
                    </span>
                    <span class="pc-mtext">{{ childItem.title }}</span>
                  </a>
                </li>
              </ng-container>

              <!-- Menu Collapse (pour plus tard si besoin) -->
              <li class="pc-item pc-hasmenu" *ngIf="menuItem.type === 'collapse'">
                <a href="javascript:void(0)" class="pc-link">
                  <span class="pc-micon">
                    <i [class]="menuItem.icon"></i>
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
  `
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

  getFilteredMenuItems(): MenuItem[] {
    if (!this.currentUser) return [];

    return menuItems.filter(item => {
      return !item.roles || item.roles.includes(this.currentUser!.role);
    });
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

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // La redirection sera gérée par le service
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        // Déconnexion forcée côté client même en cas d'erreur serveur
        this.authService.quickLogout();
      }
    });
  }
}