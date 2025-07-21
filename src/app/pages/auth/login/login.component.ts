import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from 'src/app/core/auth/models/auth.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-main">
      <div class="auth-wrapper v3">
        <div class="auth-form">
          <div class="auth-header">
            <a href="javascript:void(0)">
              <img src="assets/images/logo-dark.svg" alt="logo img" />
            </a>
          </div>
          <div class="card my-5">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-end mb-4">
                <h3 class="mb-0"><b>Connexion</b></h3>
                <p class="text-muted mb-0">Portail Scolaire</p>
              </div>

              <!-- Affichage des erreurs -->
              <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
                <i class="ti ti-alert-circle me-2"></i>
                {{ errorMessage }}
              </div>

              <!-- Affichage du succès -->
              <div *ngIf="successMessage" class="alert alert-success" role="alert">
                <i class="ti ti-check me-2"></i>
                {{ successMessage }}
              </div>

              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="form-group mb-3">
                  <label class="form-label" for="login">Email ou Identifiant*</label>
                  <input 
                    type="text" 
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('login')"
                    id="login" 
                    formControlName="login"
                    placeholder="Entrez votre email ou identifiant"
                  />
                  <div *ngIf="isFieldInvalid('login')" class="invalid-feedback">
                    <span *ngIf="loginForm.get('login')?.errors?.['required']">
                      L'email ou identifiant est requis
                    </span>
                  </div>
                </div>

                <div class="form-group mb-3">
                  <label class="form-label" for="password">Mot de passe*</label>
                  <div class="input-group">
                    <input 
                      [type]="showPassword ? 'text' : 'password'"
                      class="form-control"
                      [class.is-invalid]="isFieldInvalid('mot_de_passe')"
                      id="password" 
                      formControlName="mot_de_passe"
                      placeholder="Entrez votre mot de passe"
                    />
                    <button 
                      class="btn btn-outline-secondary" 
                      type="button"
                      (click)="togglePasswordVisibility()"
                    >
                      <i [class]="showPassword ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
                    </button>
                  </div>
                  <div *ngIf="isFieldInvalid('mot_de_passe')" class="invalid-feedback d-block">
                    <span *ngIf="loginForm.get('mot_de_passe')?.errors?.['required']">
                      Le mot de passe est requis
                    </span>
                  </div>
                </div>

                <div class="d-flex mt-1 justify-content-between align-items-center">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" formControlName="rememberMe" id="rememberMe">
                    <label class="form-check-label" for="rememberMe">
                      Se souvenir de moi
                    </label>
                  </div>
                  <a href="javascript:void(0)" class="text-secondary">Mot de passe oublié?</a>
                </div>

                <div class="d-grid mt-4">
                  <button 
                    type="submit" 
                    class="btn btn-primary" 
                    [disabled]="loginForm.invalid || loading"
                  >
                    <span *ngIf="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <span *ngIf="loading">Connexion...</span>
                    <span *ngIf="!loading">Se connecter</span>
                  </button>
                </div>
              </form>

              <!-- Informations de test -->
              <div class="mt-4 p-3 bg-light rounded">
                <h6 class="mb-2">Comptes de test:</h6>
                <div class="row">
                  <div class="col-md-4">
                    <strong>Admin:</strong><br>
                    <small>admin&#64;school.com</small><br>
                    <small>password</small>
                  </div>
                  <div class="col-md-4">
                    <strong>Enseignant:</strong><br>
                    <small>prof&#64;school.com</small><br>
                    <small>password</small>
                  </div>
                  <div class="col-md-4">
                    <strong>Élève:</strong><br>
                    <small>eleve&#64;school.com</small><br>
                    <small>password</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="auth-footer">
            <p class="text-center text-muted">
              © 2024 École Portail. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      mot_de_passe: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Si déjà connecté, rediriger vers le dashboard
    if (this.authService.isAuthenticated()) {
      this.authService.redirectToDashboard();
    }
  }

  onSubmit(): void {
  console.log('🎨 Mantis Login - Début soumission formulaire');
  
  if (this.loginForm.valid && !this.loading) {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const credentials: LoginRequest = {
      login: this.loginForm.get('login')?.value,
      mot_de_passe: this.loginForm.get('mot_de_passe')?.value
    };

    console.log('🎨 Mantis Login - Tentative connexion pour:', credentials.login);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('🎨 Mantis Login - Réponse serveur:', response);
        
        this.loading = false;
        
        if (response.statut === 'succes') {
          this.successMessage = 'Connexion réussie ! Redirection...';
          console.log('🎨 Mantis Login - Connexion réussie');

          // Récupérer les données utilisateur de la réponse
          const user = response.utilisateur;  // ✅ Utilise la vraie structure
          const token = response.token;  // ✅ Récupère le token
          if (user) {
            console.log('🎨 Mantis Login - Utilisateur connecté:', {
              nom: user.nom,
              prenom: user.prenom,
              role: user.role,
              email: user.email
            });

            // 🎯 REDIRECTION SPÉCIFIQUE THÈME MANTIS
            switch (user.role) {
              case 'administrateur':
                console.log('🎨 Mantis Admin - Redirection vers /admin/dashboard');
                this.router.navigate(['/admin/dashboard']).then(success => {
                  if (success) {
                    console.log('🎨 Mantis Admin - Navigation réussie');
                  } else {
                    console.error('🎨 Mantis Admin - Échec navigation');
                  }
                }).catch(error => {
                  console.error('🎨 Mantis Admin - Erreur navigation:', error);
                });
                break;

              case 'enseignant':
                console.log('🎨 Mantis Enseignant - Redirection vers /enseignant/dashboard');
                this.router.navigate(['/enseignant/dashboard']).then(success => {
                  if (success) {
                    console.log('🎨 Mantis Enseignant - Navigation réussie');
                  } else {
                    console.error('🎨 Mantis Enseignant - Échec navigation');
                  }
                }).catch(error => {
                  console.error('🎨 Mantis Enseignant - Erreur navigation:', error);
                });
                break;

              case 'eleve':
                console.log('🎨 Mantis Élève - Redirection vers /eleve/bulletins');
                this.router.navigate(['/eleve/bulletins']).then(success => {
                  if (success) {
                    console.log('🎨 Mantis Élève - Navigation réussie');
                  } else {
                    console.error('🎨 Mantis Élève - Échec navigation');
                  }
                }).catch(error => {
                  console.error('🎨 Mantis Élève - Erreur navigation:', error);
                });
                break;

              default:
                console.warn('🎨 Mantis - Rôle non reconnu:', user.role);
                this.errorMessage = 'Rôle utilisateur non reconnu. Contactez l\'administrateur.';
                this.router.navigate(['/auth/login']);
            }
          } else {
            console.error('🎨 Mantis Login - Données utilisateur manquantes');
            this.errorMessage = 'Erreur lors de la récupération des données utilisateur.';
          }
        } else {
          console.error('🎨 Mantis Login - Réponse échec:', response);
          this.errorMessage = response.message || 'Échec de la connexion.';
        }
      },
      
      error: (error) => {
        console.error('🎨 Mantis Login - Erreur connexion:', error);
        
        this.loading = false;
        
        // Gestion détaillée des erreurs
        if (error.status === 401) {
          this.errorMessage = 'Email/identifiant ou mot de passe incorrect.';
          console.log('🎨 Mantis Login - Erreur 401: Identifiants incorrects');
        } 
        else if (error.status === 422) {
          console.log('🎨 Mantis Login - Erreur 422: Validation échouée');
          
          if (error.error && error.error.erreurs) {
            // Erreurs de validation Laravel
            const validationErrors = Object.values(error.error.erreurs).flat();
            this.errorMessage = validationErrors.join(', ');
          } else {
            this.errorMessage = 'Données de connexion invalides.';
          }
        } 
        else if (error.status === 0) {
          this.errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
          console.log('🎨 Mantis Login - Erreur 0: Serveur inaccessible');
        } 
        else if (error.status === 500) {
          this.errorMessage = 'Erreur interne du serveur. Veuillez réessayer plus tard.';
          console.log('🎨 Mantis Login - Erreur 500: Erreur serveur');
        } 
        else {
          this.errorMessage = error.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
          console.log('🎨 Mantis Login - Erreur autre:', error.status, error.message);
        }
      }
    });
  } 
  else {
    console.log('🎨 Mantis Login - Formulaire invalide ou chargement en cours');
    
    if (!this.loginForm.valid) {
      console.log('🎨 Mantis Login - Erreurs formulaire:', this.loginForm.errors);
      this.markFormGroupTouched();
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
    
    if (this.loading) {
      console.log('🎨 Mantis Login - Soumission déjà en cours...');
    }
  }
}


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}