import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { AdminService } from '../../../core/services/admin.service';
import { DashboardStats } from '../../../core/models';
// Import du composant Card de Mantis
import { CardComponent } from '../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent], // Utiliser le CardComponent de Mantis
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  stats: DashboardStats | null = null;
  isLoading = true;
  
  private destroy$ = new Subject<void>();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardStats(): void {
    // Simuler des données pour le moment
    setTimeout(() => {
      this.stats = {
        utilisateurs: {
          total: 127,
          par_role: {
            'administrateur': 3,
            'enseignant': 24,
            'eleve': 100
          },
          actifs: 120,
          inactifs: 7
        },
        classes: {
          total: 8,
          effectifs: 200,
          taux_occupation: 85,
          repartition_niveau: {
            '6ème': 2,
            '5ème': 2,
            '4ème': 2,
            '3ème': 2
          }
        },
        matieres: {
          total: 12,
          notes_saisies: 1247,
          moyenne_generale: 14.2
        },
        activite_recente: [
          {
            id: 1,
            type: 'inscription',
            description: 'Nouvel élève inscrit',
            user: { id: 1, nom: 'Dupont', prenom: 'Jean', email: 'jean@test.com' } as any,
            created_at: new Date().toISOString()
          }
        ],
        eleves_difficulte: [],
        excellents_eleves: []
      };
      this.isLoading = false;
    }, 1000);
  }

  refreshStats(): void {
    this.isLoading = true;
    this.loadDashboardStats();
  }
}