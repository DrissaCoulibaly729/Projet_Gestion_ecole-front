import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- MANTIS Dashboard -->
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h5>Tableau de Bord Administrateur</h5>
          </div>
          <div class="card-body">
            <!-- Stats Cards avec style Mantis -->
            <div class="row">
              <div class="col-md-6 col-xl-3">
                <div class="card daily-sales">
                  <div class="card-block">
                    <h6 class="mb-4">Utilisateurs</h6>
                    <div class="row d-flex align-items-center">
                      <div class="col-9">
                        <h3 class="f-w-300 d-flex align-items-center m-b-0">
                          <i class="feather icon-users text-c-green f-30 m-r-5"></i> {{ stats.users || 0 }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="col-md-6 col-xl-3">
                <div class="card daily-sales">
                  <div class="card-block">
                    <h6 class="mb-4">Classes</h6>
                    <div class="row d-flex align-items-center">
                      <div class="col-9">
                        <h3 class="f-w-300 d-flex align-items-center m-b-0">
                          <i class="feather icon-home text-c-blue f-30 m-r-5"></i> {{ stats.classes || 0 }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-xl-3">
                <div class="card daily-sales">
                  <div class="card-block">
                    <h6 class="mb-4">Matières</h6>
                    <div class="row d-flex align-items-center">
                      <div class="col-9">
                        <h3 class="f-w-300 d-flex align-items-center m-b-0">
                          <i class="feather icon-book text-c-yellow f-30 m-r-5"></i> {{ stats.subjects || 0 }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-xl-3">
                <div class="card daily-sales">
                  <div class="card-block">
                    <h6 class="mb-4">Notes</h6>
                    <div class="row d-flex align-items-center">
                      <div class="col-9">
                        <h3 class="f-w-300 d-flex align-items-center m-b-0">
                          <i class="feather icon-trending-up text-c-red f-30 m-r-5"></i> {{ stats.grades || 0 }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section info -->
            <div class="row mt-4">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h5><i class="feather icon-info m-r-5"></i>Portail Scolaire - État</h5>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <h6 class="text-muted">Fonctionnalités Implémentées :</h6>
                        <ul class="list-unstyled">
                          <li><i class="feather icon-check-circle text-c-green m-r-10"></i>Authentification</li>
                          <li><i class="feather icon-check-circle text-c-green m-r-10"></i>Dashboard Administrateur</li>
                          <li><i class="feather icon-check-circle text-c-green m-r-10"></i>Thème Mantis intégré</li>
                        </ul>
                      </div>
                      <div class="col-md-6">
                        <h6 class="text-muted">Prochaines Étapes :</h6>
                        <ul class="list-unstyled">
                          <li><i class="feather icon-clock text-c-yellow m-r-10"></i>Gestion des Utilisateurs</li>
                          <li><i class="feather icon-clock text-c-yellow m-r-10"></i>Gestion des Classes</li>
                          <li><i class="feather icon-clock text-c-yellow m-r-10"></i>Gestion des Matières</li>
                          <li><i class="feather icon-clock text-c-yellow m-r-10"></i>Saisie de Notes</li>
                          <li><i class="feather icon-clock text-c-yellow m-r-10"></i>Portail Élève/Parent</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .daily-sales {
      border-left: 3px solid #1abc9c;
    }
    .text-c-green { color: #1abc9c !important; }
    .text-c-blue { color: #3498db !important; }
    .text-c-yellow { color: #f39c12 !important; }
    .text-c-red { color: #e74c3c !important; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    users: 45,
    classes: 12,
    subjects: 8,
    grades: 234
  };

  ngOnInit(): void {
    // TODO : Charger les vraies stats depuis l'API
    console.log('Dashboard Admin chargé avec thème Mantis');
  }
}