import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent, HeaderComponent],
  template: `
    <div class="pc-container">
      <div class="pc-sidebar">
        <app-navigation></app-navigation>
      </div>

      <div class="pc-header-overlay"></div>
      <app-header></app-header>

      <div class="pc-main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .pc-container {
      display: flex;
      min-height: 100vh;
    }

    .pc-main-content {
      flex: 1;
      margin-left: 270px;
      padding-top: 60px;
      transition: margin-left 0.3s ease;
    }

    @media (max-width: 991.98px) {
      .pc-main-content {
        margin-left: 0;
      }
    }
  `]
})
export class AdminLayoutComponent implements OnInit {
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Vérifier le token au chargement du layout
    if (this.authService.isAuthenticated()) {
      this.authService.verifyToken().subscribe({
        next: (response) => {
          if (response.statut !== 'succes') {
            this.authService.quickLogout();
          }
        },
        error: (error) => {
          console.error('Token invalide:', error);
          this.authService.quickLogout();
        }
      });
    }
  }
}
