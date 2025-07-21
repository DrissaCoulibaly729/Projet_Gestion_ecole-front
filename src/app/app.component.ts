import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HealthService } from './core/services/health.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <!-- Loading Screen -->
    <div *ngIf="loading" class="loading-screen">
      <div class="loading-content">
        <div class="spinner-border text-primary mb-3" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
        <h4>Portail Scolaire</h4>
        <p class="text-muted">Initialisation en cours...</p>
      </div>
    </div>

    <!-- App Content -->
    <div *ngIf="!loading" class="app-container">
      <router-outlet></router-outlet>
    </div>

    <!-- Toast Container (pour les notifications futures) -->
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1100;">
      <!-- Les toasts seront ajoutés dynamiquement ici -->
    </div>
  `,
  styles: [`
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .loading-content {
      text-align: center;
      color: white;
    }

    .app-container {
      min-height: 100vh;
    }

    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'portail-scolaire';
  loading = true;

  constructor(
    private authService: AuthService,
    private healthService: HealthService
  ) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  private initializeApp(): void {
    // Vérifier l'état de l'API
    this.healthService.checkApiHealth().subscribe({
      next: (response) => {
        console.log('API Health Check:', response);
        this.finishLoading();
      },
      error: (error) => {
        console.warn('API non disponible:', error);
        // Continuer même si l'API n'est pas disponible
        this.finishLoading();
      }
    });
  }

  private finishLoading(): void {
    // Simuler un délai minimum pour l'UX
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
