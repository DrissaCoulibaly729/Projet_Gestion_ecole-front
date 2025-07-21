import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Mon Profil</h5>
            </div>
            <div class="card-body">
              <p>Page de profil en cours de développement...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {}