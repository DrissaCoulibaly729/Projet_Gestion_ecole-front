

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { 
 ApiResponse,
  LoginRequest, 
  LoginResponse, 
  ChangePasswordRequest,
  AuthState,
  User, 
  UserRole
} from '../../models';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8000/api';
  private readonly TOKEN_KEY = 'school_auth_token';
  private readonly USER_KEY = 'school_auth_user';

  // État de l'authentification
  private authState$ = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }

  // ==========================================
  // GETTERS PUBLICS
  // ==========================================

  get currentUser$(): Observable<User | null> {
    return this.authState$.asObservable().pipe(
      map(state => state.user)
    );
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authState$.asObservable().pipe(
      map(state => state.isAuthenticated)
    );
  }

  get isLoading$(): Observable<boolean> {
    return this.authState$.asObservable().pipe(
      map(state => state.isLoading)
    );
  }

  get currentUser(): User | null {
    return this.authState$.value.user;
  }

  get token(): string | null {
    return this.authState$.value.token;
  }

  get isAuthenticated(): boolean {
    return this.authState$.value.isAuthenticated;
  }

  get userRole(): UserRole | null {
    return this.currentUser?.role || null;
  }

  // ==========================================
  // MÉTHODES D'AUTHENTIFICATION
  // ==========================================

  /**
   * Connexion utilisateur
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.setLoading(true);
    
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/connexion`, credentials)
      .pipe(
        tap(response => {
          if (response.statut === 'succes' && response.data) {
            this.setAuthData(response.data.user, response.data.token);
            this.redirectAfterLogin();
          }
        }),
        catchError(error => this.handleAuthError(error)),
        tap(() => this.setLoading(false))
      );
  }

  /**
   * Déconnexion utilisateur
   */
  logout(): Observable<any> {
    const token = this.token;
    
    if (token) {
      return this.http.post(`${this.API_URL}/auth/deconnexion`, {}, {
        headers: this.getAuthHeaders()
      }).pipe(
        tap(() => this.clearAuthData()),
        catchError(() => {
          // Même si l'API échoue, on déconnecte localement
          this.clearAuthData();
          return throwError('Erreur lors de la déconnexion');
        })
      );
    } else {
      this.clearAuthData();
      return new Observable(observer => observer.complete());
    }
  }

  /**
   * Récupération du profil utilisateur
   */
  getProfile(): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/auth/profil`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (response.statut === 'succes' && response.data) {
          // Mettre à jour les données utilisateur
          this.updateUserData(response.data);
          return response.data;
        }
        throw new Error('Erreur lors de la récupération du profil');
      }),
      catchError(error => this.handleAuthError(error))
    );
  }

  /**
   * Changement de mot de passe
   */
  changePassword(passwordData: ChangePasswordRequest): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.API_URL}/auth/changer-mot-de-passe`, passwordData, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => this.handleAuthError(error))
    );
  }

  /**
   * Vérification de la validité du token
   */
  verifyToken(): Observable<boolean> {
    return this.http.get<ApiResponse>(`${this.API_URL}/auth/verifier-token`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.statut === 'succes'),
      catchError(() => {
        this.clearAuthData();
        return [false];
      })
    );
  }

  // ==========================================
  // MÉTHODES UTILITAIRES
  // ==========================================

  /**
   * Vérification du rôle utilisateur
   */
  hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

  /**
   * Vérification des rôles multiples
   */
  hasAnyRole(roles: UserRole[]): boolean {
    return this.currentUser ? roles.includes(this.currentUser.role) : false;
  }

  /**
   * Redirection après connexion selon le rôle
   */
  private redirectAfterLogin(): void {
    const role = this.userRole;
    let redirectUrl = '/';

    switch (role) {
      case 'administrateur':
        redirectUrl = '/admin/dashboard';
        break;
      case 'enseignant':
        redirectUrl = '/teacher/dashboard';
        break;
      case 'eleve':
        redirectUrl = '/student/dashboard';
        break;
    }

    this.router.navigate([redirectUrl]);
  }

  // ==========================================
  // MÉTHODES PRIVÉES
  // ==========================================

  /**
   * Initialisation de l'authentification au démarrage
   */
  private initializeAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);

    if (token && userData) {
      try {
        const user: User = JSON.parse(userData);
        this.setAuthData(user, token);
        
        // Vérifier la validité du token
        this.verifyToken().subscribe({
          next: (isValid) => {
            if (!isValid) {
              this.clearAuthData();
            }
            this.setLoading(false);
          },
          error: () => {
            this.clearAuthData();
            this.setLoading(false);
          }
        });
      } catch {
        this.clearAuthData();
        this.setLoading(false);
      }
    } else {
      this.setLoading(false);
    }
  }

  /**
   * Définir les données d'authentification
   */
  private setAuthData(user: User, token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    this.authState$.next({
      user,
      token,
      isAuthenticated: true,
      isLoading: false
    });
  }

  /**
   * Mettre à jour les données utilisateur
   */
  private updateUserData(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    const currentState = this.authState$.value;
    this.authState$.next({
      ...currentState,
      user
    });
  }

  /**
   * Effacer les données d'authentification
   */
  private clearAuthData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.authState$.next({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });

    this.router.navigate(['/auth/login']);
  }

  /**
   * Définir l'état de chargement
   */
  private setLoading(loading: boolean): void {
    const currentState = this.authState$.value;
    this.authState$.next({
      ...currentState,
      isLoading: loading
    });
  }

  /**
   * Obtenir les headers d'authentification
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
  }

  /**
   * Gestion des erreurs d'authentification
   */
  private handleAuthError(error: any): Observable<never> {
    console.error('Erreur d\'authentification:', error);
    
    if (error.status === 401) {
      this.clearAuthData();
    }
    
    return throwError(() => error);
  }
}