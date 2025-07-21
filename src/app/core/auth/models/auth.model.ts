import { Classe } from "../../models/classe.model";


export interface LoginRequest {
  login: string;
  mot_de_passe: string;
}

export interface LoginResponse {
  message: string;
  statut: 'succes' | 'erreur';
  utilisateur: User;    // ✅ "utilisateur" au lieu de "data.user"
  token: string;        // ✅ "token" direct au lieu de "data.token"  
  type_token: string;   // ✅ "Bearer"
}


export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'administrateur' | 'enseignant' | 'eleve';
  identifiant_genere?: string | null;  // ✅ Ajouté selon votre réponse API
  // Autres champs optionnels selon vos besoins
  actif?: boolean;
  created_at?: string;
  updated_at?: string;
  telephone?: string;
  date_naissance?: string;
  adresse?: string;
  // Pour les élèves
  numero_etudiant?: string;
  classe_id?: number;
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

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}