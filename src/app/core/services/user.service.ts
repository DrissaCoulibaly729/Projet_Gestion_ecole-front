import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PaginatedResponse } from '../models/common.model';
import { 
  User, 
  UserFilters, 
  CreateEnseignantRequest, 
  CreateEleveRequest, 
  CreateEleveResponse 
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Lister tous les utilisateurs avec filtres et pagination
   */
  getUsers(filters: UserFilters = {}): Observable<ApiResponse<PaginatedResponse<User>>> {
    let params = new HttpParams();
    
    if (filters.role) params = params.set('role', filters.role);
    if (filters.actif !== undefined) params = params.set('actif', filters.actif.toString());
    if (filters.recherche) params = params.set('recherche', filters.recherche);
    if (filters.per_page) params = params.set('per_page', filters.per_page.toString());
    if (filters.page) params = params.set('page', filters.page.toString());

    return this.http.get<ApiResponse<PaginatedResponse<User>>>(
      `${this.API_URL}/admin/utilisateurs`,
      { params }
    );
  }

  /**
   * Récupérer les détails d'un utilisateur spécifique
   */
  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/admin/utilisateurs/${id}`);
  }

  /**
   * Créer un nouveau compte enseignant
   */
  createEnseignant(data: CreateEnseignantRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.API_URL}/admin/utilisateurs/enseignants`, data);
  }

  /**
   * Créer un nouveau compte élève
   */
  createEleve(data: CreateEleveRequest): Observable<ApiResponse<CreateEleveResponse>> {
    return this.http.post<ApiResponse<CreateEleveResponse>>(`${this.API_URL}/admin/utilisateurs/eleves`, data);
  }

  /**
   * Modifier les informations d'un utilisateur
   */
  updateUser(id: number, data: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.API_URL}/admin/utilisateurs/${id}`, data);
  }

  /**
   * Activer ou désactiver un compte utilisateur
   */
  toggleUserStatus(id: number): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(`${this.API_URL}/admin/utilisateurs/${id}/toggle-statut`, {});
  }

  /**
   * Réinitialiser le mot de passe d'un utilisateur
   */
  resetUserPassword(id: number): Observable<ApiResponse<{ nouveau_mot_de_passe: string }>> {
    return this.http.patch<ApiResponse<{ nouveau_mot_de_passe: string }>>(
      `${this.API_URL}/admin/utilisateurs/${id}/reinitialiser-mot-de-passe`, 
      {}
    );
  }

  /**
   * Supprimer définitivement un utilisateur
   */
  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.API_URL}/admin/utilisateurs/${id}`);
  }
}
