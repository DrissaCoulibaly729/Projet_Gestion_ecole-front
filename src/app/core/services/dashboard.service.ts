import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/common.model';
import { DashboardStats, AdvancedStats } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Récupérer les statistiques du dashboard principal
   */
  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.API_URL}/admin/dashboard`);
  }

  /**
   * Récupérer les statistiques avancées
   */
  getAdvancedStats(): Observable<ApiResponse<AdvancedStats>> {
    return this.http.get<ApiResponse<AdvancedStats>>(`${this.API_URL}/admin/dashboard/statistiques-avancees`);
  }
}