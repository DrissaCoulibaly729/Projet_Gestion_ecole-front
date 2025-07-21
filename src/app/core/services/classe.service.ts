import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/common.model';
import { 
  Classe, 
  ClasseFilters, 
  CreateClasseRequest, 
  ClasseStats 
} from '../models/classe.model';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Lister toutes les classes avec effectifs et enseignants
   */
  getClasses(filters: ClasseFilters = {}): Observable<ApiResponse<PaginatedResponse<Classe>>> {
    let params = new HttpParams();
    
    if (filters.niveau) params = params.set('niveau', filters.niveau);
    if (filters.active !== undefined) params = params.set('active', filters.active.toString());
    if (filters.recherche) params = params.set('recherche', filters.recherche);
    if (filters.per_page) params = params.set('per_page', filters.per_page.toString());
    if (filters.page) params = params.set('page', filters.page.toString());

    return this.http.get<ApiResponse<PaginatedResponse<Classe>>>(
      `${this.API_URL}/admin/classes`,
      { params }
    );
  }

  /**
   * Récupérer les détails d'une classe avec liste des élèves et enseignants
   */
  getClasseById(id: number): Observable<ApiResponse<Classe>> {
    return this.http.get<ApiResponse<Classe>>(`${this.API_URL}/admin/classes/${id}`);
  }

  /**
   * Récupérer les statistiques globales sur toutes les classes
   */
  getClassesStats(): Observable<ApiResponse<ClasseStats>> {
    return this.http.get<ApiResponse<ClasseStats>>(`${this.API_URL}/admin/classes/statistiques`);
  }

  /**
   * Créer une nouvelle classe
   */
  createClasse(data: CreateClasseRequest): Observable<ApiResponse<Classe>> {
    return this.http.post<ApiResponse<Classe>>(`${this.API_URL}/admin/classes`, data);
  }

  /**
   * Modifier les informations d'une classe
   */
  updateClasse(id: number, data: Partial<CreateClasseRequest>): Observable<ApiResponse<Classe>> {
    return this.http.put<ApiResponse<Classe>>(`${this.API_URL}/admin/classes/${id}`, data);
  }

  /**
   * Activer ou désactiver une classe
   */
  toggleClasseStatus(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.API_URL}/admin/classes/${id}/toggle-statut`, {});
  }

  /**
   * Supprimer une classe
   */
  deleteClasse(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.API_URL}/admin/classes/${id}`);
  }

  /**
   * Affecter un enseignant à une classe
   */
  affecterEnseignant(classeId: number, enseignantId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.API_URL}/admin/classes/${classeId}/affecter-enseignant`,
      { enseignant_id: enseignantId }
    );
  }

  /**
   * Retirer un enseignant d'une classe
   */
  retirerEnseignant(classeId: number, enseignantId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${this.API_URL}/admin/classes/${classeId}/enseignants/${enseignantId}`
    );
  }
}