export interface ApiResponse<T = any> {
  message: string;
  statut: 'succes' | 'erreur';
  data?: T;
  erreurs?: any;
}

export interface PaginationParams {
  per_page?: number;
  page?: number;
  recherche?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}
