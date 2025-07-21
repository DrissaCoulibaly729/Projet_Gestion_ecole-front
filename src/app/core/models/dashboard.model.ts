import { User } from "./auth.model";

export interface DashboardStats {
  statistiques_utilisateurs: {
    total: number;
    par_role: {
      administrateur: number;
      enseignant: number;
      eleve: number;
    };
    actifs: number;
    inactifs: number;
  };
  statistiques_classes: {
    total: number;
    effectifs: number;
    taux_occupation: number;
  };
  statistiques_matieres_notes: {
    total_matieres: number;
    total_notes: number;
    moyenne_generale: number;
  };
  activite_recente: any[];
  eleves_difficulte: User[];
  excellents_eleves: User[];
}

export interface AdvancedStats {
  evolution_inscriptions: any[];
  performance_par_matiere: any[];
  taux_reussite_par_classe: any[];
  distribution_notes: any[];
  enseignants_actifs: User[];
}
