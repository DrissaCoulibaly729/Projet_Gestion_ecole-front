import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="pc-header">
      <div class="header-wrapper">
        <div class="me-auto pc-mob-drp">
          <ul class="list-unstyled">
            <li class="pc-h-item pc-sidebar-collapse">
              <a href="javascript:void(0)" class="pc-head-link ms-0" id="sidebar-hide">
                <i class="ti ti-menu-2"></i>
              </a>
            </li>
            <li class="pc-h-item pc-sidebar-popup">
              <a href="javascript:void(0)" class="pc-head-link ms-0" id="mobile-collapse">
                <i class="ti ti-menu-2"></i>
              </a>
            </li>
          </ul>
        </div>

        <div class="ms-auto">
          <ul class="list-unstyled">
            <!-- Notifications (pour plus tard) -->
            <li class="dropdown pc-h-item">
              <a 
                class="pc-head-link dropdown-toggle arrow-none me-0" 
                data-bs-toggle="dropdown" 
                href="#" 
                role="button" 
                aria-haspopup="false" 
                aria-expanded="false"
              >
                <i class="ti ti-bell"></i>
                <span class="badge bg-success pc-h-badge">3</span>
              </a>
              <div class="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
                <div class="dropdown-header d-flex align-items-center justify-content-between">
                  <h6 class="m-0">Notifications</h6>
                  <a href="javascript:void(0)">Tout marquer comme lu</a>
                </div>
                <div class="dropdown-body text-wrap header-notification-scroll position-relative" style="max-height: 265px;">
                  <p class="text-muted text-center py-3">Aucune nouvelle notification</p>
                </div>
                <div class="dropdown-footer text-center">
                  <a href="javascript:void(0)">Voir toutes les notifications</a>
                </div>
              </div>
            </li>

            <!-- User Profile -->
            <li class="dropdown pc-h-item" *ngIf="currentUser">
              <a 
                class="pc-head-link dropdown-toggle arrow-none me-0" 
                data-bs-toggle="dropdown" 
                href="#" 
                role="button" 
                aria-haspopup="false" 
                aria-expanded="false"
              >
                <div class="avtar avtar-s bg-primary-50">
                  <i class="ti ti-user text-primary"></i>
                </div>
                <span class="d-none d-md-inline-block ms-1">
                  Bonjour, {{ currentUser.prenom }}!
                </span>
              </a>
              <div class="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                <div class="dropdown-header d-flex align-items-center justify-content-between">
                  <h6 class="m-0">Profil</h6>
                </div>
                <div class="dropdown-body">
                  <div class="profile-notification-scroll position-relative" style="max-height: 225px;">
                    <div class="d-flex mb-1">
                      <div class="flex-shrink-0">
                        <div class="avtar avtar-s bg-primary-50">
                          <i class="ti ti-user text-primary"></i>
                        </div>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h6 class="mb-1">{{ currentUser.prenom }} {{ currentUser.nom }}</h6>
                        <span class="text-muted">{{ currentUser.email }}</span>
                      </div>
                    </div>
                    <hr class="border-secondary-subtle">
                    <a [routerLink]="[getProfileUrl()]" class="dropdown-item">
                      <i class="ti ti-user"></i>
                      <span>Mon profil</span>
                    </a>
                    <a [routerLink]="[getProfileUrl()]" class="dropdown-item">
                      <i class="ti ti-settings"></i>
                      <span>Paramètres</span>
                    </a>
                    <hr class="border-secondary-subtle">
                    <a href="javascript:void(0)" class="dropdown-item" (click)="logout()">
                      <i class="ti ti-logout"></i>
                      <span>Déconnexion</span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
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
        this.authService.quickLogout();
      }
    });
  }
}
