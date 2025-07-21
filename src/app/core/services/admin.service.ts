import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/common.model';

export interface DashboardStats {
  utilisateurs: {
    total: number;
    par_role: {
      administrateur: number;
      enseignant: number;
      eleve: number;
    };
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
  activite_recente: any[];
  eleves_difficulte: any[];
  excellents_eleves: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.API_URL}/admin/dashboard`);
  }
}
