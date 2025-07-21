import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Template Mantis pour Dashboard Admin -->
    <div class="pc-container">
      <div class="pc-content">
        <!-- [ breadcrumb ] start -->
        <div class="page-header">
          <div class="page-block">
            <div class="row align-items-center">
              <div class="col-md-12">
                <div class="page-header-title">
                  <h2 class="mb-0">🎨 Dashboard Administrateur</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- [ breadcrumb ] end -->

        <!-- [ Main Content ] start -->
        <div class="row">
          <!-- Statistiques Cards Mantis -->
          <div class="col-md-6 col-xl-3">
            <div class="card social-widget-card">
              <div class="card-body-big">
                <h3>👥 Utilisateurs</h3>
                <span class="text-muted">Total des comptes</span>
                <i class="ti ti-users text-primary"></i>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-xl-3">
            <div class="card social-widget-card">
              <div class="card-body-big">
                <h3>🏫 Classes</h3>
                <span class="text-muted">Classes actives</span>
                <i class="ti ti-school text-success"></i>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-xl-3">
            <div class="card social-widget-card">
              <div class="card-body-big">
                <h3>📚 Matières</h3>
                <span class="text-muted">Matières enseignées</span>
                <i class="ti ti-book text-warning"></i>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-xl-3">
            <div class="card social-widget-card">
              <div class="card-body-big">
                <h3>📊 Notes</h3>
                <span class="text-muted">Notes saisies</span>
                <i class="ti ti-chart-bar text-info"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Informations supplémentaires -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h5>🎯 Portail Scolaire - État du Projet</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <h6 class="text-success">✅ Fonctionnalités Opérationnelles :</h6>
                    <ul class="list-unstyled">
                      <li>🔐 <strong>Authentification</strong> - Connexion sécurisée</li>
                      <li>🎨 <strong>Thème Mantis</strong> - Interface moderne</li>
                      <li>👤 <strong>Gestion des rôles</strong> - Admin/Enseignant/Élève</li>
                      <li>🧭 <strong>Navigation dynamique</strong> - Menu selon le rôle</li>
                      <li>📱 <strong>Layout responsive</strong> - Compatible mobile</li>
                    </ul>
                  </div>
                  <div class="col-md-6">
                    <h6 class="text-primary">🚀 Prochaines Fonctionnalités :</h6>
                    <ul class="list-unstyled">
                      <li>👥 <strong>Gestion Utilisateurs</strong> - CRUD complet</li>
                      <li>🏫 <strong>Gestion Classes</strong> - Création et affectation</li>
                      <li>📚 <strong>Gestion Matières</strong> - Coefficients et enseignants</li>
                      <li>📝 <strong>Saisie Notes</strong> - Interface enseignant</li>
                      <li>📄 <strong>Bulletins PDF</strong> - Génération automatique</li>
                      <li>👨‍👩‍👧‍👦 <strong>Portail Parent/Élève</strong> - Consultation bulletins</li>
                    </ul>
                  </div>
                </div>
                
                <div class="alert alert-success mt-3" role="alert">
                  <h4 class="alert-heading">🎉 Connexion Réussie !</h4>
                  <p>Vous êtes maintenant connecté au <strong>Portail Administratif Scolaire</strong> avec le thème Mantis.</p>
                  <hr>
                  <p class="mb-0">Vous pouvez commencer à explorer les fonctionnalités disponibles via le menu de navigation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- [ Main Content ] end -->
      </div>
    </div>
  `,
  styles: [`
    .social-widget-card {
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
    }
    .social-widget-card .card-body-big {
      padding: 25px;
      text-align: center;
    }
    .social-widget-card h3 {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .social-widget-card i {
      font-size: 2rem;
      opacity: 0.8;
      float: right;
      margin-top: -50px;
    }
    .page-header {
      margin-bottom: 2rem;
    }
    .page-header-title h2 {
      color: #2c3e50;
      font-weight: 600;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {

  ngOnInit(): void {
    console.log('🎨 Mantis AdminDashboard - Composant chargé avec succès');
    console.log('🎨 Mantis AdminDashboard - Thème Mantis appliqué');
  }
}
