import { Classe } from "../../models/classe.model";


export interface LoginRequest {
  login: string;
  mot_de_passe: string;
}

export interface LoginResponse {
  message: string;
  statut: 'succes' | 'erreur';
  data: {
    token: string;
    user: User;
  };
}

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'administrateur' | 'enseignant' | 'eleve';
  actif: boolean;
  created_at: string;
  updated_at: string;
  // Champs spécifiques selon le rôle
  telephone?: string;
  date_naissance?: string;
  adresse?: string;
  // Pour les élèves
  numero_etudiant?: string;
  classe_id?: number;
  classe?: Classe;
  // Pour les parents
  nom_parent?: string;
  prenom_parent?: string;
  telephone_parent?: string;
  email_parent?: string;
}

export interface ChangePasswordRequest {
  ancien_mot_de_passe: string;
  nouveau_mot_de_passe: string;
  nouveau_mot_de_passe_confirmation: string;
}

