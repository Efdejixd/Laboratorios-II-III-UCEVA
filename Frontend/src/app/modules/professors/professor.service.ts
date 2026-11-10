import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/api.config';
import { Professor, ProfessorPayload } from './professor.model';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
  private readonly url = `${API_BASE_URL}/professors`;
  constructor(private readonly http: HttpClient) {}
  getAll(): Observable<Professor[]> { return this.http.get<Professor[]>(this.url); }
  getById(id: number): Observable<Professor> { return this.http.get<Professor>(`${this.url}/${id}`); }
  create(value: ProfessorPayload): Observable<Professor> { return this.http.post<Professor>(this.url, value); }
  update(id: number, value: ProfessorPayload): Observable<Professor> { return this.http.put<Professor>(`${this.url}/${id}`, value); }
  delete(id: number): Observable<{result: boolean}> { return this.http.delete<{result: boolean}>(`${this.url}/${id}`); }
}
