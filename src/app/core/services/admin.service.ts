import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // ✅ Ajouter map
import { ApiResponse } from '../models/common.model';

// Interface pour les statistiques du dashboard
export interface DashboardStats {
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

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Récupérer les statistiques du dashboard
   * Avec fallback en cas d'erreur API
   */
  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.API_URL}/admin/dashboard`)
      .pipe(
        catchError(error => {
          console.warn('🔄 AdminService - API non disponible, retour de données de test');
          
          // Retourner des données de test en cas d'erreur
          const mockData: ApiResponse<DashboardStats> = {
            message: 'Données de démonstration',
            statut: 'succes',
            data: {
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
                par_niveau: [
                  { niveau: '6ème', count: 3 },
                  { niveau: '5ème', count: 3 },
                  { niveau: '4ème', count: 3 },
                  { niveau: '3ème', count: 3 }
                ]
              },
              matieres: {
                total: 8,
                notes_saisies: 1250,
                moyenne_generale: 14.2
              },
              activite_recente: [
                {
                  id: 1,
                  type: 'inscription',
                  description: 'Nouvel élève inscrit',
                  timestamp: new Date().toISOString()
                },
                {
                  id: 2,
                  type: 'note',
                  description: 'Notes saisies en Mathématiques',
                  timestamp: new Date().toISOString()
                }
              ],
              eleves_difficulte: [
                {
                  id: 1,
                  nom: 'Martin',
                  prenom: 'Pierre',
                  classe: '5ème A',
                  moyenne: 8.5
                }
              ],
              excellents_eleves: [
                {
                  id: 2,
                  nom: 'Dupont',
                  prenom: 'Marie',
                  classe: '4ème B',
                  moyenne: 18.2
                }
              ]
            }
          };

          return of(mockData);
        })
      );
  }

  /**
   * Récupérer les statistiques avancées
   */
  getAdvancedStats(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.API_URL}/admin/dashboard/statistiques-avancees`)
      .pipe(
        catchError(error => {
          console.warn('🔄 AdminService - Statistiques avancées non disponibles');
          
          const mockAdvancedData: ApiResponse<any> = {
            message: 'Statistiques avancées de démonstration',
            statut: 'succes',
            data: {
              evolution_inscriptions: [
                { mois: 'Septembre', inscriptions: 45 },
                { mois: 'Octobre', inscriptions: 12 },
                { mois: 'Novembre', inscriptions: 8 }
              ],
              performance_par_matiere: [
                { matiere: 'Mathématiques', moyenne: 14.5 },
                { matiere: 'Français', moyenne: 13.8 },
                { matiere: 'Anglais', moyenne: 15.2 }
              ],
              taux_reussite_par_classe: [
                { classe: '6ème A', taux: 92 },
                { classe: '5ème A', taux: 88 },
                { classe: '4ème A', taux: 85 }
              ]
            }
          };

          return of(mockAdvancedData);
        })
      );
  }

  /**
   * Test de connectivité API
   */
  testApiConnection(): Observable<boolean> {
    return this.http.get(`${this.API_URL}/health`)
      .pipe(
        map(() => true), // ✅ Transformer la réponse en boolean
        catchError(error => {
          console.warn('🔄 AdminService - Test de connexion API échoué');
          return of(false);
        })
      );
  }

  /**
   * Méthode utilitaire pour vérifier si l'API est disponible
   */
  isApiAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
      this.testApiConnection().subscribe({
        next: (isAvailable) => resolve(isAvailable),
        error: () => resolve(false)
      });
    });
  }
}