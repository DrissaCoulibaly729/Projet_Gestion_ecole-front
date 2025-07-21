import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private readonly API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Vérifier le statut de l'API
   */
  checkApiHealth(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/health`);
  }
}
