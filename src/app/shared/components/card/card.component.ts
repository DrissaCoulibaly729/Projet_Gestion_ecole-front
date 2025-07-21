import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class]="cardClass">
      <div class="card-header" *ngIf="cardTitle || headerTemplate">
        <ng-content select="[slot=header]"></ng-content>
        <h5 *ngIf="cardTitle" class="mb-0">{{ cardTitle }}</h5>
      </div>
      <div class="card-body" [class]="bodyClass">
        <ng-content></ng-content>
      </div>
      <div class="card-footer" *ngIf="footerTemplate">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() cardTitle?: string;
  @Input() cardClass?: string;
  @Input() bodyClass?: string;
  @Input() headerTemplate = false;
  @Input() footerTemplate = false;
}
