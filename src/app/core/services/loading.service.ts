import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private activeRequests = 0;

  get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  setLoading(loading: boolean): void {
    if (loading) {
      this.activeRequests++;
    } else {
      this.activeRequests--;
    }

    // Afficher le loading seulement s'il y a des requêtes actives
    this.loadingSubject.next(this.activeRequests > 0);
  }

  get isLoading(): boolean {
    return this.loadingSubject.value;
  }
}