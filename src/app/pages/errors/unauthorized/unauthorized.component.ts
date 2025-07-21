import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h1 class="display-1 text-warning">403</h1>
              <h2>Accès Non Autorisé</h2>
              <p class="text-muted">Vous n'avez pas les permissions nécessaires.</p>
              <a routerLink="/admin/dashboard" class="btn btn-primary">
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {}