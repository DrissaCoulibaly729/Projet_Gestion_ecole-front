import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/common.model';
import { 
  Matiere, 
  MatiereFilters, 
  CreateMatiereRequest 
} from '../models/matiere.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Lister toutes les matières avec coefficients et enseignants affectés
   */
  getMatieres(filters: MatiereFilters = {}): Observable<ApiResponse<PaginatedResponse<Matiere>>> {
    let params = new HttpParams();
    
    if (filters.active !== undefined) params = params.set('active', filters.active.toString());
    if (filters.recherche) params = params.set('recherche', filters.recherche);
    if (filters.per_page) params = params.set('per_page', filters.per_page.toString());
    if (filters.page) params = params.set('page', filters.page.toString());

    return this.http.get<ApiResponse<PaginatedResponse<Matiere>>>(
      `${this.API_URL}/admin/matieres`,
      { params }
    );
  }

  /**
   * Récupérer les détails d'une matière avec enseignants et statistiques
   */
  getMatiereById(id: number): Observable<ApiResponse<Matiere>> {
    return this.http.get<ApiResponse<Matiere>>(`${this.API_URL}/admin/matieres/${id}`);
  }

  /**
   * Créer une nouvelle matière
   */
  createMatiere(data: CreateMatiereRequest): Observable<ApiResponse<Matiere>> {
    return this.http.post<ApiResponse<Matiere>>(`${this.API_URL}/admin/matieres`, data);
  }

  /**
   * Modifier une matière existante
   */
  updateMatiere(id: number, data: Partial<CreateMatiereRequest>): Observable<ApiResponse<Matiere>> {
    return this.http.put<ApiResponse<Matiere>>(`${this.API_URL}/admin/matieres/${id}`, data);
  }

  /**
   * Activer ou désactiver une matière
   */
  toggleMatiereStatus(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.API_URL}/admin/matieres/${id}/toggle-statut`, {});
  }

  /**
   * Supprimer une matière
   */
  deleteMatiere(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.API_URL}/admin/matieres/${id}`);
  }

  /**
   * Lister les enseignants disponibles pour affectation à cette matière
   */
  getEnseignantsDisponibles(matiereId: number): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(
      `${this.API_URL}/admin/matieres/${matiereId}/enseignants-disponibles`
    );
  }

  /**
   * Affecter un enseignant à une matière
   */
  affecterEnseignant(matiereId: number, enseignantId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.API_URL}/admin/matieres/${matiereId}/affecter-enseignant`,
      { enseignant_id: enseignantId }
    );
  }

  /**
   * Retirer un enseignant d'une matière
   */
  retirerEnseignant(matiereId: number, enseignantId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.API_URL}/admin/matieres/${matiereId}/enseignants/${enseignantId}`
    );
  }
}
