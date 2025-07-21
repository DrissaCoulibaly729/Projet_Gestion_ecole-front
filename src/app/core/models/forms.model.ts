export interface CreateTeacherRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  date_naissance?: string;
  adresse?: string;
}

export interface CreateStudentRequest {
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

export interface CreateClassRequest {
  nom: string;
  niveau: string;
  section: string;
  effectif_max: number;
  description?: string;
}

export interface CreateSubjectRequest {
  nom: string;
  code: string;
  coefficient: number;
  description?: string;
}
