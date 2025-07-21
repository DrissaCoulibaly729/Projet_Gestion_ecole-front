import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body text-center">
              <h1 class="display-1 text-info">404</h1>
              <h2>Page Non Trouvée</h2>
              <p class="text-muted">La page que vous recherchez n'existe pas.</p>
              <a routerLink="/" class="btn btn-primary">
                Retour à l'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {}