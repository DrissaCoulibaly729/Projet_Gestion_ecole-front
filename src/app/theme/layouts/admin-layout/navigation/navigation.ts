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
  roles?: string[]; // ✅ IMPORTANT: Propriété pour la gestion des rôles
}

// Navigation pour Administrateur
export const AdminNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Tableau de bord',
    type: 'group',
    icon: 'dashboard',
    children: [
      {
        id: 'admin-dashboard',
        title: 'Vue d\'ensemble',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/dashboard',
        icon: 'dashboard',
        breadcrumbs: false,
        roles: ['administrateur'] // ✅ Visible uniquement pour les admins
      }
    ]
  },
  {
    id: 'user-management',
    title: 'Gestion',
    type: 'group',
    icon: 'users',
    children: [
      {
        id: 'users',
        title: 'Utilisateurs',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/utilisateurs',
        icon: 'users',
        roles: ['administrateur']
      },
      {
        id: 'classes',
        title: 'Classes',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/classes',
        icon: 'home',
        roles: ['administrateur']
      },
      {
        id: 'subjects',
        title: 'Matières',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/matieres',
        icon: 'book',
        roles: ['administrateur']
      }
    ]
  }
];

// Navigation pour Enseignant
export const TeacherNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Mon espace',
    type: 'group',
    icon: 'dashboard',
    children: [
      {
        id: 'teacher-dashboard',
        title: 'Accueil',
        type: 'item',
        url: '/enseignant/dashboard',
        icon: 'dashboard',
        roles: ['enseignant']
      }
    ]
  },
  {
    id: 'teaching',
    title: 'Enseignement',
    type: 'group',
    icon: 'book',
    children: [
      {
        id: 'my-classes',
        title: 'Mes Classes',
        type: 'item',
        url: '/enseignant/classes',
        icon: 'users',
        roles: ['enseignant']
      },
      {
        id: 'grades',
        title: 'Saisie Notes',
        type: 'item',
        url: '/enseignant/notes',
        icon: 'edit',
        roles: ['enseignant']
      }
    ]
  }
];

// Navigation pour Élève
export const StudentNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Mon espace',
    type: 'group',
    icon: 'dashboard',
    children: [
      {
        id: 'student-dashboard',
        title: 'Accueil',
        type: 'item',
        url: '/eleve/dashboard',
        icon: 'home',
        roles: ['eleve']
      }
    ]
  },
  {
    id: 'studies',
    title: 'Mes Études',
    type: 'group',
    icon: 'book',
    children: [
      {
        id: 'bulletins',
        title: 'Bulletins',
        type: 'item',
        url: '/eleve/bulletins',
        icon: 'file-text',
        roles: ['eleve']
      }
    ]
  }
];

// ✅ EXPORT PRINCIPAL: Navigation dynamique selon le rôle
export const NavigationItems = [
  ...AdminNavigationItems,
  ...TeacherNavigationItems,
  ...StudentNavigationItems
];