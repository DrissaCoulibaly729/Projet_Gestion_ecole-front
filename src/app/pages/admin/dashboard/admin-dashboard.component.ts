import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

// Services
import { AdminService } from '../../../core/services/admin.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Dashboard Mantis Style SANS dépendances externes -->
    <div class="row">
      <!-- Analytics Cards avec classes Mantis pures -->
      @for (analytic of AnalyticScolaire; track analytic) {
        <div class="col-md-6 col-xl-3">
          <div class="card dashboard-card">
            <div class="card-body">
              <h6 class="mb-2 f-w-400 text-muted">{{ analytic.title }}</h6>
              <h4 class="mb-3">
                {{ analytic.amount }}
                <span class="badge {{ analytic.background }} border {{ analytic.border }}">
                  {{ analytic.icon }} {{ analytic.percentage }}
                </span>
              </h4>
              <p class="mb-0 text-muted text-sm">
                {{ analytic.description }}
                <span class="{{ analytic.color }}">{{ analytic.number }}</span>
                {{ analytic.period }}
              </p>
            </div>
          </div>
        </div>
      }

      <!-- Graphiques remplacés par des cartes élégantes -->
      <div class="col-md-12 col-xl-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">📊 Évolution des Inscriptions</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3 text-center">
                <div class="p-3 border rounded">
                  <h4 class="text-primary mb-1">125</h4>
                  <h6 class="mb-1">Septembre</h6>
                  <small class="text-muted">Rentrée scolaire</small>
                </div>
              </div>
              <div class="col-md-3 text-center">
                <div class="p-3 border rounded">
                  <h4 class="text-success mb-1">18</h4>
                  <h6 class="mb-1">Octobre</h6>
                  <small class="text-muted">Nouveaux élèves</small>
                </div>
              </div>
              <div class="col-md-3 text-center">
                <div class="p-3 border rounded">
                  <h4 class="text-warning mb-1">12</h4>
                  <h6 class="mb-1">Novembre</h6>
                  <small class="text-muted">Inscriptions tardives</small>
                </div>
              </div>
              <div class="col-md-3 text-center">
                <div class="p-3 border rounded">
                  <h4 class="text-info mb-1">8</h4>
                  <h6 class="mb-1">Décembre</h6>
                  <small class="text-muted">Transferts</small>
                </div>
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
              <span class="text-muted">Total cette année</span>
              <span class="badge bg-primary">163 nouveaux élèves</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-xl-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">🎯 Performance Globale</h5>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span>Taux de réussite</span>
              <span class="badge bg-success">87.5%</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span>Moyenne générale</span>
              <span class="badge bg-primary">14.2/20</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span>Taux présence</span>
              <span class="badge bg-info">95.3%</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span>Satisfaction parents</span>
              <span class="badge bg-warning">91.8%</span>
            </div>
            <hr>
            <div class="text-center">
              <h6 class="text-success mb-0">✅ Objectifs 2025 atteints</h6>
            </div>
          </div>
        </div>
      </div>

      <!-- Table d'activité récente -->
      <div class="col-md-12 col-xl-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">📋 Activité Récente</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>UTILISATEUR</th>
                    <th>ACTION</th>
                    <th class="text-end">CLASSE</th>
                    <th class="text-end">STATUT</th>
                  </tr>
                </thead>
                <tbody>
                  @for (activity of activiteRecente; track activity) {
                    <tr>
                      <td>{{ activity.date }}</td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="avatar avatar-sm rounded-circle {{ activity.avatar_bg }} me-2">
                            {{ activity.initiales }}
                          </div>
                          {{ activity.utilisateur }}
                        </div>
                      </td>
                      <td>
                        <span class="d-flex align-items-center">
                          <span class="badge-circle {{ activity.status_type }} me-2"></span>
                          {{ activity.action }}
                        </span>
                      </td>
                      <td class="text-end">{{ activity.classe }}</td>
                      <td class="text-end">
                        <span class="badge {{ activity.badge_class }}">{{ activity.statut }}</span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Métriques détaillées -->
      <div class="col-md-12 col-xl-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">📈 Métriques Détaillées</h5>
          </div>
          <div class="card-body">
            @for (metrique of metriques; track metrique) {
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 class="mb-1">{{ metrique.title }}</h6>
                  <small class="text-muted">{{ metrique.period }}</small>
                </div>
                <div class="text-end">
                  <span class="badge {{ metrique.badge_class }} rounded-pill">{{ metrique.value }}</span>
                  <div>
                    <small class="{{ metrique.trend_class }}">{{ metrique.trend }}</small>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Statistiques par niveau -->
      <div class="col-md-12 col-xl-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">📊 Statistiques par Niveau</h5>
          </div>
          <div class="card-body">
            <div class="row">
              @for (niveau of statistiquesNiveau; track niveau) {
                <div class="col-md-3 mb-3">
                  <div class="border rounded p-3 text-center">
                    <h4 class="{{ niveau.color }} mb-2">{{ niveau.effectif }}</h4>
                    <h6 class="mb-1">{{ niveau.niveau }}</h6>
                    <small class="text-muted d-block">Moyenne: {{ niveau.moyenne }}/20</small>
                    <div class="mt-2">
                      <span class="badge {{ niveau.badge_class }}">{{ niveau.taux_reussite }}% réussite</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="col-md-12 col-xl-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">🔔 Notifications Récentes</h5>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              @for (notification of notifications; track notification) {
                <div class="list-group-item">
                  <div class="d-flex">
                    <div class="flex-shrink-0">
                      <div class="avatar avatar-sm rounded-circle {{ notification.background }}">
                        {{ notification.icon }}
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">{{ notification.title }}</h6>
                        <small class="text-muted">{{ notification.time }}</small>
                      </div>
                      <p class="mb-1 text-muted text-sm">{{ notification.message }}</p>
                      <small class="text-muted">{{ notification.category }}</small>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="row" *ngIf="loading">
      <div class="col-12">
        <div class="card">
          <div class="card-body text-center py-5">
            <div class="spinner-border text-primary mb-3" role="status">
              <span class="visually-hidden">Chargement...</span>
            </div>
            <h5>Chargement du tableau de bord</h5>
            <p class="text-muted">Récupération des données du portail scolaire...</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  // Propriétés
  stats: any = null;
  currentUser: User | null = null;
  loading = false;
  error = '';
  
  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  // Analytics avec emojis pour les icônes
  AnalyticScolaire = [
    {
      title: 'Total Utilisateurs',
      amount: '145',
      background: 'bg-light-primary',
      border: 'border-primary',
      icon: '📈',
      percentage: '+12.5%',
      color: 'text-primary',
      number: '18',
      description: 'Nouveaux inscrits ce mois:',
      period: 'ce mois'
    },
    {
      title: 'Classes Actives',
      amount: '12',
      background: 'bg-light-success',
      border: 'border-success',
      icon: '📊',
      percentage: '+8.2%',
      color: 'text-success',
      number: '2',
      description: 'Nouvelles classes:',
      period: 'ce trimestre'
    },
    {
      title: 'Matières Enseignées',
      amount: '8',
      background: 'bg-light-warning',
      border: 'border-warning',
      icon: '📚',
      percentage: '+25%',
      color: 'text-warning',
      number: '2',
      description: 'Nouvelles matières:',
      period: 'cette année'
    },
    {
      title: 'Notes Saisies',
      amount: '1,250',
      background: 'bg-light-info',
      border: 'border-info',
      icon: '✅',
      percentage: '+15.3%',
      color: 'text-info',
      number: '165',
      description: 'Notes ajoutées:',
      period: 'cette semaine'
    }
  ];

  // Activité récente avec avatars
  activiteRecente = [
    {
      date: '22/07/25',
      utilisateur: 'Marie Dupont',
      initiales: 'MD',
      avatar_bg: 'bg-primary',
      action: 'Saisie notes Mathématiques',
      classe: '5ème A',
      statut: 'Terminé',
      status_type: 'bg-success',
      badge_class: 'bg-success'
    },
    {
      date: '22/07/25',
      utilisateur: 'Pierre Martin',
      initiales: 'PM',
      avatar_bg: 'bg-warning',
      action: 'Inscription nouvel élève',
      classe: '6ème B',
      statut: 'En cours',
      status_type: 'bg-warning',
      badge_class: 'bg-warning'
    },
    {
      date: '21/07/25',
      utilisateur: 'Sophie Bernard',
      initiales: 'SB',
      avatar_bg: 'bg-success',
      action: 'Création nouvelle classe',
      classe: '4ème C',
      statut: 'Terminé',
      status_type: 'bg-success',
      badge_class: 'bg-success'
    },
    {
      date: '21/07/25',
      utilisateur: 'Jean Leroy',
      initiales: 'JL',
      avatar_bg: 'bg-info',
      action: 'Génération bulletin',
      classe: '3ème A',
      statut: 'Validé',
      status_type: 'bg-primary',
      badge_class: 'bg-primary'
    },
    {
      date: '20/07/25',
      utilisateur: 'Anne Dubois',
      initiales: 'AD',
      avatar_bg: 'bg-secondary',
      action: 'Mise à jour profil élève',
      classe: '5ème B',
      statut: 'Terminé',
      status_type: 'bg-success',
      badge_class: 'bg-success'
    }
  ];

  // Métriques détaillées
  metriques = [
    {
      title: 'Notes saisies',
      period: 'Cette semaine',
      value: '165',
      badge_class: 'bg-primary',
      trend: '+22%',
      trend_class: 'text-success'
    },
    {
      title: 'Bulletins générés',
      period: 'Ce mois',
      value: '89',
      badge_class: 'bg-success',
      trend: '+15%',
      trend_class: 'text-success'
    },
    {
      title: 'Parents connectés',
      period: 'Aujourd\'hui',
      value: '42',
      badge_class: 'bg-info',
      trend: '+8%',
      trend_class: 'text-success'
    },
    {
      title: 'Rendez-vous planifiés',
      period: 'Cette semaine',
      value: '28',
      badge_class: 'bg-warning',
      trend: '+12%',
      trend_class: 'text-success'
    }
  ];

  // Statistiques par niveau
  statistiquesNiveau = [
    {
      niveau: '6ème',
      effectif: '42',
      moyenne: '13.8',
      taux_reussite: '89',
      color: 'text-primary',
      badge_class: 'bg-primary'
    },
    {
      niveau: '5ème',
      effectif: '38',
      moyenne: '14.2',
      taux_reussite: '92',
      color: 'text-success',
      badge_class: 'bg-success'
    },
    {
      niveau: '4ème',
      effectif: '35',
      moyenne: '13.5',
      taux_reussite: '86',
      color: 'text-warning',
      badge_class: 'bg-warning'
    },
    {
      niveau: '3ème',
      effectif: '30',
      moyenne: '14.8',
      taux_reussite: '95',
      color: 'text-info',
      badge_class: 'bg-info'
    }
  ];

  // Notifications avec emojis
  notifications = [
    {
      title: 'Nouveau bulletin disponible',
      message: 'Les bulletins du 2ème trimestre sont maintenant disponibles',
      time: '2min',
      category: 'Académique',
      background: 'bg-primary',
      icon: '📋'
    },
    {
      title: 'Conseil de classe programmé',
      message: 'Conseil de classe 5ème A prévu demain à 14h00',
      time: '1h',
      category: 'Événement',
      background: 'bg-warning',
      icon: '📅'
    },
    {
      title: 'Nouvel enseignant',
      message: 'M. Dubois a rejoint l\'équipe pédagogique',
      time: '3h',
      category: 'Personnel',
      background: 'bg-success',
      icon: '👨‍🏫'
    },
    {
      title: 'Maintenance système',
      message: 'Maintenance programmée ce weekend de 20h à 6h',
      time: '1j',
      category: 'Système',
      background: 'bg-info',
      icon: '🔧'
    }
  ];

  ngOnInit(): void {
    console.log('🎨 Mantis Dashboard Ultra Safe - Initialisation');
    
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

  private loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    // Simuler chargement API
    setTimeout(() => {
      this.loading = false;
      console.log('📊 Dashboard Ultra Safe chargé avec succès');
    }, 1500);
  }
}