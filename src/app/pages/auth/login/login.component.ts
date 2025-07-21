import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from 'src/app/core/auth/models/auth.model';
import { delay, filter, switchMap, take } from 'rxjs';


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
  if (this.loginForm.valid && !this.loading) {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const credentials: LoginRequest = {
      login: this.loginForm.get('login')?.value,
      mot_de_passe: this.loginForm.get('mot_de_passe')?.value
    };

    console.log('🎨 Mantis - Tentative de connexion...');

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('🎨 Mantis - Réponse reçue:', response.statut);
        
        if (response.statut === 'succes') {
          this.successMessage = 'Connexion réussie ! Redirection...';

          const user = response.utilisateur;
          const token = response.token;
          
          if (user && token) {
            console.log('🎨 Mantis - Données utilisateur reçues:', user.role);

            // ✅ SOLUTION SIMPLE : Utiliser setAuthData existant
            this.authService.setAuthData(token, user);
            
            // ✅ MAIS empêcher la redirection automatique et gérer manuellement
            console.log('🎨 Mantis - Attente état stable...');
            
            // Attendre que l'état soit propagé PUIS naviguer
            this.authService.isAuthenticated$.pipe(
              filter(isAuth => isAuth === true), // Attendre que l'auth soit true
              take(1), // Une seule fois
              delay(100) // Petit délai de sécurité
            ).subscribe({
              next: () => {
                console.log('🎨 Mantis - État authentification stable');
                console.log('🎨 Mantis - Vérification finale:', this.authService.isAuthenticated);
                
                // Maintenant naviguer
                this.navigateByRole(user.role);
              },
              error: (error) => {
                console.error('❌ Erreur attente état:', error);
                this.loading = false;
                this.errorMessage = 'Erreur de synchronisation';
              }
            });

          } else {
            console.error('❌ Mantis - Données utilisateur ou token manquants');
            this.loading = false;
            this.errorMessage = 'Erreur dans les données de connexion';
          }
        } else {
          this.loading = false;
          this.errorMessage = response.message || 'Erreur de connexion';
        }
      },
      error: (error) => {
        console.error('❌ Mantis - Erreur login:', error);
        this.loading = false;
        this.errorMessage = 'Erreur de connexion. Vérifiez vos identifiants.';
      }
    });
  }
}



private navigateByRole(role: string): void {
  let targetRoute: string;
  
  switch (role) {
    case 'administrateur':
      targetRoute = '/admin/dashboard';
      break;
    case 'enseignant':
      targetRoute = '/enseignant/dashboard';
      break;
    case 'eleve':
      targetRoute = '/eleve/bulletins';
      break;
    default:
      console.error('❌ Rôle non reconnu:', role);
      this.loading = false;
      this.errorMessage = 'Rôle utilisateur non reconnu';
      return;
  }

  console.log(`🎨 Mantis - Navigation simple vers ${targetRoute}`);
  
  this.router.navigate([targetRoute]).then(success => {
    console.log(`🎨 Mantis - Navigation result:`, success);
    this.loading = false;
    
    if (!success) {
      console.log('🔄 Fallback navigation...');
      window.location.href = targetRoute;
    }
  });
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