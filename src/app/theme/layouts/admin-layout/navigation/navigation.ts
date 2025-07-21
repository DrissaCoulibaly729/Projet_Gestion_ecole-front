export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
  roles?: string[]; // Ajout pour la gestion des rôles
}

// Navigation pour Administrateur
export const AdminNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Tableau de bord',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'admin-dashboard',
        title: 'Vue d\'ensemble',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/dashboard',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'user-management',
    title: 'Gestion des Utilisateurs',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'users',
        title: 'Utilisateurs',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'team',
        children: [
          {
            id: 'users-list',
            title: 'Liste des utilisateurs',
            type: 'item',
            url: '/admin/users',
            classes: 'nav-item'
          },
          {
            id: 'create-teacher',
            title: 'Nouvel enseignant',
            type: 'item',
            url: '/admin/users/create/teacher',
            classes: 'nav-item'
          },
          {
            id: 'create-student',
            title: 'Nouvel élève',
            type: 'item',
            url: '/admin/users/create/student',
            classes: 'nav-item'
          }
        ]
      }
    ]
  },
  {
    id: 'academic-management',
    title: 'Gestion Académique',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'classes',
        title: 'Classes',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/classes',
        icon: 'home',
      },
      {
        id: 'subjects',
        title: 'Matières',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/subjects',
        icon: 'book',
      }
    ]
  }
];

// Navigation pour Enseignant
export const TeacherNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Tableau de bord',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'teacher-dashboard',
        title: 'Vue d\'ensemble',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher/dashboard',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'teaching',
    title: 'Enseignement',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'my-classes',
        title: 'Mes Classes',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher/classes',
        icon: 'team',
      },
      {
        id: 'grades',
        title: 'Saisie Notes',
        type: 'item',
        classes: 'nav-item',
        url: '/teacher/grades',
        icon: 'edit',
      }
    ]
  }
];

// Navigation pour Élève
export const StudentNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Accueil',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'student-dashboard',
        title: 'Mon espace',
        type: 'item',
        classes: 'nav-item',
        url: '/student/dashboard',
        icon: 'home',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'studies',
    title: 'Mes Études',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'my-grades',
        title: 'Mes Notes',
        type: 'item',
        classes: 'nav-item',
        url: '/student/grades',
        icon: 'bar-chart',
      },
      {
        id: 'bulletins',
        title: 'Bulletins',
        type: 'item',
        classes: 'nav-item',
        url: '/student/bulletins',
        icon: 'file-pdf',
      }
    ]
  }
];

// Navigation par défaut (on garde l'existante pour la compatibilité)
export const NavigationItems: NavigationItem[] = AdminNavigationItems;