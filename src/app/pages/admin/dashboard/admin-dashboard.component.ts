import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../core/services/dashboard.service';
import { DashboardStats } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pc-container">
      <div class="pc-content">
        <!-- Header -->
        <div class="page-header">
          <div class="page-block">
            <div class="row align-items-center">
              <div class="col-md-12">
                <div class="page-header-title">
                  <h2 class="mb-0">Tableau de bord</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Cards -->
        <div class="row" *ngIf="dashboardStats">
          <!-- Utilisateurs -->
          <div class="col-md-6 col-xl-3">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0">
                    <i class="ti ti-users display-6"></i>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="text-white">Utilisateurs</h6>
                    <h3 class="text-white mb-0">{{ dashboardStats.statistiques_utilisateurs.total }}</h3>
                    <p class="text-white-50 mb-0">
                      {{ dashboardStats.statistiques_utilisateurs.actifs }} actifs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Classes -->
          <div class="col-md-6 col-xl-3">
            <div class="card bg-success text-white">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0">
                    <i class="ti ti-school display-6"></i>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="text-white">Classes</h6>
                    <h3 class="text-white mb-0">{{ dashboardStats.statistiques_classes.total }}</h3>
                    <p class="text-white-50 mb-0">
                      {{ dashboardStats.statistiques_classes.effectifs }} élèves
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Matières & Notes -->
          <div class="col-md-6 col-xl-3">
            <div class="card bg-warning text-white">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0">
                    <i class="ti ti-books display-6"></i>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="text-white">Matières</h6>
                    <h3 class="text-white mb-0">{{ dashboardStats.statistiques_matieres_notes.total_matieres }}</h3>
                    <p class="text-white-50 mb-0">
                      {{ dashboardStats.statistiques_matieres_notes.total_notes }} notes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Moyenne Générale -->
          <div class="col-md-6 col-xl-3">
            <div class="card bg-info text-white">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0">
                    <i class="ti ti-chart-line display-6"></i>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="text-white">Moyenne</h6>
                    <h3 class="text-white mb-0">
                      {{ dashboardStats.statistiques_matieres_notes.moyenne_generale | number:'1.1-1' }}/20
                    </h3>
                    <p class="text-white-50 mb-0">Générale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Répartition par rôle -->
        <div class="row" *ngIf="dashboardStats">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <h5>Répartition des utilisateurs par rôle</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4 text-center">
                    <div class="mb-3">
                      <i class="ti ti-shield-check text-primary" style="font-size: 2rem;"></i>
                      <h4 class="mt-2">{{ dashboardStats.statistiques_utilisateurs.par_role.administrateur }}</h4>
                      <p class="text-muted mb-0">Administrateurs</p>
                    </div>
                  </div>
                  <div class="col-md-4 text-center">
                    <div class="mb-3">
                      <i class="ti ti-user-check text-success" style="font-size: 2rem;"></i>
                      <h4 class="mt-2">{{ dashboardStats.statistiques_utilisateurs.par_role.enseignant }}</h4>
                      <p class="text-muted mb-0">Enseignants</p>
                    </div>
                  </div>
                  <div class="col-md-4 text-center">
                    <div class="mb-3">
                      <i class="ti ti-school text-warning" style="font-size: 2rem;"></i>
                      <h4 class="mt-2">{{ dashboardStats.statistiques_utilisateurs.par_role.eleve }}</h4>
                      <p class="text-muted mb-0">Élèves</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <h5>Taux d'occupation des classes</h5>
              </div>
              <div class="card-body text-center">
                <div class="mb-3">
                  <div class="progress" style="height: 8px;">
                    <div 
                      class="progress-bar bg-success" 
                      role="progressbar" 
                      [style.width.%]="dashboardStats.statistiques_classes.taux_occupation"
                    ></div>
                  </div>
                </div>
                <h3 class="text-success">{{ dashboardStats.statistiques_classes.taux_occupation | number:'1.0-1' }}%</h3>
                <p class="text-muted mb-0">Classes occupées</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Élèves en difficulté et excellents -->
        <div class="row" *ngIf="dashboardStats">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Élèves en difficulté</h5>
                <span class="badge bg-danger">{{ dashboardStats.eleves_difficulte.length }}</span>
              </div>
              <div class="card-body">
                <div *ngIf="dashboardStats.eleves_difficulte.length === 0" class="text-center text-muted py-3">
                  <i class="ti ti-mood-happy display-6 text-success"></i>
                  <p class="mt-2">Aucun élève en difficulté détecté !</p>
                </div>
                <div *ngFor="let eleve of dashboardStats.eleves_difficulte.slice(0, 5)" 
                     class="d-flex align-items-center mb-2">
                  <div class="flex-shrink-0">
                    <div class="avtar avtar-s bg-danger-50">
                      <i class="ti ti-user text-danger"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="mb-0">{{ eleve.prenom }} {{ eleve.nom }}</h6>
                    <p class="text-muted mb-0 f-12" *ngIf="eleve.classe">{{ eleve.classe.nom }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Excellents élèves</h5>
                <span class="badge bg-success">{{ dashboardStats.excellents_eleves.length }}</span>
              </div>
              <div class="card-body">
                <div *ngIf="dashboardStats.excellents_eleves.length === 0" class="text-center text-muted py-3">
                  <i class="ti ti-award display-6 text-warning"></i>
                  <p class="mt-2">Aucun excellent élève pour le moment</p>
                </div>
                <div *ngFor="let eleve of dashboardStats.excellents_eleves.slice(0, 5)" 
                     class="d-flex align-items-center mb-2">
                  <div class="flex-shrink-0">
                    <div class="avtar avtar-s bg-success-50">
                      <i class="ti ti-star text-success"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="mb-0">{{ eleve.prenom }} {{ eleve.nom }}</h6>
                    <p class="text-muted mb-0 f-12" *ngIf="eleve.classe">{{ eleve.classe.nom }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
          <p class="mt-2 text-muted">Chargement des statistiques...</p>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="alert alert-danger" role="alert">
          <i class="ti ti-alert-circle me-2"></i>
          {{ error }}
          <button class="btn btn-sm btn-outline-danger ms-2" (click)="loadDashboardData()">
            Réessayer
          </button>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats: DashboardStats | null = null;
  loading = true;
  error = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    this.dashboardService.getDashboardStats().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.statut === 'succes' && response.data) {
          this.dashboardStats = response.data;
        } else {
          this.error = 'Impossible de charger les statistiques.';
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Erreur lors du chargement du dashboard:', error);
        this.error = 'Une erreur est survenue lors du chargement des données.';
      }
    });
  }
}