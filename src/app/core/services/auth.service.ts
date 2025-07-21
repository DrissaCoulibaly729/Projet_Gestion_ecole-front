// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { 
  LoginRequest, 
  LoginResponse, 
  User, 
  ChangePasswordRequest, 
  ApiResponse 
} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8000/api';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Connexion utilisateur
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/connexion`, credentials)
      .pipe(
        tap(response => {
          if (response.statut === 'succes' && response.data) {
            this.setAuthData(response.data.token, response.data.user);
          }
        })
      );
  }

  /**
   * Déconnexion utilisateur
   */
  logout(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/auth/deconnexion`, {})
      .pipe(
        tap(() => {
          this.clearAuthData();
        })
      );
  }

  /**
   * Récupérer le profil utilisateur
   */
  getProfile(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/auth/profil`)
      .pipe(
        tap(response => {
          if (response.statut === 'succes' && response.data) {
            this.setUser(response.data);
          }
        })
      );
  }

  /**
   * Changer le mot de passe
   */
  changePassword(data: ChangePasswordRequest): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.API_URL}/auth/changer-mot-de-passe`, data);
  }

  /**
   * Vérifier la validité du token
   */
  verifyToken(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}/auth/verifier-token`)
      .pipe(
        tap(response => {
          if (response.statut !== 'succes') {
            this.clearAuthData();
          }
        })
      );
  }

  /**
   * Obtenir le token d'authentification
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  /**
   * Rediriger vers le dashboard selon le rôle
   */
  redirectToDashboard(): void {
    const user = this.getCurrentUser();
    if (!user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    switch (user.role) {
      case 'administrateur':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'enseignant':
        this.router.navigate(['/enseignant/dashboard']);
        break;
      case 'eleve':
        this.router.navigate(['/eleve/bulletins']);
        break;
      default:
        this.router.navigate(['/auth/login']);
    }
  }

  /**
   * Déconnexion rapide (côté client uniquement)
   */
  quickLogout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  // Méthodes privées
  private setAuthData(token: string, user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  private clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private getUserFromStorage(): User | null {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  private hasValidToken(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const user = localStorage.getItem(this.USER_KEY);
      return !!(token && user);
    }
    return false;
  }
}