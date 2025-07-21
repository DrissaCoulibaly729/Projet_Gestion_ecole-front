import { PaginationParams, User } from "./";

export interface Classe {
  id: number;
  nom: string;
  niveau: string;
  section: string;
  effectif_max: number;
  effectif_actuel: number;
  description?: string;
  actif: boolean;
  created_at: string;
  updated_at: string;
  eleves?: User[];
  enseignants?: User[];
  statistiques?: {
    moyenne_classe: number;
    taux_reussite: number;
  };
}

export interface ClasseFilters extends PaginationParams {
  niveau?: string;
  active?: boolean;
}

export interface CreateClasseRequest {
  nom: string;
  niveau: string;
  section: string;
  effectif_max: number;
  description?: string;
}

export interface ClasseStats {
  total_classes: number;
  capacite_totale: number;
  taux_occupation: number;
  repartition_par_niveau: { [niveau: string]: number };
}

// src/app/core/models/matiere.model.ts
export interface Matiere {
  id: number;
  nom: string;
  code: string;
  coefficient: number;
  description?: string;
  actif: boolean;
  created_at: string;
  updated_at: string;
  enseignants?: User[];
  statistiques?: {
    nombre_notes: number;
    moyenne_generale: number;
  };
}

export interface MatiereFilters extends PaginationParams {
  active?: boolean;
}

export interface CreateMatiereRequest {
  nom: string;
  code: string;
  coefficient: number;
  description?: string;
}

export interface AffecterEnseignantRequest {
  enseignant_id: number;
}
