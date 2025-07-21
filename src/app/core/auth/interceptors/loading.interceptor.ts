import { Injectable } from '@angular/core';
import { 
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpEvent 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingService } from '../../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Démarrer le loading pour les requêtes qui ne sont pas des vérifications de token
    if (!request.url.includes('/auth/verifier-token')) {
      this.loadingService.setLoading(true);
    }
    
    return next.handle(request).pipe(
      finalize(() => {
        if (!request.url.includes('/auth/verifier-token')) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
