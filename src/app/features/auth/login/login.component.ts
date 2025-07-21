import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../core/auth/services/auth.service';
import { LoadingService } from '../../../core/services/loading.service';
import { LoginRequest } from 'src/app/core/models';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  errorMessage = '';
  isLoading = false;
  showPassword = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    // Écouter l'état de chargement global
    this.loadingService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.isLoading = loading);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Créer le formulaire de connexion
   */
  private createForm(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Soumettre le formulaire de connexion
   */
  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.errorMessage = '';
      const credentials: LoginRequest = this.loginForm.value;
      
      this.authService.login(credentials)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            // La redirection est gérée automatiquement dans le service
            console.log('Connexion réussie:', response.message);
          },
          error: (error) => {
            this.handleLoginError(error);
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  /**
   * Gérer les erreurs de connexion
   */
  private handleLoginError(error: any): void {
    if (error.status === 401) {
      this.errorMessage = 'Identifiants incorrects. Veuillez vérifier votre email/identifiant et mot de passe.';
    } else if (error.status === 422 && error.errors) {
      // Erreurs de validation
      const validationErrors = Object.values(error.errors).flat();
      this.errorMessage = validationErrors.join(', ');
    } else if (error.error && error.error.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
    }
  }

  /**
   * Marquer tous les champs comme touchés pour afficher les erreurs
   */
  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Basculer la visibilité du mot de passe
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Vérifier si un champ a une erreur
   */
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.loginForm.get(fieldName);
    if (!field) return false;
    
    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }
    
    return field.invalid && (field.dirty || field.touched);
  }

  /**
   * Obtenir le message d'erreur pour un champ
   */
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.errors) return '';
    
    const errors = field.errors;
    
    if (errors['required']) {
      return `${this.getFieldDisplayName(fieldName)} est requis.`;
    }
    
    if (errors['minlength']) {
      const minLength = errors['minlength'].requiredLength;
      return `${this.getFieldDisplayName(fieldName)} doit contenir au moins ${minLength} caractères.`;
    }
    
    return 'Champ invalide.';
  }

  /**
   * Obtenir le nom d'affichage du champ
   */
  private getFieldDisplayName(fieldName: string): string {
    const displayNames: Record<string, string> = {
      'login': 'Email/Identifiant',
      'mot_de_passe': 'Mot de passe'
    };
    
    return displayNames[fieldName] || fieldName;
  }
}
