import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

// Services
import { AdminService } from '../../../core/services/admin.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';

// Interface pour les statistiques
interface DashboardStats {
  utilisateurs: {
    total: number;
    administrateurs: number;
    enseignants: number;
    eleves: number;
    actifs: number;
    inactifs: number;
  };
  classes: {
    total: number;
    effectif_total: number;
    taux_occupation: number;
    par_niveau: any[];
  };
  matieres: {
    total: number;
    notes_saisies: number;
    moyenne_generale: number;
  };
  activite_recente: any[];
  eleves_difficulte: any[];
  excellents_eleves: any[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Template utilisant les styles personnalisés du portail scolaire -->
    <div class="pc-container">
      <div class="pc-content">
        <!-- [ breadcrumb ] start -->
        <div class="page-header">
          <div class="page-block">
            <div class="row align-items-center">
              <div class="col-md-12">
                <div class="page-header-title">
                  <h2 class="mb-0">🎓 Dashboard Administrateur - Portail Scolaire</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- [ breadcrumb ] end -->

        <!-- [ Main Content ] start -->
        <div class="row">
          <!-- Statistiques Cards personnalisées -->
          <div class="col-md-6 col-xl-3">
            <div class="card social-widget-card card-users">
              <div class="card-body-big">
                <h3>{{ stats?.utilisateurs?.total || 0 }}</h3>
                <span class="text-muted">👥 Total des comptes</span>
                <div class="social-widget-card-icon">
                  <i class="feather icon-users"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-xl-3">
            <div class="card social-widget-card card-classes">
              <div class="card-body-big">
                <h3>{{ stats?.classes?.total || 0 }}</h3>
                <span class="text-muted">🏫 Classes actives</span>
                <div class="social-widget-card-icon">
                  <i class="feather icon-home"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-xl-3">
            <div class="card social-widget-card card-subjects">
              <div class="card-body-big">
                <h3>{{ stats?.matieres?.total || 0 }}</h3>
                <span class="text-muted">📚 Matières enseignées</span>
                <div class="social-widget-card-icon">
                  <i class="feather icon-book"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-xl-3">
            <div class="card social-widget-card card-notes">
              <div class="card-body-big">
                <h3>{{ stats?.matieres?.notes_saisies || 0 }}</h3>
                <span class="text-muted">📊 Notes saisies</span>
                <div class="social-widget-card-icon">
                  <i class="feather icon-bar-chart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Détails par rôle -->
        <div class="row" *ngIf="stats">
          <div class="col-md-8">
            <div class="card card-repartition">
              <div class="card-header">
                <h5>📊 Répartition des Utilisateurs</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-4">
                    <div class="d-flex align-items-center role-item">
                      <div class="avtar avtar-s bg-primary">
                        <i class="feather icon-shield text-white"></i>
                      </div>
                      <div class="ms-3">
                        <h6 class="mb-0">{{ stats.utilisateurs.administrateurs }}</h6>
                        <small class="text-muted">Administrateurs</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex align-items-center role-item">
                      <div class="avtar avtar-s bg-success">
                        <i class="feather icon-user-check text-white"></i>
                      </div>
                      <div class="ms-3">
                        <h6 class="mb-0">{{ stats.utilisateurs.enseignants }}</h6>
                        <small class="text-muted">Enseignants</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex align-items-center role-item">
                      <div class="avtar avtar-s bg-warning">
                        <i class="feather icon-users text-white"></i>
                      </div>
                      <div class="ms-3">
                        <h6 class="mb-0">{{ stats.utilisateurs.eleves }}</h6>
                        <small class="text-muted">Élèves</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card card-user-profile">
              <div class="card-header">
                <h5>👋 Bienvenue, {{ currentUser?.prenom }}</h5>
              </div>
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="avtar avtar-xl">
                    <img class="avtar-img rounded-circle" src="assets/images/user/avatar-5.jpg" alt="User image">
                  </div>
                  <div class="ms-3">
                    <h6 class="mb-0">{{ currentUser?.nom }} {{ currentUser?.prenom }}</h6>
                    <small class="text-muted">{{ getRoleDisplay(currentUser?.role) }}</small>
                    <div class="mt-2">
                      <span class="badge bg-success">✅ Connecté</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="row">
          <div class="col-md-12">
            <div class="card card-actions">
              <div class="card-header">
                <h5>⚡ Actions Rapides</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-3">
                    <button class="btn btn-primary btn-sm w-100 mb-2" (click)="navigateTo('/admin/utilisateurs')">
                      <i class="feather icon-users"></i>
                      Gérer Utilisateurs
                    </button>
                  </div>
                  <div class="col-md-3">
                    <button class="btn btn-success btn-sm w-100 mb-2" (click)="navigateTo('/admin/classes')">
                      <i class="feather icon-home"></i>
                      Gérer Classes
                    </button>
                  </div>
                  <div class="col-md-3">
                    <button class="btn btn-warning btn-sm w-100 mb-2" (click)="navigateTo('/admin/matieres')">
                      <i class="feather icon-book"></i>
                      Gérer Matières
                    </button>
                  </div>
                  <div class="col-md-3">
                    <button class="btn btn-info btn-sm w-100 mb-2" (click)="refreshData()">
                      <i class="feather icon-refresh-cw"></i>
                      Actualiser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chargement -->
        <div class="row" *ngIf="loading">
          <div class="col-12">
            <div class="card loading-card">
              <div class="card-body text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Chargement...</span>
                </div>
                <p class="mt-3">🔄 Chargement des statistiques du portail...</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Erreur -->
        <div class="row" *ngIf="error">
          <div class="col-12">
            <div class="card error-card">
              <div class="card-body">
                <div class="alert alert-warning">
                  <h5>📡 Mode Démonstration</h5>
                  <p>{{ error }}</p>
                  <small class="text-muted">🎓 Les statistiques réelles du portail scolaire seront affichées une fois l'API connectée.</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mode démo -->
        <div class="row" *ngIf="!stats && !loading">
          <div class="col-12">
            <div class="card demo-card">
              <div class="card-body text-center">
                <h5>🚀 Portail Scolaire Opérationnel</h5>
                <p class="text-muted">📚 Le dashboard administratif est prêt. Connectez votre API pour afficher les vraies données scolaires.</p>
                <button class="btn btn-primary" (click)="loadMockData()">
                  <i class="feather icon-database me-2"></i>
                  Charger des données de test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  // ✅ CORRECT: Utiliser styleUrls avec un fichier SCSS minimal
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  // Propriétés
  stats: DashboardStats | null = null;
  currentUser: User | null = null;
  loading = false;
  error = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('🎨 AdminDashboardComponent - Initialisation avec thème Mantis');
    
    // Récupérer l'utilisateur connecté
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        console.log('👤 Utilisateur connecté:', user?.role);
      });

    // Charger les données
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Charger les données du dashboard
   */
  private loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    // Essayer de charger les vraies données depuis l'API
    this.adminService.getDashboardStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.stats = response.data;
          this.loading = false;
          console.log('📊 Statistiques chargées:', this.stats);
        },
        error: (error) => {
          console.warn('⚠️ Erreur API, chargement des données de test:', error);
          this.loading = false;
          this.error = 'API non disponible. Données de démonstration affichées.';
          this.loadMockData();
        }
      });
  }

  /**
   * Charger des données de test
   */
  loadMockData(): void {
    this.stats = {
      utilisateurs: {
        total: 145,
        administrateurs: 3,
        enseignants: 18,
        eleves: 124,
        actifs: 140,
        inactifs: 5
      },
      classes: {
        total: 12,
        effectif_total: 340,
        taux_occupation: 85.5,
        par_niveau: []
      },
      matieres: {
        total: 8,
        notes_saisies: 1250,
        moyenne_generale: 14.2
      },
      activite_recente: [],
      eleves_difficulte: [],
      excellents_eleves: []
    };
    
    this.error = '';
    console.log('🧪 Données de test chargées');
  }

  /**
   * Actualiser les données
   */
  refreshData(): void {
    console.log('🔄 Actualisation des données...');
    this.loadDashboardData();
  }

  /**
   * Navigation vers une page
   */
  navigateTo(route: string): void {
    console.log('🧭 Navigation vers:', route);
    // Implémentation de la navigation
    // this.router.navigate([route]);
  }

  /**
   * Affichage du rôle utilisateur
   */
  getRoleDisplay(role?: string): string {
    switch (role) {
      case 'administrateur': return 'Administrateur';
      case 'enseignant': return 'Enseignant';
      case 'eleve': return 'Élève';
      default: return role || 'Utilisateur';
    }
  }
}