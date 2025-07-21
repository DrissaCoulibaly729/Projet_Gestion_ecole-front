import { PaginationParams } from "../../models";
import {  User } from "./auth.model";

export interface UserFilters extends PaginationParams {
  role?: 'enseignant' | 'eleve' | 'administrateur';
  actif?: boolean;
}

export interface CreateEnseignantRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  date_naissance?: string;
  adresse?: string;
}

export interface CreateEleveRequest {
  nom: string;
  prenom: string;
  email: string;
  classe_id: number;
  date_naissance: string;
  nom_parent: string;
  prenom_parent: string;
  telephone_parent: string;
  email_parent: string;
}

export interface CreateEleveResponse {
  user: User;
  numero_etudiant: string;
  identifiants_connexion: {
    login: string;
    mot_de_passe: string;
  };
}

export type UserRole = 'administrateur' | 'enseignant' | 'eleve';