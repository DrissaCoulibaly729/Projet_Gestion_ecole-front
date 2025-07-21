import { User } from "./auth.model";
import { UserRole } from "./user.model";



export interface ApiResponse<T = any> {
  message: string;
  statut: 'succes' | 'erreur';
  data?: T;
  erreurs?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

export interface DashboardStats {
  utilisateurs: {
    total: number;
    par_role: Record<UserRole, number>;
    actifs: number;
    inactifs: number;
  };
  classes: {
    total: number;
    effectifs: number;
    taux_occupation: number;
    repartition_niveau: Record<string, number>;
  };
  matieres: {
    total: number;
    notes_saisies: number;
    moyenne_generale: number;
  };
  activite_recente: ActivityItem[];
  eleves_difficulte: User[];
  excellents_eleves: User[];
}

export interface ActivityItem {
  id: number;
  type: 'inscription' | 'note' | 'connexion';
  description: string;
  user: User;
  created_at: string;
}