import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';

// Navigation
import { NavigationItem, AdminNavigationItems, TeacherNavigationItems, StudentNavigationItems } from '../navigation';

// Composants
import { NavGroupComponent } from './nav-group/nav-group.component';

// Auth
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { UserRole } from '../../../../../core/models/user.model';

// Icones
import { IconService } from '@ant-design/icons-angular';
import {
  DashboardOutline,
  CreditCardOutline,
  LoginOutline,
  QuestionOutline,
  ChromeOutline,
  FontSizeOutline,
  ProfileOutline,
  BgColorsOutline,
  AntDesignOutline
} from '@ant-design/icons-angular/icons';

// Environnement
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule, RouterModule, NgScrollbarModule, NavGroupComponent],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  private location = inject(Location);
  private locationStrategy = inject(LocationStrategy);
  private iconService = inject(IconService);
  private authService = inject(AuthService);

  navigations: NavigationItem[] = [];

  // Version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  windowWidth = window.innerWidth;

  constructor() {
    // Chargement des icônes
    this.iconService.addIcon(
      ...[
        DashboardOutline,
        CreditCardOutline,
        FontSizeOutline,
        LoginOutline,
        ProfileOutline,
        BgColorsOutline,
        AntDesignOutline,
        ChromeOutline,
        QuestionOutline
      ]
    );
  }

  ngOnInit(): void {
    // Adapter le menu sur petit écran
    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement)?.classList.add('menupos-static');
    }

    // Navigation dynamique selon le rôle
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.navigations = this.getNavigationByRole(user.role);
      }
    });
  }

  private getNavigationByRole(role: UserRole): NavigationItem[] {
    switch (role) {
      case 'administrateur':
        return AdminNavigationItems;
      case 'enseignant':
        return TeacherNavigationItems;
      case 'eleve':
        return StudentNavigationItems;
      default:
        return AdminNavigationItems;
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger', 'active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger', 'active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger', 'active');
      }
    }
  }

  navMob() {
    const navbar = document.querySelector('app-navigation.coded-navbar');
    if (this.windowWidth < 1025 && navbar?.classList.contains('mob-open')) {
      // Ajouter ici un EventEmitter si nécessaire
    }
  }
}
