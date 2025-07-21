export interface MenuItem {
  id: string;
  title: string;
  type: 'item' | 'group' | 'collapse';
  icon?: string;
  url?: string;
  classes?: string;
  breadcrumbs?: boolean;
  roles?: string[];  // ✅ ASSUREZ-VOUS QUE CETTE LIGNE EXISTE
  children?: MenuItem[];
}

// Navigation pour Administrateur
export const AdminMenuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Tableau de Bord',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'admin-dashboard',
        title: 'Accueil',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/dashboard',
        icon: 'dashboard'
      }
    ]
  }
];


export const menuItems = AdminMenuItems;